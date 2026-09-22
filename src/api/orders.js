import { apiFetch } from './client'
import { isDemoSession, getDemoOrders, createDemoOrder, removeDemoOrder } from '../utils/demoMode'

export async function getOrders() {
  if (isDemoSession()) return getDemoOrders()
  const result = await apiFetch('/order')
  return result?.data ?? []
}

export function createOrder({ note, paymentType, addressId, couponCode }) {
  if (isDemoSession()) {
    return Promise.resolve({ data: createDemoOrder({ note, paymentType, addressId, couponCode }) })
  }
  return apiFetch('/order', {
    method: 'POST',
    body: {
      note,
      payment_type: paymentType,
      address_id: addressId,
      ...(couponCode ? { coupon_code: couponCode } : {}),
    },
  })
}

export function cancelOrder(id, comment) {
  if (isDemoSession()) return Promise.resolve(removeDemoOrder(id))
  return apiFetch(`/order/${id}`, { method: 'DELETE', body: { comment } })
}
