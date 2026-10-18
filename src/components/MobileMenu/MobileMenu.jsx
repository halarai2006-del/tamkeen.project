import { useTranslation } from 'react-i18next'
import './MobileMenu.css'

const PRIMARY_LINKS = [
  { key: 'home', icon: 'bi-house' },
  { key: 'categories', icon: 'bi-grid' },
  { key: 'favorites', icon: 'bi-heart' },
  { key: 'myOrders', icon: 'bi-bag-check' },
]

const SECONDARY_LINKS = [
  { key: 'languageCurrency', icon: 'bi-globe2' },
  { key: 'contactUs', icon: 'bi-headset' },
  { key: 'about', icon: 'bi-info-circle' },
]

const PLAIN_LINKS = ['userAgreement', 'partnership', 'privacyPolicy']

function MobileMenu({ onClose, onHomeClick, onCategoriesClick, onContactUsClick }) {
  const { t, i18n } = useTranslation()

  const otherLanguage = i18n.language === 'ar' ? 'en' : 'ar'

  const handlers = {
    home: onHomeClick,
    categories: onCategoriesClick,
    contactUs: onContactUsClick,
    languageCurrency: () => {
      i18n.changeLanguage(otherLanguage)
      onClose()
    },
  }

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <aside className="mobile-menu-panel" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="mobile-menu-close" aria-label={t('cart.close')} onClick={onClose}>
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>

        <div className="mobile-menu-header">
          <span className="mobile-menu-avatar">
            <i className="bi bi-person" aria-hidden="true" />
          </span>
          <span className="mobile-menu-signin">{t('mobileMenu.signInRegister')}</span>
        </div>

        <ul className="mobile-menu-list">
          {PRIMARY_LINKS.map((link) => (
            <li key={link.key}>
              <button type="button" onClick={handlers[link.key]}>
                <i className={`bi ${link.icon}`} aria-hidden="true" />
                {t(`mobileMenu.${link.key}`)}
              </button>
            </li>
          ))}
        </ul>

        <ul className="mobile-menu-list">
          {SECONDARY_LINKS.map((link) => (
            <li key={link.key}>
              <button type="button" onClick={handlers[link.key]}>
                <i className={`bi ${link.icon}`} aria-hidden="true" />
                {t(`mobileMenu.${link.key}`)}
              </button>
            </li>
          ))}
        </ul>

        <ul className="mobile-menu-list mobile-menu-list-plain">
          {PLAIN_LINKS.map((key) => (
            <li key={key}>
              <button type="button">{t(`mobileMenu.${key}`)}</button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default MobileMenu
