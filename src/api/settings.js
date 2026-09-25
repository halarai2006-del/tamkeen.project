import { apiFetch } from './client'

export const SETTING_KEYS = {
  privacyPolicy: 'privacy_policy',
  termsAndConditions: 'terms_and_conditions',
}

export async function getSetting(key) {
  const result = await apiFetch(`/setting/${key}`)
  return result?.data ?? null
}
