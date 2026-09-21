import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import avatarImage from '../../assets/images/avatar-alexa.png'
import './Account.css'

const SETTINGS_LINKS = [
  'wishlist',
  'aboutUs',
  'contactUs',
  'faq',
  'termsAndCondition',
  'privacyPolicy',
]

function Account({ onBrandClick, onCartClick, onBack, onTermsClick, onContactUsClick }) {
  const { t } = useTranslation()
  const [fullName, setFullName] = useState('')
  const [nickName, setNickName] = useState('')

  const settingsHandlers = {
    termsAndCondition: onTermsClick,
    contactUs: onContactUsClick,
  }

  return (
    <div className="account-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onCartClick={onCartClick}
        onBack={onBack}
        mobileTitle={t('account.settingsTitle')}
      />

      <div className="account-cover" />

      <div className="account-content">
        <div className="account-identity">
          <img src={avatarImage} alt="Alexa Rawles" className="account-avatar" />
          <div>
            <span className="account-name">Alexa Rawles</span>
            <span className="account-email">alexarawles@gmail.com</span>
          </div>
        </div>

        <div className="account-form">
          <div className="account-field">
            <label htmlFor="account-full-name">{t('account.fullName')}</label>
            <input
              id="account-full-name"
              type="text"
              className="form-control"
              placeholder={t('account.fullNamePlaceholder')}
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
          <div className="account-field">
            <label htmlFor="account-nick-name">{t('account.nickName')}</label>
            <input
              id="account-nick-name"
              type="text"
              className="form-control"
              placeholder={t('account.nickNamePlaceholder')}
              value={nickName}
              onChange={(event) => setNickName(event.target.value)}
            />
          </div>
        </div>

        <h3 className="account-settings-title">{t('account.settingsTitle')}</h3>

        <div className="account-settings-grid">
          {SETTINGS_LINKS.map((key) => (
            <button
              type="button"
              className="account-settings-link"
              key={key}
              onClick={settingsHandlers[key]}
            >
              <span>{t(`account.${key}`)}</span>
              <i className="bi bi-chevron-right" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Account
