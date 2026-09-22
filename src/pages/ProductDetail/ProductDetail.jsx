import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import { getProduct } from '../../api/products'
import { addItem } from '../../cart/cartService'
import { useAuth } from '../../context/AuthContext'
import borcelleLogo from '../../assets/images/borcelle-logo.png'
import flagUk from '../../assets/images/icon.png'
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

const YOU_MAY_LIKE_IMAGES = [blazerImage, poloContrastImage, smartwatchImage, backpackImage, denimShortsImage]

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

function ProductDetail({ onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick }) {
  const { t } = useTranslation()
  const { id } = useParams()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [saved, setSaved] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedLikeIndex, setSelectedLikeIndex] = useState(null)
  const [selectedRelatedIndex, setSelectedRelatedIndex] = useState(null)
  const [addingToCart, setAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const youMayLikeItems = t('productDetail.youMayLike.items', { returnObjects: true })

  const tabs = [
    { key: 'description', label: t('productDetail.tabs.description') },
    { key: 'reviews', label: t('productDetail.tabs.reviews') },
    { key: 'shipping', label: t('productDetail.tabs.shipping') },
    { key: 'aboutSeller', label: t('productDetail.tabs.aboutSeller') },
  ]

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    setActiveImage(0)
    setAddedToCart(false)

    getProduct(id)
      .then((result) => {
        if (!cancelled) setProduct(result)
      })
      .catch(() => {
        if (!cancelled) setError(t('productDetail.loadError'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, t])

  const galleryImages = product ? [product.image, ...(product.images ?? [])].filter(Boolean) : []

  const handleAddToCart = async () => {
    if (!product || addingToCart) return
    setAddingToCart(true)
    try {
      await addItem(user, product, 1)
      setAddedToCart(true)
    } catch {
      setError(t('productDetail.addToCartError'))
    } finally {
      setAddingToCart(false)
    }
  }

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

      {loading && <p className="store-products-status">{t('store.loading')}</p>}
      {!loading && error && <p className="store-products-status store-products-error">{error}</p>}

      {!loading && product && (
        <main className="pd-main">
          <section className="pd-top">
            <div className="pd-gallery">
              <button
                type="button"
                className="pd-gallery-main"
                onClick={() => setLightboxOpen(true)}
                aria-label={t('productDetail.zoomImage')}
              >
                <img src={galleryImages[activeImage]} alt={product.name} />
              </button>
              {galleryImages.length > 1 && (
                <div className="pd-gallery-thumbs">
                  {galleryImages.map((img, index) => (
                    <button
                      type="button"
                      key={img}
                      className={`pd-gallery-thumb ${index === activeImage ? 'is-active' : ''}`}
                      onClick={() => setActiveImage(index)}
                      aria-label={`${product.name} ${index + 1}`}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pd-info">
              <h1 className="pd-title">{product.name}</h1>

              {product.category?.name && (
                <span className="pd-rating-row">{product.category.name}</span>
              )}

              <div className="pd-price-tiers">
                <div className="pd-price-tier is-highlight">
                  <span className="pd-price-tier-price">${Number(product.price).toFixed(2)}</span>
                </div>
              </div>

              {product.description && <p className="pd-description-preview">{product.description}</p>}
            </div>

            <div className="pd-buybox-wrap">
              <aside className="pd-buybox">
                <button
                  type="button"
                  className="btn pd-send-inquiry-btn"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  {addingToCart
                    ? t('productDetail.addingToCart')
                    : addedToCart
                      ? t('productDetail.addedToCart')
                      : t('productDetail.addToCart')}
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
                {activeTab === 'description' && (
                  <p className="pd-description-full">{product.description || t('productDetail.noDescription')}</p>
                )}
                {activeTab !== 'description' && (
                  <p className="pd-description-full">{t(`productDetail.tabPlaceholders.${activeTab}`)}</p>
                )}
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
      )}

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

      {lightboxOpen && product && (
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
            src={galleryImages[activeImage]}
            alt={product.name}
            className="pd-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default ProductDetail
