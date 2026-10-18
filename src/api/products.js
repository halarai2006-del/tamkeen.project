import { apiFetch, apiFetchAllPages, buildQuery } from './client'
import { normalizeProduct } from './normalize'
import { isProductVisible } from './hiddenCatalog'

function toApiParams(params) {
  return {
    category_id: params.categoryId ?? (params.categoryIds?.length === 1 ? params.categoryIds[0] : undefined),
    search: params.search,
    price_from: params.priceFrom,
    price_to: params.priceTo,
    order_by: params.orderBy,
    order: params.order,
  }
}

function toProductList(items) {
  return (items ?? []).map(normalizeProduct).filter((product) => product.name && isProductVisible(product))
}

export async function getProducts(params = {}) {
  const query = buildQuery({ ...toApiParams(params), page: params.page })
  const result = await apiFetch(`/product${query}`, { auth: false })
  return toProductList(result?.data)
}

export async function getAllProducts(params = {}) {
  const items = await apiFetchAllPages('/product', toApiParams(params), { auth: false })
  const products = toProductList(items)
  const categoryIds = params.categoryIds ?? []
  if (categoryIds.length <= 1) return products
  return products.filter((product) => categoryIds.includes(product.category?.id))
}

export async function getProduct(id) {
  const result = await apiFetch(`/product/${id}`, { auth: false })
  const product = normalizeProduct(result?.data ?? null)
  if (product && !isProductVisible(product)) throw new Error('Product is not available')
  return product
}
