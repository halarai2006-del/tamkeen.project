import { apiFetch } from './client'
import { getProduct } from './products'
import {
  isDemoSession,
  getDemoCart,
  addDemoCartItem,
  removeDemoCartLine,
  updateDemoCartQty,
} from '../utils/demoMode'

export async function getCart() {
  if (isDemoSession()) return getDemoCart()
  const result = await apiFetch('/cart')
  return result?.data ?? []
}

export async function addToCart(productId, quantity) {
  if (isDemoSession()) {
    const product = await getProduct(productId).catch(() => null)
    return { data: addDemoCartItem(product ?? { id: productId }, quantity) }
  }
  return apiFetch('/cart', { method: 'POST', body: { product_id: productId, quantity } })
}

export function removeCartLine(lineId) {
  if (isDemoSession()) return Promise.resolve(removeDemoCartLine(lineId))
  return apiFetch(`/cart/${lineId}`, { method: 'DELETE' })
}

export async function updateCartQty(lineId, productId, quantity, previousQuantity) {
  if (isDemoSession()) return updateDemoCartQty(lineId, quantity)
  await removeCartLine(lineId)
  try {
    return await addToCart(productId, quantity)
  } catch (error) {
    await addToCart(productId, previousQuantity).catch(() => {})
    throw error
  }
}
