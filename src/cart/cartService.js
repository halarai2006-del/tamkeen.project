// Single place that decides "server cart (logged in) vs. local guest cart"
// so Cart.jsx and ProductDetail.jsx don't each re-implement the same branch.
import { getCart, addToCart, removeCartLine, updateCartQty } from '../api/cart'
import { getLocalCart, addLocalItem, updateLocalQty, removeLocalItem } from './localCart'

export async function loadCartItems(user) {
  if (user) return getCart()
  return getLocalCart()
}

export async function addItem(user, product, quantity) {
  if (user) return addToCart(product.id, quantity)
  return addLocalItem(product, quantity)
}

export async function removeItem(user, item) {
  if (user) return removeCartLine(item.lineId)
  return removeLocalItem(item.productId)
}

export async function updateItemQty(user, item, quantity) {
  if (user) return updateCartQty(item.lineId, item.productId, quantity)
  return updateLocalQty(item.productId, quantity)
}
