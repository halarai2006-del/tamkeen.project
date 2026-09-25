const LOCAL_CART_KEY = 'tamkeen_guest_cart'

export function getLocalCart() {
  try {
    const raw = localStorage.getItem(LOCAL_CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalCart(items) {
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items))
  } catch {
  }
  return items
}

export function addLocalItem(product, quantity) {
  const items = getLocalCart()
  const existing = items.find((item) => item.productId === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
  }
  return saveLocalCart(items)
}

export function updateLocalQty(productId, quantity) {
  const items = getLocalCart().map((item) =>
    item.productId === productId ? { ...item, quantity } : item,
  )
  return saveLocalCart(items)
}

export function removeLocalItem(productId) {
  const items = getLocalCart().filter((item) => item.productId !== productId)
  return saveLocalCart(items)
}

export function clearLocalCart() {
  localStorage.removeItem(LOCAL_CART_KEY)
}
