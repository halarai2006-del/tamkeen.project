import { API_BASE_URL } from './config'
import { getToken } from './token'
import { isDemoSession } from '../utils/demoMode'

export function buildQuery(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    search.set(key, value)
  })
  const query = search.toString()
  return query ? `?${query}` : ''
}

const CATALOG_CACHE_MS = 60_000
const catalogCache = new Map()

export function apiFetch(path, options = {}) {
  const { method = 'GET', auth = true } = options
  if (method !== 'GET' || auth) return request(path, options)

  const cached = catalogCache.get(path)
  if (cached && Date.now() - cached.time < CATALOG_CACHE_MS) return cached.promise

  const promise = request(path, options).catch((error) => {
    catalogCache.delete(path)
    throw error
  })
  catalogCache.set(path, { promise, time: Date.now() })
  return promise
}

async function request(path, { method = 'GET', body, isFormData = false, auth = true } = {}) {
  const headers = { Accept: 'application/json' }
  if (!isFormData && body !== undefined) headers['Content-Type'] = 'application/json'

  if (auth && !isDemoSession()) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`
    const error = new Error(message)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

const MAX_PAGES = 20

export async function apiFetchAllPages(path, params = {}, options = {}) {
  const fetchPage = (page) =>
    apiFetch(`${path}${buildQuery(page === 1 ? params : { ...params, page })}`, options)

  const first = await fetchPage(1)
  const lastPage = Math.min(Number(first?.meta?.last_page) || 1, MAX_PAGES)
  if (lastPage <= 1) return first?.data ?? []

  const rest = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) => fetchPage(index + 2)),
  )
  return [first, ...rest].flatMap((result) => result?.data ?? [])
}
