import { apiFetch, buildQuery } from './client'

export async function getProducts(params = {}) {
  const query = buildQuery({
    category_id: params.categoryId,
    search: params.search,
    price_from: params.priceFrom,
    price_to: params.priceTo,
    order_by: params.orderBy,
    order: params.order,
  })
  const result = await apiFetch(`/product${query}`, { auth: false })
  return result?.data ?? []
}

export async function getProduct(id) {
  const result = await apiFetch(`/product/${id}`, { auth: false })
  return result?.data ?? null
}
