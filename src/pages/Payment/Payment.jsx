import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import { useAuth } from '../../context/AuthContext'
import { getAddresses, createAddress } from '../../api/address'
import { createOrder } from '../../api/orders'
import { getCart, removeCartLine } from '../../api/cart'
import { loadCartLines } from '../../cart/cartService'
import { formatMoney } from '../../utils/formatMoney'
import { PLACEHOLDER_IMAGE, handleImageFallback } from '../../utils/placeholderImage'
import storefrontImage from '../../assets/images/login-storefront.png'
import syriatelLogo from '../../assets/images/syriatel-logo.png'
import mtnLogo from '../../assets/images/mtn-logo.png'
import successBadge from '../../assets/images/success-badge.png'
import '../Login/Login.css'
import './Payment.css'

const PAYMENT_METHODS = [
  { id: 'cash', labelKey: 'payment.cash', icon: 'bi-cash-stack' },
  { id: 'syriatel', labelKey: 'payment.syriatel', image: syriatelLogo },
  { id: 'mtn', labelKey: 'payment.mtn', image: mtnLogo },
]

async function ensureAddressId(user) {
  const addresses = await getAddresses()
  if (addresses.length > 0) return addresses[0].id

  const created = await createAddress({
    name: user?.name || 'Customer',
    phone: user?.phone || '',
    city: 'Damascus',
    neighborhood: '-',
    street: '-',
    building: '-',
    zip_code: '-',
    lat: '0',
    lng: '0',
    is_default: true,
  })
  return created?.data?.id
}

function Payment({ onConfirm, onBrandClick, onProfileClick, onBack }) {
  const { t, i18n } = useTranslation()
  const { user, loading: authLoading } = useAuth()
  const [method, setMethod] = useState('cash')
  const [discountCode, setDiscountCode] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [itemsLoading, setItemsLoading] = useState(true)
  const [itemsError, setItemsError] = useState(false)

  useEffect(() => {
    if (authLoading) return
    let cancelled = false
    loadCartLines(user)
      .then((lines) => {
        if (cancelled) return
        setItems(lines)
        setItemsError(false)
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) setItemsError(true)
      })
      .finally(() => {
        if (!cancelled) setItemsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user, authLoading, i18n.language])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = 0
  const tax = 0
  const netTotal = subtotal - discount + tax

  const handleConfirm = async (event) => {
    event.preventDefault()
    if (submitting || itemsLoading || items.length === 0) return
    setError('')
    setSubmitting(true)
    try {
      const addressId = await ensureAddressId(user)
      await createOrder({
        note: '',
        paymentType: method.toUpperCase(),
        addressId,
        couponCode: discountCode || undefined,
      })
      const cartLines = await getCart()
      await Promise.all(cartLines.map((line) => removeCartLine(line.id)))
      setItems([])
      setShowSuccess(true)
    } catch (err) {
      console.error(err)
      setError(t('payment.orderError'))
    } finally {
      setSubmitting(false)
    }
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
              {itemsLoading && <p className="payment-item-desc">{t('payment.loadingItems')}</p>}
              {!itemsLoading && itemsError && <p className="login-error">{t('cartPage.loadError')}</p>}
              {!itemsLoading && !itemsError && items.length === 0 && (
                <p className="payment-item-desc">{t('payment.emptyCart')}</p>
              )}
              {!itemsLoading &&
                items.map((item) => (
                  <div className="payment-item" key={item.lineId ?? item.productId}>
                    <span className="payment-item-thumb">
                      <img
                        src={item.image || PLACEHOLDER_IMAGE}
                        alt=""
                        className="payment-item-thumb-img"
                        onError={handleImageFallback}
                      />
                      <span className="payment-item-badge">
                        <i className="bi bi-check-circle-fill" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="payment-item-info">
                      <span className="payment-item-name">{item.name}</span>
                      <span className="payment-item-desc">{formatMoney(item.price)}</span>
                    </span>
                    <span className="payment-item-qty">{item.quantity}</span>
                    <span className="payment-item-price">{formatMoney(item.price * item.quantity)}</span>
                  </div>
                ))}
            </div>

            <div className="payment-totals">
              <div className="payment-total-row">
                <span>{t('payment.total')}</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="payment-total-row">
                <span>{t('payment.discount')}</span>
                <span>{formatMoney(discount)}</span>
              </div>
              <div className="payment-total-row">
                <span>{t('payment.tax')}</span>
                <span>{formatMoney(tax)}</span>
              </div>
              <div className="payment-total-row payment-net-total">
                <span>{t('payment.netTotal')}</span>
                <span>{formatMoney(netTotal)}</span>
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button
              type="submit"
              className="btn login-submit-btn w-100"
              disabled={submitting || itemsLoading || items.length === 0}
            >
              {submitting ? t('payment.submitting') : t('payment.confirm')}
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
