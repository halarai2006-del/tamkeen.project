import { apiFetch } from './client'

export function sendContactMessage({ email, message }) {
  return apiFetch('/contact', {
    method: 'POST',
    body: { type: 'EMAIL', email, message },
  })
}
