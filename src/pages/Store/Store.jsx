import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import MobileMenu from '../../components/MobileMenu/MobileMenu'
import { getCategories } from '../../api/categories'
import { getProducts } from '../../api/products'
import { PLACEHOLDER_IMAGE } from '../../utils/placeholderImage'
import heroBanner from '../../assets/images/Banner-board-800x420 2.png'
import homeOutdoorBanner from '../../assets/images/Group 969.png'
import consumerBanner from '../../assets/images/Group 970.png'
import inquiryBanner from '../../assets/images/image 102.png'
import sourceHubsImage from '../../assets/images/Mask group.png'
import customizeImage from '../../assets/images/Mask group (1).png'
import shippingImage from '../../assets/images/Mask group (2).png'
import monitoringImage from '../../assets/images/Mask group (3).png'
import flagUae from '../../assets/images/AE@2x.png'
import flagAustralia from '../../assets/images/AU@2x.png'
import flagUsa from '../../assets/images/US@2x.png'
import flagRussia from '../../assets/images/RU@2x.png'
import flagItaly from '../../assets/images/IT@2x.png'
import flagDenmark from '../../assets/images/DK@2x.png'
import flagFrance from '../../assets/images/FR@2x.png'
import flagChina from '../../assets/images/CN@2x.png'
import flagUk from '../../assets/images/icon.png'
import borcelleLogo from '../../assets/images/borcelle-logo.png'
import './Store.css'

const EXTRA_SERVICES = [
  { img: sourceHubsImage, icon: 'bi bi-search', titleKey: 'store.extraServices.sourceHubs' },
  { img: customizeImage, icon: 'bi bi-palette', titleKey: 'store.extraServices.customize' },
  { img: shippingImage, icon: 'bi bi-send', titleKey: 'store.extraServices.shipping' },
  { img: monitoringImage, icon: 'bi bi-shield-check', titleKey: 'store.extraServices.monitoring' },
]

const SUPPLIERS_BY_REGION = [
  { flag: flagUae, domain: 'shopname.ae', nameKey: 'store.regions.uae' },
  { flag: flagAustralia, domain: 'shopname.au', nameKey: 'store.regions.australia' },
  { flag: flagUsa, domain: 'shopname.us', nameKey: 'store.regions.usa' },
  { flag: flagRussia, domain: 'shopname.ru', nameKey: 'store.regions.russia' },
  { flag: flagItaly, domain: 'shopname.it', nameKey: 'store.regions.italy' },
  { flag: flagDenmark, domain: 'shopname.dk', nameKey: 'store.regions.denmark' },
  { flag: flagFrance, domain: 'shopname.fr', nameKey: 'store.regions.france' },
  { flag: flagUae, domain: 'shopname.ae', nameKey: 'store.regions.uae' },
  { flag: flagChina, domain: 'shopname.cn', nameKey: 'store.regions.china' },
  { flag: flagUk, domain: 'shopname.uk', nameKey: 'store.regions.uk' },
]

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

function Store({ onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick, onCategoryClick, onProductClick }) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [shelfSections, setShelfSections] = useState([])
  const [dealProducts, setDealProducts] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [itemNeeded, setItemNeeded] = useState('')
  const [inquiryDetails, setInquiryDetails] = useState('')
  const [quantity, setQuantity] = useState('')
  const [inquirySent, setInquirySent] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [activeSubnavTab, setActiveSubnavTab] = useState('menu')
  const [selectedProductKey, setSelectedProductKey] = useState(null)
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadStoreData() {
      setProductsLoading(true)
      setProductsError('')
      try {
        const fetchedCategories = await getCategories()
        const shelfCategories = fetchedCategories.slice(0, 2)
        const sections = await Promise.all(
          shelfCategories.map(async (category) => ({
            category,
            products: await getProducts({ categoryId: category.id }),
          })),
        )
        const recommended = await getProducts()

        if (cancelled) return
        setCategories(fetchedCategories)
        setShelfSections(sections)
        setRecommendedProducts(recommended)
        setDealProducts(recommended.slice(0, 4))
      } catch {
        if (!cancelled) setProductsError(t('store.loadError'))
      } finally {
        if (!cancelled) setProductsLoading(false)
      }
    }

    loadStoreData()
    return () => {
      cancelled = true
    }
  }, [t])

  const toggleProductSelect = (key) => {
    setSelectedProductKey((current) => (current === key ? null : key))
  }

  const handleInquirySubmit = (event) => {
    event.preventDefault()
    if (!itemNeeded.trim() || !inquiryDetails.trim() || !quantity) return
    setInquirySent(true)
    setItemNeeded('')
    setInquiryDetails('')
    setQuantity('')
  }

  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="store-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onProfileClick={onProfileClick}
        onMessageClick={onMessageClick}
        onOrdersClick={onOrdersClick}
        onCartClick={onCartClick}
        onMenuClick={() => setMenuOpen(true)}
      />

      <nav className="store-subnav">
        <button
          type="button"
          className={`store-subnav-link store-subnav-menu ${activeSubnavTab === 'menu' ? 'is-active' : ''}`}
          onClick={() => setActiveSubnavTab('menu')}
        >
          <i className="bi bi-list" aria-hidden="true" />
          {t('store.menu')}
        </button>
        <button
          type="button"
          className={`store-subnav-link ${activeSubnavTab === 'hotOffers' ? 'is-active' : ''}`}
          onClick={() => setActiveSubnavTab('hotOffers')}
        >
          {t('store.hotOffers')}
        </button>
        <button
          type="button"
          className={`store-subnav-link ${activeSubnavTab === 'giftBoxes' ? 'is-active' : ''}`}
          onClick={() => setActiveSubnavTab('giftBoxes')}
        >
          {t('store.giftBoxes')}
        </button>
        <button
          type="button"
          className={`store-subnav-link ${activeSubnavTab === 'aboutUs' ? 'is-active' : ''}`}
          onClick={() => setActiveSubnavTab('aboutUs')}
        >
          {t('store.aboutUs')}
        </button>
        <button type="button" className="store-subnav-link store-subnav-help">
          {t('store.help')}
          <i className="bi bi-chevron-down" aria-hidden="true" />
        </button>
      </nav>

      <div className="store-layout">
        <aside className="store-sidebar">
          <ul className="store-category-list">
            {categories.map((category, index) => (
              <li key={category.id}>
                <button
                  type="button"
                  className={`store-category-item ${index === 0 ? 'is-active' : ''}`}
                  onClick={onCategoryClick}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="store-main">
          <div className="store-hero-row">
            <section
              className="store-hero"
              style={{ backgroundImage: `url(${heroBanner})` }}
            >
              <p className="store-hero-title">{t('store.heroTitle')}</p>
              <h2 className="store-hero-highlight">{t('store.heroHighlight')}</h2>
              <button type="button" className="btn store-hero-btn">
                {t('store.learnMore')}
              </button>
            </section>

            <div className="store-promo-column">
              <div className="store-promo-card store-promo-user">
                <span className="store-promo-avatar">
                  <i className="bi bi-person" aria-hidden="true" />
                </span>
                <p className="store-promo-greeting">
                  {t('store.promo.greeting')}
                  <br />
                  {t('store.promo.greetingSubtitle')}
                </p>
                <button type="button" className="btn store-promo-join-btn">
                  {t('store.promo.joinNow')}
                </button>
                <button type="button" className="btn store-promo-login-btn">
                  {t('store.promo.logIn')}
                </button>
              </div>

              <div className="store-promo-card store-promo-discount">
                {t('store.promo.discountBanner')}
              </div>

              <div className="store-promo-card store-promo-quote">
                {t('store.promo.quoteBanner')}
              </div>
            </div>
          </div>

          {productsLoading && <p className="store-products-status">{t('store.loading')}</p>}
          {!productsLoading && productsError && (
            <p className="store-products-status store-products-error">{productsError}</p>
          )}

          <section className="store-section">
            <div className="store-section-heading">
              <h3 className="store-section-title">{t('store.dealsTitle')}</h3>
              <p className="store-section-subtitle">{t('store.dealsSubtitle')}</p>
            </div>
            <div className="store-deals-row">
              <div className="store-countdown">
                <span className="store-countdown-tile">
                  <strong>04</strong>
                  <small>{t('store.days')}</small>
                </span>
                <span className="store-countdown-tile">
                  <strong>13</strong>
                  <small>{t('store.hours')}</small>
                </span>
                <span className="store-countdown-tile">
                  <strong>34</strong>
                  <small>{t('store.minutes')}</small>
                </span>
                <span className="store-countdown-tile">
                  <strong>56</strong>
                  <small>{t('store.seconds')}</small>
                </span>
              </div>
              <div className="store-deals-grid">
                {dealProducts.map((product, index) => (
                  <button
                    type="button"
                    className={`store-deal-card ${selectedProductKey === `deal-${index}` ? 'is-selected' : ''}`}
                    onClick={() => {
                      toggleProductSelect(`deal-${index}`)
                      onProductClick?.(product.id)
                    }}
                    key={product.id}
                  >
                    <img src={product.image || PLACEHOLDER_IMAGE} alt={product.name} className="store-deal-card-img" />
                    <span className="store-deal-card-title">{product.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {shelfSections.map((shelf, shelfIndex) => (
            <section className="store-banner-section" key={shelf.category.id}>
              <div
                className="store-banner"
                style={{
                  backgroundImage: `url(${shelfIndex === 0 ? homeOutdoorBanner : consumerBanner})`,
                }}
              >
                <h3 className="store-banner-title">{shelf.category.name}</h3>
                <button type="button" className="btn store-banner-btn" onClick={onCategoryClick}>
                  {t('store.sourceNow')}
                </button>
              </div>
              <div className="store-product-grid">
                {shelf.products.map((product, index) => (
                  <button
                    type="button"
                    className={`store-product-card ${
                      selectedProductKey === `shelf-${shelfIndex}-${index}` ? 'is-selected' : ''
                    }`}
                    onClick={() => {
                      toggleProductSelect(`shelf-${shelfIndex}-${index}`)
                      onProductClick?.(product.id)
                    }}
                    key={product.id}
                  >
                    <div className="store-product-card-info">
                      <span className="store-product-card-title">{product.name}</span>
                      <span className="store-product-card-price">
                        {t('store.from')}
                        <br />
                        {product.price}
                      </span>
                    </div>
                    <img src={product.image || PLACEHOLDER_IMAGE} alt={product.name} className="store-product-card-img" />
                  </button>
                ))}
              </div>
            </section>
          ))}

          <section
            className="store-inquiry"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(230, 57, 70, 0.45), rgba(122, 20, 32, 0.4)), url(${inquiryBanner})`,
            }}
          >
            <div className="store-inquiry-text">
              <h3 className="store-inquiry-title">{t('store.inquiry.title')}</h3>
              <p className="store-inquiry-subtitle">{t('store.inquiry.subtitle')}</p>
            </div>

            <form className="store-inquiry-card" onSubmit={handleInquirySubmit}>
              <h4 className="store-inquiry-card-title">{t('store.inquiry.formTitle')}</h4>

              <input
                type="text"
                className="form-control store-inquiry-input"
                placeholder={t('store.inquiry.itemPlaceholder')}
                value={itemNeeded}
                required
                onChange={(event) => {
                  setItemNeeded(event.target.value)
                  setInquirySent(false)
                }}
              />

              <textarea
                className="form-control store-inquiry-input"
                rows={3}
                placeholder={t('store.inquiry.detailsPlaceholder')}
                value={inquiryDetails}
                required
                onChange={(event) => {
                  setInquiryDetails(event.target.value)
                  setInquirySent(false)
                }}
              />

              <div className="store-inquiry-qty-row">
                <label className="store-inquiry-qty-label" htmlFor="inquiry-quantity">
                  {t('store.inquiry.quantity')}
                </label>
                <div className="input-group store-inquiry-qty-group">
                  <input
                    id="inquiry-quantity"
                    type="number"
                    min="1"
                    className="form-control"
                    value={quantity}
                    required
                    onChange={(event) => {
                      setQuantity(event.target.value)
                      setInquirySent(false)
                    }}
                  />
                  <select className="form-select" defaultValue="pcs">
                    <option value="pcs">{t('store.inquiry.pcs')}</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn store-inquiry-submit-btn">
                {t('store.inquiry.sendInquiry')}
              </button>

              {inquirySent && (
                <p className="store-inquiry-success">
                  <i className="bi bi-check-circle-fill" aria-hidden="true" />
                  {t('store.inquiry.successMessage')}
                </p>
              )}
            </form>
          </section>

          <section className="store-section">
            <h3 className="store-section-title">{t('store.recommended.title')}</h3>
            <div className="store-recommended-grid">
              {recommendedProducts.map((product) => (
                <button
                  type="button"
                  className="store-recommended-card"
                  key={product.id}
                  onClick={() => onProductClick?.(product.id)}
                >
                  <img src={product.image || PLACEHOLDER_IMAGE} alt={product.name} className="store-recommended-img" />
                  <span className="store-recommended-price">{product.price}</span>
                  <span className="store-recommended-desc">{product.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="store-section">
            <h3 className="store-section-title">{t('store.extraServices.title')}</h3>
            <div className="store-extra-grid">
              {EXTRA_SERVICES.map((service, index) => (
                <button
                  type="button"
                  className={`store-extra-card ${selectedServiceIndex === index ? 'is-selected' : ''}`}
                  key={index}
                  onClick={() => setSelectedServiceIndex((current) => (current === index ? null : index))}
                >
                  <div
                    className="store-extra-card-media"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)), url("${service.img}")`,
                    }}
                  >
                    <span className="store-extra-card-icon">
                      <i className={service.icon} aria-hidden="true" />
                    </span>
                  </div>
                  <span className="store-extra-card-title">{t(service.titleKey)}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="store-section">
            <h3 className="store-section-title">{t('store.suppliersByRegion.title')}</h3>
            <div className="store-suppliers-grid">
              {SUPPLIERS_BY_REGION.map((supplier, index) => (
                <div className="store-supplier-item" key={index}>
                  <img className="store-supplier-flag" src={supplier.flag} alt="" aria-hidden="true" />
                  <span className="store-supplier-info">
                    <span className="store-supplier-name">{t(supplier.nameKey)}</span>
                    <span className="store-supplier-domain">{supplier.domain}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <section className="store-newsletter">
        <h3 className="store-newsletter-title">{t('store.newsletter.title')}</h3>
        <p className="store-newsletter-subtitle">{t('store.newsletter.subtitle')}</p>
        <form className="store-newsletter-form" onSubmit={handleNewsletterSubmit}>
          <div className="input-group store-newsletter-input-group">
            <span className="input-group-text store-newsletter-icon">
              <i className="bi bi-envelope" aria-hidden="true" />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder={t('store.newsletter.emailPlaceholder')}
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
            />
          </div>
          <button type="submit" className="btn store-newsletter-btn">
            {t('store.newsletter.subscribe')}
          </button>
        </form>
      </section>

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

      {menuOpen && (
        <MobileMenu
          onClose={() => setMenuOpen(false)}
          onCategoriesClick={() => {
            setMenuOpen(false)
            onCategoryClick?.()
          }}
        />
      )}
    </div>
  )
}

export default Store
