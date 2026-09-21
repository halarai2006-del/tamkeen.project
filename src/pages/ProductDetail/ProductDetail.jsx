import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import borcelleLogo from '../../assets/images/borcelle-logo.png'
import flagUk from '../../assets/images/icon.png'
import successBadge from '../../assets/images/success-badge.png'
import mainShirt from '../../assets/images/image 34.png'
import thumbShirtWhite from '../../assets/images/image 35.png'
import thumbShirt3 from '../../assets/images/image 38.png'
import thumbShirt4 from '../../assets/images/image 39.png'
import thumbShirt5 from '../../assets/images/image 40.png'
import thumbShirt6 from '../../assets/images/image 37.png'
import blazerImage from '../../assets/images/image 30.png'
import poloContrastImage from '../../assets/images/Group 558.png'
import smartwatchImage from '../../assets/images/smartwatch-product.png'
import backpackImage from '../../assets/images/image 26.png'
import walletImage from '../../assets/images/image 24.png'
import headphonesImage from '../../assets/images/9.png'
import denimShortsImage from '../../assets/images/4.png'
import kettleImage from '../../assets/images/image 85.png'
import organizerImage from '../../assets/images/rasm.png'
import '../Store/Store.css'
import './ProductDetail.css'

const GALLERY_IMAGES = [mainShirt, thumbShirtWhite, thumbShirt3, thumbShirt4, thumbShirt5, thumbShirt6]

const YOU_MAY_LIKE_IMAGES = [blazerImage, poloContrastImage, smartwatchImage, backpackImage, mainShirt]

const RELATED_PRODUCT_IMAGES = [walletImage, smartwatchImage, headphonesImage, denimShortsImage, kettleImage, organizerImage]

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

function RatingStars({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i += 1) {
    let icon = 'bi-star'
    if (rating >= i) icon = 'bi-star-fill'
    else if (rating >= i - 0.5) icon = 'bi-star-half'
    stars.push(<i key={i} className={`bi ${icon}`} aria-hidden="true" />)
  }
  return <span className="pd-rating-stars">{stars}</span>
}

function ProductDetail({ onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick }) {
  const { t } = useTranslation()
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [saved, setSaved] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedLikeIndex, setSelectedLikeIndex] = useState(null)
  const [selectedRelatedIndex, setSelectedRelatedIndex] = useState(null)

  const breadcrumb = t('productDetail.breadcrumb', { returnObjects: true })
  const priceTiers = t('productDetail.priceTiers', { returnObjects: true })
  const attributes = t('productDetail.attributes', { returnObjects: true })
  const descriptionParagraphs = t('productDetail.descriptionParagraphs', { returnObjects: true })
  const specs = t('productDetail.specs', { returnObjects: true })
  const features = t('productDetail.features', { returnObjects: true })
  const youMayLikeItems = t('productDetail.youMayLike.items', { returnObjects: true })

  const tabs = [
    { key: 'description', label: t('productDetail.tabs.description') },
    { key: 'reviews', label: t('productDetail.tabs.reviews') },
    { key: 'shipping', label: t('productDetail.tabs.shipping') },
    { key: 'aboutSeller', label: t('productDetail.tabs.aboutSeller') },
  ]

  return (
    <div className="product-detail-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onProfileClick={onProfileClick}
        onMessageClick={onMessageClick}
        onOrdersClick={onOrdersClick}
        onCartClick={onCartClick}
        onBack={onBrandClick}
      />

      <nav className="store-subnav">
        <button type="button" className="store-subnav-link store-subnav-menu is-active">
          <i className="bi bi-list" aria-hidden="true" />
          {t('store.menu')}
        </button>
        <button type="button" className="store-subnav-link">
          {t('store.hotOffers')}
        </button>
        <button type="button" className="store-subnav-link">
          {t('store.giftBoxes')}
        </button>
        <button type="button" className="store-subnav-link">
          {t('store.aboutUs')}
        </button>
        <button type="button" className="store-subnav-link store-subnav-help">
          {t('store.help')}
          <i className="bi bi-chevron-down" aria-hidden="true" />
        </button>
      </nav>

      <nav className="category-breadcrumb" aria-label="breadcrumb">
        {breadcrumb.map((crumb, index) => (
          <span key={crumb} className="category-breadcrumb-item">
            {index > 0 && <i className="bi bi-chevron-right category-breadcrumb-sep" aria-hidden="true" />}
            {crumb}
          </span>
        ))}
      </nav>

      <main className="pd-main">
        <section className="pd-top">
          <div className="pd-gallery">
            <button
              type="button"
              className="pd-gallery-main"
              onClick={() => setLightboxOpen(true)}
              aria-label={t('productDetail.zoomImage')}
            >
              <img src={GALLERY_IMAGES[activeImage]} alt={t('productDetail.title')} />
            </button>
            <div className="pd-gallery-thumbs">
              {GALLERY_IMAGES.map((img, index) => (
                <button
                  type="button"
                  key={img}
                  className={`pd-gallery-thumb ${index === activeImage ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`${t('productDetail.title')} ${index + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="pd-info">
            <span className="pd-stock-badge">
              <img src={successBadge} alt="" />
              {t('productDetail.inStock')}
            </span>

            <h1 className="pd-title">{t('productDetail.title')}</h1>

            <div className="pd-rating-row">
              <RatingStars rating={4.6} />
              <span className="pd-rating-score">{t('productDetail.rating')}</span>
              <span className="pd-rating-sep">|</span>
              <span>{t('productDetail.reviews', { count: 32 })}</span>
              <span className="pd-rating-sep">·</span>
              <span>{t('productDetail.sold', { count: 154 })}</span>
            </div>

            <div className="pd-price-tiers">
              {priceTiers.map((tier, index) => (
                <div className={`pd-price-tier ${index === 0 ? 'is-highlight' : ''}`} key={tier.range}>
                  <span className="pd-price-tier-price">{tier.price}</span>
                  <span className="pd-price-tier-range">{tier.range}</span>
                </div>
              ))}
            </div>

            <dl className="pd-attrs">
              {attributes.map((attr) => (
                <div className="pd-attrs-row" key={attr.label}>
                  <dt>{attr.label}</dt>
                  <dd>{attr.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="pd-buybox-wrap">
            <aside className="pd-buybox">
              <div className="pd-supplier-row">
                <span className="pd-supplier-avatar">R</span>
                <div>
                  <span className="pd-supplier-label">{t('productDetail.supplier.label')}</span>
                  <strong className="pd-supplier-name">{t('productDetail.supplier.name')}</strong>
                </div>
              </div>

              <ul className="pd-supplier-meta">
                <li>
                  <span className="pd-flag-de" aria-hidden="true" />
                  {t('productDetail.supplier.location')}
                </li>
                <li>
                  <i className="bi bi-patch-check-fill" aria-hidden="true" />
                  {t('productDetail.supplier.verified')}
                </li>
                <li>
                  <i className="bi bi-globe2" aria-hidden="true" />
                  {t('productDetail.supplier.shipping')}
                </li>
              </ul>

              <button type="button" className="btn pd-send-inquiry-btn">
                {t('productDetail.supplier.sendInquiry')}
              </button>

              <button type="button" className="pd-seller-profile-link">
                {t('productDetail.supplier.profile')}
              </button>
            </aside>

            <button type="button" className="pd-save-btn" onClick={() => setSaved((current) => !current)}>
              <i className={`bi ${saved ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
              {t('productDetail.supplier.saveForLater')}
            </button>
          </div>
        </section>

        <section className="pd-body">
          <div className="pd-body-main">
            <div className="pd-tabs">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.key}
                  className={`pd-tab ${activeTab === tab.key ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pd-description">
              <div className={`pd-description-block ${descExpanded ? 'is-expanded' : ''}`}>
                <p className="pd-description-preview">{descriptionParagraphs.join(' ')}</p>
                <div className="pd-description-full">
                  {descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="pd-description-toggle"
                onClick={() => setDescExpanded((current) => !current)}
              >
                {descExpanded ? t('productDetail.readLess') : t('productDetail.readMore')}
              </button>

              <dl className="pd-specs">
                {specs.map((spec) => (
                  <div className="pd-specs-row" key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="pd-features">
                {features.map((feature, index) => (
                  <li key={`${feature}-${index}`}>
                    <i className="bi bi-check2" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="pd-sidebar">
            <h4 className="pd-sidebar-title">{t('productDetail.youMayLike.title')}</h4>
            <ul className="pd-sidebar-list">
              {youMayLikeItems.map((item, index) => (
                <li key={item.title}>
                  <button
                    type="button"
                    className={`pd-sidebar-item ${selectedLikeIndex === index ? 'is-selected' : ''}`}
                    onClick={() => setSelectedLikeIndex((current) => (current === index ? null : index))}
                  >
                    <img src={YOU_MAY_LIKE_IMAGES[index]} alt={item.title} />
                    <div>
                      <span className="pd-sidebar-item-title">{item.title}</span>
                      <span className="pd-sidebar-item-price">{item.priceRange}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="pd-related">
          <h3 className="store-section-title">{t('productDetail.relatedProducts.title')}</h3>
          <div className="pd-related-grid">
            {RELATED_PRODUCT_IMAGES.map((img, index) => (
              <button
                type="button"
                className={`pd-related-card ${selectedRelatedIndex === index ? 'is-selected' : ''}`}
                key={img}
                onClick={() => setSelectedRelatedIndex((current) => (current === index ? null : index))}
              >
                <img src={img} alt={t('productDetail.relatedProducts.name')} />
                <span className="pd-related-name">{t('productDetail.relatedProducts.name')}</span>
                <span className="pd-related-price">{t('productDetail.relatedProducts.priceRange')}</span>
              </button>
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

      {lightboxOpen && (
        <div
          className="pd-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="pd-lightbox-close"
            aria-label={t('productDetail.closeZoom')}
            onClick={() => setLightboxOpen(false)}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
          <img
            src={GALLERY_IMAGES[activeImage]}
            alt={t('productDetail.title')}
            className="pd-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default ProductDetail
