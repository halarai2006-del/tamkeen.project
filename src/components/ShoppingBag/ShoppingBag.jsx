import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import breadImage from '../../assets/images/smartwatch-product.png'
import wipeImage from '../../assets/images/Group 1000007742 (1).png'
import goproImage from '../../assets/images/Group 1000007742 (3).png'
import './ShoppingBag.css'

const INITIAL_ITEMS = [
  { id: 'bread', nameKey: 'cart.itemBread', image: breadImage, qty: 2, price: '600 AED' },
  { id: 'wipe', nameKey: 'cart.itemWipe', image: wipeImage, qty: 2, price: '600 AED' },
  { id: 'gopro', nameKey: 'cart.itemGoPro', image: goproImage, qty: 2, price: '600 AED' },
]

function ShoppingBag({ onClose, onCheckout }) {
  const { t } = useTranslation()
  const [items, setItems] = useState(INITIAL_ITEMS)

  const updateQty = (id, delta) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    )
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return (
    <div className="shopping-bag-overlay">
      <div className="shopping-bag-panel">
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

        <div className="shopping-bag-items">
          {items.map((item) => (
            <div className="shopping-bag-item" key={item.id}>
              <span className="shopping-bag-item-thumb">
                <img src={item.image} alt="" className="shopping-bag-item-img" />
                <span className="shopping-bag-item-qty-badge">{item.qty}</span>
              </span>

              <div className="shopping-bag-item-info">
                <span className="shopping-bag-item-name">{t(item.nameKey)}</span>
                <span className="shopping-bag-item-desc">{t('cart.itemDescription')}</span>
                <div className="shopping-bag-item-stepper">
                  <button
                    type="button"
                    className="shopping-bag-step-btn"
                    onClick={() => updateQty(item.id, -1)}
                    aria-label="-"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    type="button"
                    className="shopping-bag-step-btn"
                    onClick={() => updateQty(item.id, 1)}
                    aria-label="+"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="shopping-bag-remove-btn"
                    onClick={() => removeItem(item.id)}
                    aria-label={t('cart.close')}
                  >
                    <i className="bi bi-trash" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <span className="shopping-bag-item-price">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="shopping-bag-subtotal">
          <span>{t('cart.subtotal')}</span>
          <span className="shopping-bag-subtotal-value">600 AED</span>
        </div>

        <button type="button" className="btn shopping-bag-checkout-btn w-100" onClick={onCheckout}>
          {t('cart.checkout')}
        </button>
      </div>
    </div>
  )
}

export default ShoppingBag
