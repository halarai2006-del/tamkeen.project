import { useTranslation } from 'react-i18next'
import ContentPage from '../../components/ContentPage/ContentPage'

function Terms({ onBack, onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick }) {
  const { t } = useTranslation()
  const sections = t('terms.sections', { returnObjects: true })

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
    />
  )
}

export default Terms
