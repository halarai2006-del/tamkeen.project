import StoreNavbar from '../StoreNavbar/StoreNavbar'
import './ContentPage.css'

function ContentPage({
  title,
  backLabel,
  sections,
  onBack,
  onBrandClick,
  onProfileClick,
  onMessageClick,
  onOrdersClick,
  onCartClick,
  children,
}) {
  return (
    <div className="content-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onProfileClick={onProfileClick}
        onMessageClick={onMessageClick}
        onOrdersClick={onOrdersClick}
        onCartClick={onCartClick}
      />

      <div className="content-page-header">
        <button
          type="button"
          className="content-page-back"
          onClick={onBack}
          aria-label={backLabel}
        >
          <i className="bi bi-chevron-left" aria-hidden="true" />
        </button>
        <span className="content-page-title">{title}</span>
      </div>

      <div className="content-page-body">
        {children ??
          sections.map((section, index) => (
            <section className="content-page-section" key={index}>
              <h3 className="content-page-heading">{section.heading}</h3>
              <p className="content-page-text">{section.body}</p>
            </section>
          ))}
      </div>
    </div>
  )
}

export default ContentPage
