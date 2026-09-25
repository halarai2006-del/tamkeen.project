import { apiFetch, apiFetchAllPages, buildQuery } from './client'
import { normalizeProduct } from './normalize'

function toApiParams(params) {
  return {
    // The backend filters by one category only; several are handled in getAllProducts.
    category_id: params.categoryId ?? (params.categoryIds?.length === 1 ? params.categoryIds[0] : undefined),
    search: params.search,
    price_from: params.priceFrom,
    price_to: params.priceTo,
    order_by: params.orderBy,
    order: params.order,
  }
}

// The backend has products with no name at all (leftover test data); listing
// them would render blank cards, so they are dropped from every list.
function toProductList(items) {
  return (items ?? []).map(normalizeProduct).filter((product) => product.name)
}

// First page only (15 products). Use this for previews like the home page.
export async function getProducts(params = {}) {
  const query = buildQuery({ ...toApiParams(params), page: params.page })
  const result = await apiFetch(`/product${query}`, { auth: false })
  return toProductList(result?.data)
}

// Every matching product across all pages. Use this for full listings.
// `categoryIds` may hold several categories (the backend can't filter by more
// than one at a time, so those are filtered here).
export async function getAllProducts(params = {}) {
  const items = await apiFetchAllPages('/product', toApiParams(params), { auth: false })
  const products = toProductList(items)
  const categoryIds = params.categoryIds ?? []
  if (categoryIds.length <= 1) return products
  return products.filter((product) => categoryIds.includes(product.category?.id))
}

export async function getProduct(id) {
  const result = await apiFetch(`/product/${id}`, { auth: false })
  return normalizeProduct(result?.data ?? null)
}
