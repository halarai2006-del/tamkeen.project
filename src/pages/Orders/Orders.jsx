import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import { getOrders } from '../../api/orders'
import './Orders.css'

function Orders({ onBrandClick, onProfileClick, onCartClick, onBack }) {
  const { t } = useTranslation()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError(t('orders.loadError')))
      .finally(() => setLoading(false))
  }, [t])

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
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default Orders
