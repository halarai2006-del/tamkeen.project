import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { verify } from '../../api/auth'
import { addToCart } from '../../api/cart'
import { getLocalCart, clearLocalCart } from '../../cart/localCart'
import { isDemoOtp } from '../../utils/demoMode'
import storefrontImage from '../../assets/images/login-storefront.png'
import '../Login/Login.css'
import './Verify.css'

const CODE_LENGTH = 5
const RESEND_SECONDS = 55

async function syncLocalCartToServer() {
  const items = getLocalCart()
  for (const item of items) {
    await addToCart(item.productId, item.quantity)
  }
  clearLocalCart()
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function Verify({ phone, onBack, onResend, onSubmit }) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { refreshUser } = useAuth()
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  const otherLanguage = i18n.language === 'ar' ? 'en' : 'ar'

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => {
      setSecondsLeft((current) => current - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const handleDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    setCode((current) => {
      const next = [...current]
      next[index] = digit
      return next
    })
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = async () => {
    if (secondsLeft > 0 || resending) return
    setError('')
    setResending(true)
    try {
      await onResend?.()
      setCode(Array(CODE_LENGTH).fill(''))
      setSecondsLeft(RESEND_SECONDS)
      inputRefs.current[0]?.focus()
    } catch (err) {
      console.error(err)
      setError(t('login.sendError'))
    } finally {
      setResending(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return
    const otp = code.join('')

    if (!phone && !isDemoOtp(otp)) {
      setError(t('verify.missingSession'))
      return
    }

    setError('')
    setLoading(true)
    try {
      await verify(phone, otp)
    } catch (err) {
      console.error(err)
      setError(t('verify.invalidCode'))
      setLoading(false)
      return
    }

    try {
      await refreshUser()
    } catch (err) {
      console.error(err)
    }
    try {
      await syncLocalCartToServer()
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
    onSubmit?.()
  }

  return (
    <div className="login-page d-flex flex-row">
      <div className="login-toolbar">
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
          <h2 className="welcome-title">{t('verify.title')}</h2>
          <p className="welcome-subtitle">
            {t('verify.subtitle')} <span className="verify-phone">{phone || '0923423414'}</span>
          </p>

          <div className="otp-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-box"
                placeholder="-"
                value={digit}
                onChange={(event) => handleDigitChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                aria-label={`${t('verify.title')} ${index + 1}`}
              />
            ))}
          </div>

          <div className="verify-timer-row">
            <span className="verify-timer-label">{t('verify.resendLabel')}</span>
            <span className="verify-timer">{formatTime(secondsLeft)}</span>
          </div>

          <button
            type="button"
            className="verify-resend-btn"
            disabled={secondsLeft > 0 || resending}
            onClick={handleResend}
          >
            {resending ? t('verify.resending') : t('verify.resendCode')}
          </button>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn login-submit-btn w-100" disabled={loading}>
            {loading ? t('verify.verifying') : t('verify.submit')}
          </button>

          <div className="verify-divider">
            <span>{t('verify.or')}</span>
          </div>

          <button
            type="button"
            className="btn verify-back-btn w-100"
            onClick={onBack}
          >
            {t('verify.goBack')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Verify
