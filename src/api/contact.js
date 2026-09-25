import { apiFetch } from './client'

// POST /contact — auth is optional, so the token is sent only when signed in.
export function sendContactMessage({ email, message }) {
  return apiFetch('/contact', {
    method: 'POST',
    body: { type: 'EMAIL', email, message },
  })
}
