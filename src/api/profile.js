import { apiFetch } from './client'
import { isDemoSession, getDemoProfile, saveDemoProfile } from '../utils/demoMode'

export async function getProfile() {
  if (isDemoSession()) return getDemoProfile()
  const result = await apiFetch('/customer')
  return result?.data ?? null
}

export function updateProfile({ name, email, phone, imageFile }) {
  if (isDemoSession()) {
    const patch = {
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      ...(imageFile ? { image: URL.createObjectURL(imageFile) } : {}),
    }
    return Promise.resolve({ data: saveDemoProfile(patch) })
  }

  const formData = new FormData()
  if (name) formData.append('name', name)
  if (email) formData.append('email', email)
  if (phone) formData.append('phone', phone)
  if (imageFile) formData.append('image', imageFile)

  return apiFetch('/customer', { method: 'POST', body: formData, isFormData: true })
}
