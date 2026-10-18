import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import ShoppingBag from '../ShoppingBag/ShoppingBag'
import borcelleLogo from '../../assets/images/borcelle-logo.png'
import '../../pages/Login/Login.css'
import './StoreNavbar.css'

function StoreNavbar({
  onBrandClick,
  onProfileClick,
  onMessageClick,
  onOrdersClick,
  onCartClick,
  onMenuClick,
  onBack,
  mobileTitle,
  hideSearch,
}) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [bagOpen, setBagOpen] = useState(false)

  const otherLanguage = i18n.language === 'ar' ? 'en' : 'ar'

  return (
    <>
      <header className={`store-navbar ${onBack ? 'has-back' : ''}`}>
        {onBack ? (
          <button type="button" className="store-mobile-back" onClick={onBack} aria-label={t('common.back')}>
            <i className="bi bi-arrow-left" aria-hidden="true" />
          </button>
        ) : (
          <button type="button" className="store-mobile-menu-btn" onClick={onMenuClick} aria-label={t('common.menu')}>
            <i className="bi bi-list" aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          className="store-brand"
          onClick={onBrandClick}
          disabled={!onBrandClick}
        >
          <img src={borcelleLogo} alt={t('login.brand')} className="store-brand-logo" />
        </button>

        {mobileTitle && <span className="store-mobile-title">{mobileTitle}</span>}

        {!hideSearch && (
          <div className="input-group store-search">
            <input
              type="search"
              className="form-control"
              placeholder={t('payment.searchPlaceholder')}
              aria-label={t('payment.searchPlaceholder')}
            />
            <select
              className="form-select store-category-select"
              aria-label={t('payment.allCategory')}
              defaultValue=""
            >
              <option value="">{t('payment.allCategory')}</option>
            </select>
            <button type="button" className="btn store-search-btn">
              {t('payment.search')}
            </button>
          </div>
        )}

        <nav className="store-nav-icons">
          <button type="button" className="store-nav-link" onClick={onProfileClick}>
            <i className="bi bi-person" aria-hidden="true" />
            <span>{t('payment.profile')}</span>
          </button>
          <button type="button" className="store-nav-link store-nav-link-secondary" onClick={onMessageClick}>
            <i className="bi bi-chat" aria-hidden="true" />
            <span>{t('payment.message')}</span>
          </button>
          <button type="button" className="store-nav-link store-nav-link-secondary" onClick={onOrdersClick}>
            <i className="bi bi-heart" aria-hidden="true" />
            <span>{t('payment.orders')}</span>
          </button>
          <button
            type="button"
            className="store-nav-link"
            onClick={onCartClick ? () => setBagOpen(true) : undefined}
          >
            <i className="bi bi-cart3" aria-hidden="true" />
            <span>{t('payment.cart')}</span>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary login-toolbar-btn store-desktop-only"
            onClick={() => i18n.changeLanguage(otherLanguage)}
          >
            {t('common.language')}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary login-toolbar-btn store-theme-toggle"
            aria-label={t('common.toggleTheme')}
            onClick={toggleTheme}
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}`} />
          </button>
        </nav>
      </header>

      {bagOpen && <ShoppingBag onClose={() => setBagOpen(false)} onCheckout={onCartClick} />}
    </>
  )
}

export default StoreNavbar
