import { apiFetch, apiFetchAllPages } from './client'
import { isDemoSession, getDemoAddresses, addDemoAddress } from '../utils/demoMode'

export async function getAddresses() {
  if (isDemoSession()) return getDemoAddresses()
  return apiFetchAllPages('/address')
}

export function createAddress(data) {
  if (isDemoSession()) return Promise.resolve({ data: addDemoAddress(data) })
  return apiFetch('/address', { method: 'POST', body: data })
}
