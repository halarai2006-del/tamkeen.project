import { apiFetch } from './client'
import { isDemoSession, getDemoAddresses, addDemoAddress } from '../utils/demoMode'

export async function getAddresses() {
  if (isDemoSession()) return getDemoAddresses()
  const result = await apiFetch('/address')
  return result?.data ?? []
}

export function createAddress(data) {
  if (isDemoSession()) return Promise.resolve({ data: addDemoAddress(data) })
  return apiFetch('/address', { method: 'POST', body: data })
}
