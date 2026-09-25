import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import { getOrders, cancelOrder } from '../../api/orders'
import './Orders.css'

function isCancellable(order) {
  return !/cancel|deliver|complet|reject/i.test(String(order.status ?? ''))
}

function Orders({ onBrandClick, onProfileClick, onCartClick, onBack }) {
  const { t } = useTranslation()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancellingId, setCancellingId] = useState(null)
  const [cancelReason, setCancelReason] = useState('')
  const [cancelBusy, setCancelBusy] = useState(false)
  const [cancelError, setCancelError] = useState('')

  const loadOrders = () =>
    getOrders()
      .then(setOrders)
      .catch(() => setError(t('orders.loadError')))
      .finally(() => setLoading(false))

  useEffect(() => {
    loadOrders()
  }, [t])

  const startCancel = (id) => {
    setCancellingId(id)
    setCancelReason('')
    setCancelError('')
  }

  const handleCancel = async (event) => {
    event.preventDefault()
    setCancelBusy(true)
    setCancelError('')
    try {
      await cancelOrder(cancellingId, cancelReason.trim())
      setCancellingId(null)
      await loadOrders()
    } catch (err) {
      setCancelError(err.message || t('orders.cancelError'))
    } finally {
      setCancelBusy(false)
    }
  }

  return (
    <div className="orders-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onProfileClick={onProfileClick}
        onCartClick={onCartClick}
        onBack={onBack}
        mobileTitle={t('orders.title')}
        hideSearch
      />

      <main className="orders-main">
        <h1 className="orders-title">{t('orders.title')}</h1>

        {loading && <p className="orders-status">{t('orders.loading')}</p>}
        {!loading && error && <p className="orders-status orders-error">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="orders-status">{t('orders.empty')}</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <ul className="orders-list">
            {orders.map((order) => (
              <li className="order-card" key={order.id}>
                <div className="order-card-header">
                  <span className="order-card-id">
                    {t('orders.orderNumber', { id: order.id })}
                  </span>
                  {order.status && <span className="order-card-status">{order.status}</span>}
                </div>
                {order.created_at && (
                  <span className="order-card-date">{order.created_at}</span>
                )}
                {Array.isArray(order.items) && order.items.length > 0 && (
                  <ul className="order-card-items">
                    {order.items.map((item, index) => (
                      <li key={item.id ?? index}>
                        {item.product?.name ?? item.name ?? t('orders.item')}
                        {item.quantity != null ? ` × ${item.quantity}` : ''}
                      </li>
                    ))}
                  </ul>
                )}
                {order.total != null && (
                  <span className="order-card-total">
                    {t('orders.total')}: {order.total}
                  </span>
                )}
                {isCancellable(order) && cancellingId !== order.id && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger order-cancel-btn"
                    onClick={() => startCancel(order.id)}
                  >
                    {t('orders.cancel')}
                  </button>
                )}
                {cancellingId === order.id && (
                  <form className="order-cancel-form" onSubmit={handleCancel}>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder={t('orders.cancelReason')}
                      aria-label={t('orders.cancelReason')}
                      value={cancelReason}
                      onChange={(event) => setCancelReason(event.target.value)}
                      required
                    />
                    {cancelError && <p className="orders-error">{cancelError}</p>}
                    <div className="order-cancel-actions">
                      <button type="submit" className="btn btn-sm btn-danger" disabled={cancelBusy}>
                        {t('orders.confirmCancel')}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setCancellingId(null)}
                        disabled={cancelBusy}
                      >
                        {t('orders.keep')}
                      </button>
                    </div>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default Orders
