import { apiFetchAllPages } from './client'
import { normalizeCategory } from './normalize'

export async function getCategories() {
  const items = await apiFetchAllPages('/category', {}, { auth: false })
  return items.map(normalizeCategory).filter((category) => category.name)
}
