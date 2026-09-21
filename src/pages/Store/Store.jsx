import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import MobileMenu from '../../components/MobileMenu/MobileMenu'
import heroBanner from '../../assets/images/Banner-board-800x420 2.png'
import homeOutdoorBanner from '../../assets/images/Group 969.png'
import consumerBanner from '../../assets/images/Group 970.png'
import chairImage from '../../assets/images/1.png'
import blackPhoneImage from '../../assets/images/3.png'
import gamingSetImage from '../../assets/images/5.png'
import cameraImage from '../../assets/images/6.png'
import laptopImage from '../../assets/images/7.png'
import homeApplianceImage from '../../assets/images/rasm.png'
import tableLampImage from '../../assets/images/image 94.png'
import airMattressImage from '../../assets/images/image 93.png'
import potImage from '../../assets/images/image 90.png'
import kitchenMixerImage from '../../assets/images/image 88.png'
import coffeeMakerImage from '../../assets/images/image 87.png'
import plantImage from '../../assets/images/image 89.png'
import headphonesImage from '../../assets/images/image 86.png'
import kettleImage from '../../assets/images/image 85.png'
import tabletImage from '../../assets/images/image 32.png'
import redPhoneImage from '../../assets/images/image 33.png'
import inquiryBanner from '../../assets/images/image 102.png'
import poloShirtImage from '../../assets/images/Bitmap.png'
import winterJacketImage from '../../assets/images/2 1.png'
import blazerImage from '../../assets/images/image 30.png'
import blueWalletImage from '../../assets/images/image 24.png'
import backpackImage from '../../assets/images/image 26.png'
import denimShortsImage from '../../assets/images/4.png'
import headphonesWhiteImage from '../../assets/images/9.png'
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

const HOME_OUTDOOR_ITEMS = [
  { img: chairImage, titleKey: 'store.items.softChairs', price: 'USD 19' },
  { img: tableLampImage, titleKey: 'store.items.tableLamps', price: 'USD 19' },
  { img: airMattressImage, titleKey: 'store.items.airMattress', price: 'USD 19' },
  { img: potImage, titleKey: 'store.items.kitchenDishes', price: 'USD 19' },
  { img: kitchenMixerImage, titleKey: 'store.items.kitchenMixer', price: 'USD 100' },
  { img: coffeeMakerImage, titleKey: 'store.items.coffeeMaker', price: 'USD 39' },
  { img: homeApplianceImage, titleKey: 'store.items.homeAppliance', price: 'USD 19' },
  { img: plantImage, titleKey: 'store.items.homePlants', price: 'USD 15' },
]

const CONSUMER_ITEMS = [
  { img: cameraImage, titleKey: 'store.items.cameras', price: 'USD 89' },
  { img: headphonesImage, titleKey: 'store.items.headphones', price: 'USD 10' },
  { img: kettleImage, titleKey: 'store.items.electricKettle', price: 'USD 90' },
  { img: gamingSetImage, titleKey: 'store.items.gamingSet', price: 'USD 35' },
  { img: laptopImage, titleKey: 'store.items.laptopsPc', price: 'USD 340' },
  { img: tabletImage, titleKey: 'store.items.tablets', price: 'USD 19' },
  { img: redPhoneImage, titleKey: 'store.items.smartphones', price: 'USD 240' },
  { img: blackPhoneImage, titleKey: 'store.items.smartphones', price: 'USD 199' },
]

const RECOMMENDED_ITEMS = [
  { img: poloShirtImage, price: '$10.30', descKey: 'store.recommended.item1' },
  { img: winterJacketImage, price: '$10.30', descKey: 'store.recommended.item2' },
  { img: blazerImage, price: '$12.50', descKey: 'store.recommended.item3' },
  { img: blueWalletImage, price: '$34.00', descKey: 'store.recommended.item4' },
  { img: backpackImage, price: '$99.00', descKey: 'store.recommended.item5' },
  { img: denimShortsImage, price: '$9.99', descKey: 'store.recommended.item6' },
  { img: headphonesWhiteImage, price: '$8.99', descKey: 'store.recommended.item7' },
  { img: backpackImage, price: '$10.30', descKey: 'store.recommended.item8' },
  { img: potImage, price: '$10.30', descKey: 'store.recommended.item9' },
  { img: kettleImage, price: '$80.95', descKey: 'store.recommended.item10' },
]

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

const DEAL_ITEMS = [
  { img: laptopImage, titleKey: 'store.items.laptopsPc', discount: '-15%' },
  { img: cameraImage, titleKey: 'store.items.cameras', discount: '-25%' },
  { img: gamingSetImage, titleKey: 'store.items.gamingSet', discount: '-25%' },
  { img: blackPhoneImage, titleKey: 'store.items.smartphones', discount: '-25%' },
]

function Store({ onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick, onCategoryClick, onProductClick }) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [itemNeeded, setItemNeeded] = useState('')
  const [inquiryDetails, setInquiryDetails] = useState('')
  const [quantity, setQuantity] = useState('')
  const [inquirySent, setInquirySent] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [activeSubnavTab, setActiveSubnavTab] = useState('menu')
  const [selectedProductKey, setSelectedProductKey] = useState(null)
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null)
  const categories = t('store.categories', { returnObjects: true })

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
              <li key={category}>
                <button
                  type="button"
                  className={`store-category-item ${index === 0 ? 'is-active' : ''}`}
                  onClick={onCategoryClick}
                >
                  {category}
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
                {DEAL_ITEMS.map((item, index) => (
                  <button
                    type="button"
                    className={`store-deal-card ${selectedProductKey === `deal-${index}` ? 'is-selected' : ''}`}
                    onClick={() => toggleProductSelect(`deal-${index}`)}
                    key={index}
                  >
                    <img src={item.img} alt={t(item.titleKey)} className="store-deal-card-img" />
                    <span className="store-deal-card-title">{t(item.titleKey)}</span>
                    <span className="store-deal-card-badge">{item.discount}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="store-banner-section">
            <div
              className="store-banner"
              style={{ backgroundImage: `url(${homeOutdoorBanner})` }}
            >
              <h3 className="store-banner-title">{t('store.homeOutdoor')}</h3>
              <button type="button" className="btn store-banner-btn">
                {t('store.sourceNow')}
              </button>
            </div>
            <div className="store-product-grid">
              {HOME_OUTDOOR_ITEMS.map((item, index) => (
                <button
                  type="button"
                  className={`store-product-card ${selectedProductKey === `outdoor-${index}` ? 'is-selected' : ''}`}
                  onClick={() => toggleProductSelect(`outdoor-${index}`)}
                  key={index}
                >
                  <div className="store-product-card-info">
                    <span className="store-product-card-title">{t(item.titleKey)}</span>
                    <span className="store-product-card-price">
                      {t('store.from')}
                      <br />
                      {item.price}
                    </span>
                  </div>
                  <img src={item.img} alt={t(item.titleKey)} className="store-product-card-img" />
                </button>
              ))}
            </div>
          </section>

          <section className="store-banner-section">
            <div
              className="store-banner"
              style={{ backgroundImage: `url(${consumerBanner})` }}
            >
              <h3 className="store-banner-title">{t('store.consumerElectronics')}</h3>
              <button type="button" className="btn store-banner-btn">
                {t('store.sourceNow')}
              </button>
            </div>
            <div className="store-product-grid">
              {CONSUMER_ITEMS.map((item, index) => (
                <button
                  type="button"
                  className={`store-product-card ${selectedProductKey === `consumer-${index}` ? 'is-selected' : ''}`}
                  onClick={() => toggleProductSelect(`consumer-${index}`)}
                  key={index}
                >
                  <div className="store-product-card-info">
                    <span className="store-product-card-title">{t(item.titleKey)}</span>
                    <span className="store-product-card-price">
                      {t('store.from')}
                      <br />
                      {item.price}
                    </span>
                  </div>
                  <img src={item.img} alt={t(item.titleKey)} className="store-product-card-img" />
                </button>
              ))}
            </div>
          </section>

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
              {RECOMMENDED_ITEMS.map((item, index) => (
                <button
                  type="button"
                  className="store-recommended-card"
                  key={index}
                  onClick={onProductClick}
                >
                  <img src={item.img} alt={t(item.descKey)} className="store-recommended-img" />
                  <span className="store-recommended-price">{item.price}</span>
                  <span className="store-recommended-desc">{t(item.descKey)}</span>
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
