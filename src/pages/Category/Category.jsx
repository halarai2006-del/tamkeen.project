import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import borcelleLogo from '../../assets/images/borcelle-logo.png'
import flagUk from '../../assets/images/icon.png'
import '../Store/Store.css'
import './Category.css'

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

function Category({ onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick }) {
  const { t } = useTranslation()
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const breadcrumb = t('category.breadcrumb', { returnObjects: true })

  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="category-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onProfileClick={onProfileClick}
        onMessageClick={onMessageClick}
        onOrdersClick={onOrdersClick}
        onCartClick={onCartClick}
        onBack={onBrandClick}
        mobileTitle={t('category.allCategories')}
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

      <main className="category-main">
        <h1 className="category-title">{t('category.allCategories')}</h1>
      </main>

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
    </div>
  )
}

export default Category
