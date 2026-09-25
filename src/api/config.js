export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '')

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL is not set. Copy .env.example to .env and fill in the backend URL.')
}
