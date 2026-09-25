import { setToken, getToken } from '../api/token'

export const DEMO_OTP = '11111'

const DEMO_TOKEN = 'tamkeen-demo-session'
const DEMO_PROFILE_KEY = 'tamkeen_demo_profile'
const DEMO_CART_KEY = 'tamkeen_demo_cart'
const DEMO_ADDRESSES_KEY = 'tamkeen_demo_addresses'
const DEMO_ORDERS_KEY = 'tamkeen_demo_orders'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
  }
  return value
}

export function isDemoOtp(otp) {
  return String(otp ?? '').trim() === DEMO_OTP
}

export function isDemoSession() {
  return getToken() === DEMO_TOKEN
}

export function startDemoSession(phone) {
  setToken(DEMO_TOKEN)
  const profile = getDemoProfile()
  if (phone && profile.phone !== phone) {
    saveDemoProfile({ phone })
  }
}

export function endDemoSession() {
  writeJson(DEMO_PROFILE_KEY, null)
  writeJson(DEMO_CART_KEY, [])
  writeJson(DEMO_ADDRESSES_KEY, [])
  writeJson(DEMO_ORDERS_KEY, [])
}

export function getDemoProfile() {
  return readJson(DEMO_PROFILE_KEY, { name: '', email: '', phone: '', image: null })
}

export function saveDemoProfile(patch) {
  const current = getDemoProfile()
  return writeJson(DEMO_PROFILE_KEY, { ...current, ...patch })
}

export function getDemoCart() {
  return readJson(DEMO_CART_KEY, [])
}

export function addDemoCartItem(product, quantity) {
  const items = getDemoCart()
  const existing = items.find((line) => line.product?.id === product?.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    items.push({
      id: `demo-line-${product?.id ?? 'unknown'}-${Date.now()}`,
      product: {
        id: product?.id,
        name: product?.name ?? '',
        price: product?.price ?? 0,
        image: product?.image ?? '',
      },
      quantity,
    })
  }
  return writeJson(DEMO_CART_KEY, items)
}

export function removeDemoCartLine(lineId) {
  const items = getDemoCart().filter((line) => line.id !== lineId)
  return writeJson(DEMO_CART_KEY, items)
}

export function updateDemoCartQty(lineId, quantity) {
  const items = getDemoCart().map((line) => (line.id === lineId ? { ...line, quantity } : line))
  return writeJson(DEMO_CART_KEY, items)
}

export function getDemoAddresses() {
  return readJson(DEMO_ADDRESSES_KEY, [])
}

export function addDemoAddress(data) {
  const addresses = getDemoAddresses()
  const created = { id: `demo-address-${Date.now()}`, ...data }
  writeJson(DEMO_ADDRESSES_KEY, [...addresses, created])
  return created
}

export function getDemoOrders() {
  return readJson(DEMO_ORDERS_KEY, [])
}

export function createDemoOrder({ note, paymentType, addressId, couponCode }) {
  const cartItems = getDemoCart()
  const total = cartItems.reduce(
    (sum, line) => sum + Number(line.product?.price ?? 0) * line.quantity,
    0,
  )
  const orders = getDemoOrders()
  const nextId = orders.reduce((max, order) => Math.max(max, order.id), 0) + 1
  const order = {
    id: nextId,
    status: 'Pending',
    created_at: new Date().toISOString().slice(0, 10),
    items: cartItems.map((line) => ({
      id: line.id,
      product: { name: line.product?.name },
      quantity: line.quantity,
    })),
    total,
    note,
    payment_type: paymentType,
    address_id: addressId,
    coupon_code: couponCode,
  }
  writeJson(DEMO_ORDERS_KEY, [order, ...orders])
  return order
}

export function removeDemoOrder(id) {
  const orders = getDemoOrders().filter((order) => order.id !== id)
  return writeJson(DEMO_ORDERS_KEY, orders)
}
