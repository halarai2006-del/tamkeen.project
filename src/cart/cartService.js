// Single place that decides "server cart (logged in) vs. local guest cart"
// so Cart.jsx and ProductDetail.jsx don't each re-implement the same branch.
import { getCart, addToCart, removeCartLine, updateCartQty } from '../api/cart'
import { pickProductImages } from '../api/normalize'
import { getLocalCart, addLocalItem, updateLocalQty, removeLocalItem } from './localCart'

export async function loadCartItems(user) {
  if (user) return getCart()
  return getLocalCart()
}

function normalizeServerLine(line) {
  const product = line.product ?? line
  return {
    lineId: line.id,
    productId: product.id ?? line.product_id,
    name: product.name ?? line.name ?? '',
    price: Number(product.price ?? line.price ?? 0),
    // `line.id` is the cart line's id, not the product's, so it must not pick a stand-in photo.
    image: pickProductImages(product).image || pickProductImages({ ...line, id: product.id }).image,
    quantity: line.quantity ?? line.qty ?? 1,
  }
}

function normalizeLocalLine(item) {
  return {
    lineId: null,
    productId: item.productId,
    name: item.name ?? '',
    price: Number(item.price ?? 0),
    image: pickProductImages(item).image,
    quantity: item.quantity,
  }
}

// Cart lines in one shape ({ lineId, productId, name, price, image, quantity })
// whether they came from the server cart or the local guest cart.
export async function loadCartLines(user) {
  const rawItems = await loadCartItems(user)
  return rawItems.map(user ? normalizeServerLine : normalizeLocalLine)
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
