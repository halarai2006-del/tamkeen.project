import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import { useAuth } from '../../context/AuthContext'
import { loadCartItems, removeItem as removeCartItem, updateItemQty } from '../../cart/cartService'
import borcelleLogo from '../../assets/images/borcelle-logo.png'
import flagUk from '../../assets/images/icon.png'
import tabletImage from '../../assets/images/image 32.png'
import phoneImage from '../../assets/images/3.png'
import smartwatchImage from '../../assets/images/smartwatch-product.png'
import laptopImage from '../../assets/images/7.png'
import amexLogo from '../../assets/images/payment.png'
import mastercardLogo from '../../assets/images/payment222.png'
import paypalLogo from '../../assets/images/paymentpayment 3.png'
import visaLogo from '../../assets/images/payment444.png'
import applePayLogo from '../../assets/images/payment555.png'
import '../Store/Store.css'
import './Cart.css'

const SAVED_FOR_LATER_IMAGES = [tabletImage, phoneImage, smartwatchImage, laptopImage]

function normalizeCartLine(line) {
  const product = line.product ?? line
  return {
    lineId: line.id,
    productId: product.id ?? line.product_id,
    name: product.name ?? line.name ?? '',
    price: Number(product.price ?? line.price ?? 0),
    image: product.image ?? line.image ?? '',
    quantity: line.quantity ?? line.qty ?? 1,
  }
}

function normalizeLocalLine(item) {
  return {
    lineId: null,
    productId: item.productId,
    name: item.name ?? '',
    price: Number(item.price ?? 0),
    image: item.image ?? '',
    quantity: item.quantity,
  }
}

const QTY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const PERK_ICONS = ['bi-shield-check', 'bi-headset', 'bi-truck']

const PAYMENT_LOGOS = [amexLogo, mastercardLogo, paypalLogo, visaLogo, applePayLogo]

const SOCIAL_LINKS = [
  { icon: 'bi-facebook', label: 'Facebook' },
  { icon: 'bi-twitter-x', label: 'Twitter' },
  { icon: 'bi-linkedin', label: 'LinkedIn' },
  { icon: 'bi-instagram', label: 'Instagram' },
  { icon: 'bi-youtube', label: 'YouTube' },
]

const FOOTER_COLUMNS = [
  {
    titleKey: 'store.footer.about.title',
    itemKeys: [
      'store.footer.about.aboutUs',
      'store.footer.about.findStore',
      'store.footer.about.categories',
      'store.footer.about.blogs',
    ],
  },
  {
    titleKey: 'store.footer.partnership.title',
    itemKeys: [
      'store.footer.partnership.aboutUs',
      'store.footer.partnership.findStore',
      'store.footer.partnership.categories',
      'store.footer.partnership.blogs',
    ],
  },
  {
    titleKey: 'store.footer.information.title',
    itemKeys: [
      'store.footer.information.helpCenter',
      'store.footer.information.moneyRefund',
      'store.footer.information.shipping',
      'store.footer.information.contactUs',
    ],
  },
  {
    titleKey: 'store.footer.forUsers.title',
    itemKeys: [
      'store.footer.forUsers.login',
      'store.footer.forUsers.register',
      'store.footer.forUsers.settings',
      'store.footer.forUsers.myOrders',
    ],
  },
]

function Cart({ onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onBackToShop, onCheckout }) {
  const { t } = useTranslation()
  const { user, loading: authLoading } = useAuth()
  const [items, setItems] = useState([])
  const [cartLoading, setCartLoading] = useState(true)
  const [cartError, setCartError] = useState('')
  const [coupon, setCoupon] = useState('')
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(null)
  const [selectedSavedIndex, setSelectedSavedIndex] = useState(null)
  // Lines currently mid-update (by lineId/productId), so a second click on the
  // same row while a request is in flight is ignored instead of racing it.
  const [pendingKeys, setPendingKeys] = useState(() => new Set())

  const perks = t('cartPage.perks', { returnObjects: true })

  const loadCart = async () => {
    setCartLoading(true)
    setCartError('')
    try {
      const rawItems = await loadCartItems(user)
      setItems(user ? rawItems.map(normalizeCartLine) : rawItems.map(normalizeLocalLine))
    } catch {
      setCartError(t('cartPage.loadError'))
    } finally {
      setCartLoading(false)
    }
  }

  useEffect(() => {
    if (authLoading) return
    loadCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading])

  const removeItem = async (item) => {
    try {
      await removeCartItem(user, item)
    } catch (err) {
      console.error(err)
      setCartError(t('cartPage.loadError'))
    } finally {
      loadCart()
    }
  }

  const removeAllItems = async () => {
    try {
      await Promise.all(items.map((item) => removeCartItem(user, item)))
    } catch (err) {
      console.error(err)
      setCartError(t('cartPage.loadError'))
    } finally {
      loadCart()
    }
  }

  const updateQty = async (item, value) => {
    const key = item.lineId ?? item.productId
    if (pendingKeys.has(key)) return
    const quantity = Number(value)
    setPendingKeys((current) => new Set(current).add(key))
    try {
      await updateItemQty(user, item, quantity)
    } catch (err) {
      console.error(err)
      setCartError(t('cartPage.loadError'))
    } finally {
      setPendingKeys((current) => {
        const next = new Set(current)
        next.delete(key)
        return next
      })
      loadCart()
    }
  }

  const stepQty = (item, delta) => updateQty(item, Math.max(1, item.quantity + delta))

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = 0
  const tax = 0
  const total = subtotal - discount + tax

  return (
    <div className="cart-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onProfileClick={onProfileClick}
        onMessageClick={onMessageClick}
        onOrdersClick={onOrdersClick}
        onBack={onBackToShop}
        mobileTitle={t('cartPage.mobileTitle')}
        hideSearch
      />

      <main className="cart-main">
        <h1 className="cart-title">{t('cartPage.title', { count: items.length })}</h1>

        {cartLoading && <p className="store-products-status">{t('store.loading')}</p>}
        {!cartLoading && cartError && (
          <p className="store-products-status store-products-error">{cartError}</p>
        )}

        <div className="cart-layout">
          <div className="cart-items-col">
            <ul className="cart-items-list">
              {!cartLoading && items.map((item) => {
                const isPending = pendingKeys.has(item.lineId ?? item.productId)
                return (
                <li className="cart-item" key={item.lineId ?? item.productId}>
                  <button
                    type="button"
                    className={`cart-item-thumb-btn ${selectedThumbIndex === item.productId ? 'is-selected' : ''}`}
                    onClick={() =>
                      setSelectedThumbIndex((current) => (current === item.productId ? null : item.productId))
                    }
                    aria-label={item.name}
                  >
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  </button>

                  <div className="cart-item-info">
                    <span className="cart-item-title">{item.name}</span>
                    <div className="cart-item-actions">
                      <button type="button" className="cart-item-action" onClick={() => removeItem(item)}>
                        {t('cartPage.remove')}
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price-col">
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    <select
                      className="form-select form-select-sm cart-item-qty"
                      value={item.quantity}
                      onChange={(event) => updateQty(item, event.target.value)}
                      aria-label={t('cartPage.qty', { count: item.quantity })}
                      disabled={isPending}
                    >
                      {QTY_OPTIONS.map((qty) => (
                        <option key={qty} value={qty}>
                          {t('cartPage.qty', { count: qty })}
                        </option>
                      ))}
                    </select>

                    <div className="cart-item-stepper">
                      <button
                        type="button"
                        onClick={() => stepQty(item, -1)}
                        aria-label="-"
                        disabled={isPending || item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => stepQty(item, 1)} aria-label="+" disabled={isPending}>
                        +
                      </button>
                    </div>
                  </div>
                </li>
                )
              })}
            </ul>

            <div className="cart-list-actions">
              <button type="button" className="btn cart-back-btn" onClick={onBackToShop}>
                <i className="bi bi-arrow-left" aria-hidden="true" />
                {t('cartPage.backToShop')}
              </button>
              <button
                type="button"
                className="cart-remove-all"
                onClick={removeAllItems}
              >
                {t('cartPage.removeAll')}
              </button>
            </div>

            <div className="cart-perks">
              {perks.map((perk, index) => (
                <div className="cart-perk" key={perk.title}>
                  <span className="cart-perk-icon">
                    <i className={`bi ${PERK_ICONS[index]}`} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{perk.title}</strong>
                    <span>{perk.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="cart-summary">
            <span className="cart-summary-coupon-label">{t('cartPage.summary.couponTitle')}</span>
            <div className="cart-summary-coupon-row">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder={t('cartPage.summary.couponPlaceholder')}
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
              />
              <button type="button" className="cart-summary-apply">
                {t('cartPage.summary.apply')}
              </button>
            </div>

            <div className="cart-summary-totals">
              <div className="cart-summary-row">
                <span>{t('cartPage.summary.subtotal')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>{t('cartPage.summary.discount')}</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>{t('cartPage.summary.tax')}</span>
                <span>+${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-summary-total-row">
              <span>{t('cartPage.summary.total')}</span>
              <span className="cart-summary-total-value">${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="btn cart-checkout-btn"
              onClick={onCheckout}
              disabled={items.length === 0}
            >
              {t('cartPage.summary.checkout')}
            </button>

            <div className="cart-summary-payments">
              {PAYMENT_LOGOS.map((logo) => (
                <img key={logo} src={logo} alt="" />
              ))}
            </div>
          </aside>
        </div>

        <section className="cart-saved-section">
          <h3 className="store-section-title">{t('cartPage.savedForLater.title')}</h3>
          <div className="cart-saved-grid">
            {SAVED_FOR_LATER_IMAGES.map((img, index) => (
              <div
                className={`cart-saved-card ${selectedSavedIndex === index ? 'is-selected' : ''}`}
                key={img}
                onClick={() => setSelectedSavedIndex((current) => (current === index ? null : index))}
              >
                <img src={img} alt={t('cartPage.savedForLater.name')} />
                <span className="cart-saved-price">{t('cartPage.savedForLater.price')}</span>
                <span className="cart-saved-name">{t('cartPage.savedForLater.name')}</span>
                <button
                  type="button"
                  className="cart-saved-move-btn"
                  onClick={(event) => event.stopPropagation()}
                >
                  <i className="bi bi-cart-plus" aria-hidden="true" />
                  {t('cartPage.savedForLater.moveToCart')}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="store-discount-banner">
          <div className="store-discount-text">
            <h3>{t('productDetail.discountBanner.title')}</h3>
            <p>{t('productDetail.discountBanner.subtitle')}</p>
          </div>
          <button type="button" className="btn store-discount-btn">
            {t('productDetail.discountBanner.cta')}
          </button>
        </section>
      </main>

      <footer className="store-footer">
        <div className="store-footer-top">
          <div className="store-footer-brand">
            <img src={borcelleLogo} alt={t('login.brand')} className="store-footer-logo" />
            <p className="store-footer-tagline">{t('store.footer.tagline')}</p>
            <div className="store-footer-socials">
              {SOCIAL_LINKS.map((social) => (
                <a href="#" className="store-footer-social-btn" aria-label={social.label} key={social.icon}>
                  <i className={`bi ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div className="store-footer-column" key={column.titleKey}>
              <h4 className="store-footer-column-title">{t(column.titleKey)}</h4>
              <ul className="store-footer-links">
                {column.itemKeys.map((itemKey) => (
                  <li key={itemKey}>
                    <button type="button" className="store-footer-link">
                      {t(itemKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="store-footer-column store-footer-apps">
            <h4 className="store-footer-column-title">{t('store.footer.getApp.title')}</h4>
            <button type="button" className="store-app-badge">
              <i className="bi bi-apple" aria-hidden="true" />
              <span className="store-app-badge-text">
                <small>{t('store.footer.getApp.downloadOn')}</small>
                <strong>App Store</strong>
              </span>
            </button>
            <button type="button" className="store-app-badge">
              <i className="bi bi-google-play" aria-hidden="true" />
              <span className="store-app-badge-text">
                <small>{t('store.footer.getApp.getItOn')}</small>
                <strong>Google Play</strong>
              </span>
            </button>
          </div>
        </div>

        <div className="store-footer-bottom">
          <span>{t('store.footer.copyright')}</span>
          <button type="button" className="store-footer-lang">
            <img src={flagUk} alt="" className="store-footer-lang-flag" />
            {t('store.footer.language')}
            <i className="bi bi-chevron-up" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Cart
