import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContentPage from '../../components/ContentPage/ContentPage'
import { getSetting, SETTING_KEYS } from '../../api/settings'

function Terms({ onBack, onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick }) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [termsText, setTermsText] = useState('')

  useEffect(() => {
    let active = true
    getSetting(SETTING_KEYS.termsAndConditions)
      .then((setting) => {
        if (active) setTermsText(setting?.value?.trim() ?? '')
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const sections = termsText
    ? [{ heading: t('terms.termsHeading'), body: termsText }]
    : t('terms.sections', { returnObjects: true })

  return (
    <ContentPage
      title={t('terms.title')}
      backLabel={t('terms.back')}
      sections={sections}
      onBack={onBack}
      onBrandClick={onBrandClick}
      onProfileClick={onProfileClick}
      onMessageClick={onMessageClick}
      onOrdersClick={onOrdersClick}
      onCartClick={onCartClick}
    >
      {loading ? <p className="content-page-text">{t('terms.loading')}</p> : undefined}
    </ContentPage>
  )
}

export default Terms
