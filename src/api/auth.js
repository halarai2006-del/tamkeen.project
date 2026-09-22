import { apiFetch } from './client'
import { setToken, clearToken } from './token'
import { isDemoOtp, startDemoSession } from '../utils/demoMode'

function isUnregisteredPhoneError(error) {
  return error.status === 422 && Boolean(error.data?.errors?.phone)
}

export function register(phone) {
  const formData = new FormData()
  formData.append('name', 'Tamkeen Customer')
  formData.append('phone', phone)
  return apiFetch('/register', { method: 'POST', body: formData, isFormData: true, auth: false })
}

export async function login(phone) {
  try {
    return await apiFetch('/login', { method: 'POST', body: { phone }, auth: false })
  } catch (error) {
    if (isUnregisteredPhoneError(error)) {
      await register(phone)
      return apiFetch('/login', { method: 'POST', body: { phone }, auth: false })
    }
    throw error
  }
}

export function resendOtp(phone) {
  return apiFetch('/resend', { method: 'POST', body: { phone }, auth: false })
}

export async function verify(phone, otp) {
  if (isDemoOtp(otp)) {
    // Demo mode: accept the fixed code for any phone number and start a local
    // session instead of calling the real (training) backend. See src/utils/demoMode.js.
    startDemoSession(phone)
    return { data: { token: 'demo' } }
  }
  const result = await apiFetch('/verify', { method: 'POST', body: { phone, otp }, auth: false })
  const token = result?.data?.token
  if (token) setToken(token)
  return result
}

export function logout() {
  clearToken()
}
