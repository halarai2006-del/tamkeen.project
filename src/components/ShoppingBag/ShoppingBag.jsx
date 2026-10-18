import { useTranslation } from 'react-i18next'
import { useCartLines } from '../../cart/useCartLines'
import { formatMoney } from '../../utils/formatMoney'
import { PLACEHOLDER_IMAGE, handleImageFallback } from '../../utils/placeholderImage'
import './ShoppingBag.css'

function ShoppingBag({ onClose, onCheckout }) {
  const { t } = useTranslation()
  const { items, loading, error, subtotal, lineKey, isPending, stepQty, removeLine } = useCartLines()

  return (
    <div className="shopping-bag-overlay" onClick={onClose}>
      <aside
        className="shopping-bag-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t('cart.title')}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="shopping-bag-header">
          <h3 className="shopping-bag-title">{t('cart.title')}</h3>
          <button
            type="button"
            className="shopping-bag-close"
            aria-label={t('cart.close')}
            onClick={onClose}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>

        {loading && <p className="shopping-bag-status">{t('store.loading')}</p>}
        {error && <p className="shopping-bag-status shopping-bag-error">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="shopping-bag-status">{t('payment.emptyCart')}</p>
        )}

        <ul className="shopping-bag-items">
          {items.map((item) => {
            const itemPending = isPending(item)
            return (
              <li className="shopping-bag-item" key={lineKey(item)}>
                <span className="shopping-bag-item-thumb">
                  <img
                    src={item.image || PLACEHOLDER_IMAGE}
                    alt=""
                    className="shopping-bag-item-img"
                    onError={handleImageFallback}
                  />
                  <span className="shopping-bag-item-qty-badge">{item.quantity}</span>
                </span>

                <div className="shopping-bag-item-info">
                  <span className="shopping-bag-item-name">{item.name}</span>
                  <span className="shopping-bag-item-desc">{formatMoney(item.price)}</span>
                  <div className="shopping-bag-item-stepper">
                    <button
                      type="button"
                      className="shopping-bag-step-btn"
                      onClick={() => stepQty(item, -1)}
                      aria-label="-"
                      disabled={itemPending || item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      className="shopping-bag-step-btn"
                      onClick={() => stepQty(item, 1)}
                      aria-label="+"
                      disabled={itemPending}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="shopping-bag-remove-btn"
                      onClick={() => removeLine(item)}
                      aria-label={t('cartPage.remove')}
                      disabled={itemPending}
                    >
                      <i className="bi bi-trash" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <span className="shopping-bag-item-price">{formatMoney(item.price * item.quantity)}</span>
              </li>
            )
          })}
        </ul>

        <div className="shopping-bag-subtotal">
          <span>{t('cart.subtotal')}</span>
          <span className="shopping-bag-subtotal-value">{formatMoney(subtotal)}</span>
        </div>

        <button type="button" className="btn shopping-bag-checkout-btn w-100" onClick={onCheckout}>
          {t('cart.checkout')}
        </button>
      </aside>
    </div>
  )
}

export default ShoppingBag
