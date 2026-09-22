import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { login } from '../../api/auth'
import storefrontImage from '../../assets/images/login-storefront.png'
import './Login.css'

function Login({ onSubmit, onClose }) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const otherLanguage = i18n.language === 'ar' ? 'en' : 'ar'

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!phone.trim() || loading) return
    setLoading(true)
    try {
      await login(phone.trim())
    } catch (err) {
      console.error(err)
      // Don't block navigation here: the fixed demo code on the next screen
      // can still complete sign-in even when this phone isn't backend-registered.
    } finally {
      setLoading(false)
    }
    onSubmit?.(phone.trim())
  }

  return (
    <div className="login-page d-flex flex-row">
      <div className="login-toolbar">
        {onClose && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary login-toolbar-btn"
            aria-label={t('common.close')}
            onClick={onClose}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary login-toolbar-btn"
          onClick={() => i18n.changeLanguage(otherLanguage)}
        >
          {t('common.language')}
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary login-toolbar-btn"
          aria-label={t('common.toggleTheme')}
          onClick={toggleTheme}
        >
          <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}`} />
        </button>
      </div>

      <div
        className="login-hero"
        style={{ backgroundImage: `url(${storefrontImage})` }}
      >
        <div className="login-hero-content">
          <div className="login-brand">
            <i className="bi bi-bag brand-icon" aria-hidden="true" />
            <div>
              <span className="brand-name">{t('login.brand')}</span>
              <span className="brand-subtitle">{t('login.brandSubtitle')}</span>
            </div>
          </div>
          <h1 className="hero-title">{t('login.heroTitle')}</h1>
          <p className="hero-text">{t('login.heroText')}</p>
        </div>
      </div>

      <div className="login-form-panel d-flex align-items-center justify-content-center">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="welcome-title">{t('login.welcome')}</h2>
          <p className="welcome-subtitle">{t('login.subtitle')}</p>

          <div className="input-group login-input-group">
            <input
              type="tel"
              className="form-control"
              placeholder={t('login.phonePlaceholder')}
              aria-label={t('login.phonePlaceholder')}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <span className="input-group-text">
              <i className="bi bi-telephone" aria-hidden="true" />
            </span>
          </div>

          <button type="submit" className="btn login-submit-btn w-100" disabled={loading}>
            {loading ? t('login.sending') : t('login.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
