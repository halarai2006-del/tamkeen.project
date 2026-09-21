import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import storefrontImage from '../../assets/images/login-storefront.png'
import syriatelLogo from '../../assets/images/syriatel-logo.png'
import mtnLogo from '../../assets/images/mtn-logo.png'
import smartwatchImage from '../../assets/images/smartwatch-product.png'
import successBadge from '../../assets/images/success-badge.png'
import '../Login/Login.css'
import './Payment.css'

const PAYMENT_METHODS = [
  { id: 'cash', labelKey: 'payment.cash', icon: 'bi-cash-stack' },
  { id: 'syriatel', labelKey: 'payment.syriatel', image: syriatelLogo },
  { id: 'mtn', labelKey: 'payment.mtn', image: mtnLogo },
]

const ORDER_ITEMS = [
  { id: 1, qty: 2, price: '600 AED' },
  { id: 2, qty: 2, price: '600 AED' },
  { id: 3, qty: 2, price: '600 AED' },
]

function Payment({ onConfirm, onBrandClick, onProfileClick, onBack }) {
  const { t } = useTranslation()
  const [method, setMethod] = useState('cash')
  const [discountCode, setDiscountCode] = useState('5601')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConfirm = (event) => {
    event.preventDefault()
    setShowSuccess(true)
  }

  const handleContinue = () => {
    setShowSuccess(false)
    onConfirm?.()
  }

  return (
    <div className="payment-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onProfileClick={onProfileClick}
        onBack={onBack}
        mobileTitle={t('payment.title')}
      />

      <div className="d-flex flex-row payment-body">
        <div
          className="login-hero payment-hero"
          style={{ backgroundImage: `url(${storefrontImage})` }}
        >
          <div className="payment-hero-panel">
            <h2 className="payment-title">{t('payment.title')}</h2>
            <p className="payment-subtitle">{t('payment.subtitle')}</p>

            <div className="payment-method-list">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`payment-method-option ${method === m.id ? 'is-selected' : ''}`}
                >
                  <span className={`payment-method-logo payment-method-logo-${m.id}`}>
                    {m.image ? (
                      <img src={m.image} alt="" className="payment-method-logo-img" />
                    ) : (
                      <i className={`bi ${m.icon}`} aria-hidden="true" />
                    )}
                  </span>
                  <span className="payment-method-name">{t(m.labelKey)}</span>
                  <input
                    type="radio"
                    name="payment-method"
                    className="payment-method-radio"
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                  />
                </label>
              ))}
            </div>

            <div className="payment-discount">
              <label htmlFor="discount-code" className="payment-discount-label">
                {t('payment.discountLabel')}
              </label>
              <div className="input-group">
                <input
                  id="discount-code"
                  type="text"
                  className="form-control"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value)}
                />
                <button type="button" className="btn payment-check-btn">
                  <i className="bi bi-arrow-repeat" aria-hidden="true" />
                  {t('payment.check')}
                </button>
              </div>
            </div>

            <button type="button" className="btn payment-view-items-btn w-100">
              {t('payment.viewOrderedItems')}
            </button>
          </div>
        </div>

        <div className="payment-summary-panel">
          <form className="payment-summary" onSubmit={handleConfirm}>
            <div className="payment-items">
              {ORDER_ITEMS.map((item) => (
                <div className="payment-item" key={item.id}>
                  <span className="payment-item-thumb">
                    <img src={smartwatchImage} alt="" className="payment-item-thumb-img" />
                    <span className="payment-item-badge">
                      <i className="bi bi-check-circle-fill" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="payment-item-info">
                    <span className="payment-item-name">{t('payment.itemName')}</span>
                    <span className="payment-item-desc">{t('payment.itemDescription')}</span>
                  </span>
                  <span className="payment-item-qty">{item.qty}</span>
                  <span className="payment-item-price">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="payment-totals">
              <div className="payment-total-row">
                <span>{t('payment.total')}</span>
                <span>110.000</span>
              </div>
              <div className="payment-total-row">
                <span>{t('payment.discount')}</span>
                <span>0</span>
              </div>
              <div className="payment-total-row">
                <span>{t('payment.tax')}</span>
                <span>4.000</span>
              </div>
              <div className="payment-total-row payment-net-total">
                <span>{t('payment.netTotal')}</span>
                <span>114.000</span>
              </div>
            </div>

            <button type="submit" className="btn login-submit-btn w-100">
              {t('payment.confirm')}
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="payment-success-overlay" role="dialog" aria-modal="true">
          <div className="payment-success-modal">
            <span className="payment-success-topbar" aria-hidden="true" />
            <button
              type="button"
              className="payment-success-close"
              aria-label={t('payment.close')}
              onClick={() => setShowSuccess(false)}
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
            <img src={successBadge} alt="" className="payment-success-badge" />
            <p className="payment-success-message">{t('payment.successMessage')}</p>
            <button
              type="button"
              className="btn login-submit-btn w-100"
              onClick={handleContinue}
            >
              <i className="bi bi-arrow-left" aria-hidden="true" /> {t('payment.continue')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment
