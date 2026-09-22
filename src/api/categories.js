import { apiFetch } from './client'

export async function getCategories() {
  const result = await apiFetch('/category', { auth: false })
  return result?.data ?? []
}
