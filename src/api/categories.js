import { apiFetchAllPages } from './client'
import { normalizeCategory } from './normalize'

// Categories are paginated too (22 total, 15 per page). Some have no name
// (leftover test data) and would render as empty buttons, so they are dropped.
export async function getCategories() {
  const items = await apiFetchAllPages('/category', {}, { auth: false })
  return items.map(normalizeCategory).filter((category) => category.name)
}
