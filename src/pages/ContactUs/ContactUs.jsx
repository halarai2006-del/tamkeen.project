import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContentPage from '../../components/ContentPage/ContentPage'
import './ContactUs.css'

function ContactUs({ onBack, onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick }) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
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
            type="text"
            className="form-control"
            placeholder={t('contactUs.namePlaceholder')}
            aria-label={t('contactUs.namePlaceholder')}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <span className="input-group-text">
            <i className="bi bi-person" aria-hidden="true" />
          </span>
        </div>

        <div className="input-group login-input-group">
          <input
            type="email"
            className="form-control"
            placeholder={t('contactUs.emailPlaceholder')}
            aria-label={t('contactUs.emailPlaceholder')}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
          />
          <span className="input-group-text">
            <i className="bi bi-chat-left-text" aria-hidden="true" />
          </span>
        </div>

        <button type="submit" className="btn login-submit-btn w-100">
          {t('contactUs.send')}
        </button>
      </form>
    </ContentPage>
  )
}

export default ContactUs
