import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContentPage from '../../components/ContentPage/ContentPage'
import { sendContactMessage } from '../../api/contact'
import './ContactUs.css'

function ContactUs({ onBack, onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus(null)
    try {
      await sendContactMessage({ email: email.trim(), message: message.trim() })
      setEmail('')
      setMessage('')
      setStatus({ type: 'success', text: t('contactUs.sent') })
    } catch (error) {
      setStatus({ type: 'error', text: error.message || t('contactUs.sendError') })
    } finally {
      setSending(false)
    }
  }

  return (
    <ContentPage
      title={t('contactUs.title')}
      backLabel={t('contactUs.back')}
      onBack={onBack}
      onBrandClick={onBrandClick}
      onProfileClick={onProfileClick}
      onMessageClick={onMessageClick}
      onOrdersClick={onOrdersClick}
      onCartClick={onCartClick}
    >
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group login-input-group">
          <input
            type="email"
            className="form-control"
            placeholder={t('contactUs.emailPlaceholder')}
            aria-label={t('contactUs.emailPlaceholder')}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <span className="input-group-text">
            <i className="bi bi-envelope" aria-hidden="true" />
          </span>
        </div>

        <div className="input-group login-input-group contact-message-group">
          <textarea
            className="form-control"
            placeholder={t('contactUs.messagePlaceholder')}
            aria-label={t('contactUs.messagePlaceholder')}
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={65000}
            required
          />
          <span className="input-group-text">
            <i className="bi bi-chat-left-text" aria-hidden="true" />
          </span>
        </div>

        {status && (
          <p className={`contact-status contact-status-${status.type}`} role="status">
            {status.text}
          </p>
        )}

        <button type="submit" className="btn login-submit-btn w-100" disabled={sending}>
          {sending ? t('contactUs.sending') : t('contactUs.send')}
        </button>
      </form>
    </ContentPage>
  )
}

export default ContactUs
