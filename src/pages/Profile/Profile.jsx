import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { updateProfile } from '../../api/profile'
import storefrontImage from '../../assets/images/login-storefront.png'
import '../Login/Login.css'
import './Profile.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Profile({ onSubmit, onBack }) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [photoUrl, setPhotoUrl] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const otherLanguage = i18n.language === 'ar' ? 'en' : 'ar'

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (saving) return

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPhone = phone.trim()

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      setError(t('profile.requiredFields'))
      return
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError(t('profile.invalidEmail'))
      return
    }

    setError('')
    setSaving(true)
    try {
      await updateProfile({ name: trimmedName, email: trimmedEmail, phone: trimmedPhone, imageFile: photoFile })
      onSubmit?.({ name: trimmedName, email: trimmedEmail, phone: trimmedPhone })
    } catch (err) {
      console.error(err)
      setError(t('profile.saveError'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="login-page d-flex flex-row">
      <div className="login-toolbar">
        {onBack && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary login-toolbar-btn"
            aria-label={t('common.back')}
            onClick={onBack}
          >
            <i className="bi bi-arrow-left" aria-hidden="true" />
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
        <form className="login-form profile-form" onSubmit={handleSubmit}>
          <div className="profile-header">
            <div className="profile-title-block">
              <h2 className="welcome-title">{t('profile.title')}</h2>
              <p className="welcome-subtitle">{t('profile.subtitle')}</p>
            </div>

            <div className="profile-photo-picker">
              <button
                type="button"
                className="profile-photo-btn"
                onClick={() => fileInputRef.current?.click()}
                aria-label={t('profile.addPhoto')}
              >
                {photoUrl ? (
                  <img src={photoUrl} alt="" className="profile-photo-preview" />
                ) : (
                  <i className="bi bi-camera" aria-hidden="true" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={handlePhotoChange}
              />
              <span className="profile-photo-label">{t('profile.addPhoto')}</span>
            </div>
          </div>

          <div className="input-group login-input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t('profile.namePlaceholder')}
              aria-label={t('profile.namePlaceholder')}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <span className="input-group-text">
              <i className="bi bi-person" aria-hidden="true" />
            </span>
          </div>

          <div className="input-group login-input-group">
            <input
              type="email"
              className="form-control"
              placeholder={t('profile.emailPlaceholder')}
              aria-label={t('profile.emailPlaceholder')}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <span className="input-group-text">
              <i className="bi bi-envelope" aria-hidden="true" />
            </span>
          </div>

          <div className="input-group login-input-group">
            <input
              type="tel"
              className="form-control"
              placeholder={t('profile.phonePlaceholder')}
              aria-label={t('profile.phonePlaceholder')}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
            <span className="input-group-text">
              <i className="bi bi-telephone" aria-hidden="true" />
            </span>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn login-submit-btn w-100" disabled={saving}>
            {saving ? t('profile.saving') : t('profile.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
