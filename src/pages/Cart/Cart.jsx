import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import borcelleLogo from '../../assets/images/borcelle-logo.png'
import flagUk from '../../assets/images/icon.png'
import tealPoloImage from '../../assets/images/Bitmap.png'
import bluePoloImage from '../../assets/images/2.png'
import organizerImage from '../../assets/images/rasm.png'
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

const CART_ITEMS = [
  { img: tealPoloImage, price: 78.99, qty: 9 },
  { img: bluePoloImage, price: 39.0, qty: 3 },
  { img: organizerImage, price: 170.5, qty: 1 },
]

const SAVED_FOR_LATER_IMAGES = [tabletImage, phoneImage, smartwatchImage, laptopImage]

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
  const [itemIndices, setItemIndices] = useState(CART_ITEMS.map((_, index) => index))
  const [quantities, setQuantities] = useState(CART_ITEMS.map((item) => item.qty))
  const [coupon, setCoupon] = useState('')
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(null)
  const [selectedSavedIndex, setSelectedSavedIndex] = useState(null)

  const itemTexts = t('cartPage.items', { returnObjects: true })
  const perks = t('cartPage.perks', { returnObjects: true })

  const removeItem = (index) => {
    setItemIndices((current) => current.filter((itemIndex) => itemIndex !== index))
  }

  const updateQty = (index, value) => {
    setQuantities((current) => current.map((qty, itemIndex) => (itemIndex === index ? Number(value) : qty)))
  }

  const stepQty = (index, delta) => {
    setQuantities((current) =>
      current.map((qty, itemIndex) => (itemIndex === index ? Math.max(1, qty + delta) : qty)),
    )
  }

  const subtotal = 1403.97
  const discount = 60.0
  const tax = 14.0
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
        <h1 className="cart-title">{t('cartPage.title', { count: itemIndices.length })}</h1>

        <div className="cart-layout">
          <div className="cart-items-col">
            <ul className="cart-items-list">
              {itemIndices.map((index) => (
                <li className="cart-item" key={index}>
                  <button
                    type="button"
                    className={`cart-item-thumb-btn ${selectedThumbIndex === index ? 'is-selected' : ''}`}
                    onClick={() => setSelectedThumbIndex((current) => (current === index ? null : index))}
                    aria-label={itemTexts[index].title}
                  >
                    <img src={CART_ITEMS[index].img} alt={itemTexts[index].title} className="cart-item-thumb" />
                  </button>

                  <div className="cart-item-info">
                    <span className="cart-item-title">{itemTexts[index].title}</span>
                    <span className="cart-item-meta">{itemTexts[index].meta}</span>
                    <span className="cart-item-seller">{itemTexts[index].seller}</span>
                    <div className="cart-item-actions">
                      <button type="button" className="cart-item-action" onClick={() => removeItem(index)}>
                        {t('cartPage.remove')}
                      </button>
                      <button type="button" className="cart-item-action">
                        {t('cartPage.saveForLater')}
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price-col">
                    <span className="cart-item-price">${CART_ITEMS[index].price.toFixed(2)}</span>
                    <select
                      className="form-select form-select-sm cart-item-qty"
                      value={quantities[index]}
                      onChange={(event) => updateQty(index, event.target.value)}
                      aria-label={t('cartPage.qty', { count: quantities[index] })}
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
                        onClick={() => stepQty(index, -1)}
                        aria-label="-"
                        disabled={quantities[index] <= 1}
                      >
                        -
                      </button>
                      <span>{quantities[index]}</span>
                      <button type="button" onClick={() => stepQty(index, 1)} aria-label="+">
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-list-actions">
              <button type="button" className="btn cart-back-btn" onClick={onBackToShop}>
                <i className="bi bi-arrow-left" aria-hidden="true" />
                {t('cartPage.backToShop')}
              </button>
              <button type="button" className="cart-remove-all" onClick={() => setItemIndices([])}>
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
              <span className="cart-summary-total-value">
                ${total.toFixed(2)}
                <s className="cart-summary-total-original">${(subtotal + tax).toFixed(2)}</s>
              </span>
            </div>

            <button type="button" className="btn cart-checkout-btn" onClick={onCheckout}>
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
