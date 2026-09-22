import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar'
import { getCategories } from '../../api/categories'
import { getProducts } from '../../api/products'
import { PLACEHOLDER_IMAGE } from '../../utils/placeholderImage'
import borcelleLogo from '../../assets/images/borcelle-logo.png'
import flagUk from '../../assets/images/icon.png'
import '../Store/Store.css'
import './Category.css'

const SORT_TO_API = {
  featured: {},
  priceLowHigh: { orderBy: 'price', order: 'asc' },
  priceHighLow: { orderBy: 'price', order: 'desc' },
  newest: { orderBy: 'created_at', order: 'desc' },
  topRated: { orderBy: 'most_purchased', order: 'desc' },
}

const SOCIAL_LINKS = [
  { icon: 'bi-facebook', label: 'Facebook' },
  { icon: 'bi-twitter-x', label: 'Twitter' },
  { icon: 'bi-linkedin', label: 'LinkedIn' },
  { icon: 'bi-instagram', label: 'Instagram' },
  { icon: 'bi-youtube', label: 'YouTube' },
]

const FOOTER_COLUMNS = [
  {
    titleKey: 'store.footer.about.title',
    itemKeys: [
      'store.footer.about.aboutUs',
      'store.footer.about.findStore',
      'store.footer.about.categories',
      'store.footer.about.blogs',
    ],
  },
  {
    titleKey: 'store.footer.partnership.title',
    itemKeys: [
      'store.footer.partnership.aboutUs',
      'store.footer.partnership.findStore',
      'store.footer.partnership.categories',
      'store.footer.partnership.blogs',
    ],
  },
  {
    titleKey: 'store.footer.information.title',
    itemKeys: [
      'store.footer.information.helpCenter',
      'store.footer.information.moneyRefund',
      'store.footer.information.shipping',
      'store.footer.information.contactUs',
    ],
  },
  {
    titleKey: 'store.footer.forUsers.title',
    itemKeys: [
      'store.footer.forUsers.login',
      'store.footer.forUsers.register',
      'store.footer.forUsers.settings',
      'store.footer.forUsers.myOrders',
    ],
  },
]

const RATING_TIERS = [5, 4, 3, 2]
const PAGE_SIZES = [10, 20, 50]

function RatingStars({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i += 1) {
    let icon = 'bi-star'
    if (rating >= i) icon = 'bi-star-fill'
    else if (rating >= i - 0.5) icon = 'bi-star-half'
    stars.push(<i key={i} className={`bi ${icon}`} aria-hidden="true" />)
  }
  return <span className="category-rating-stars">{stars}</span>
}

function FilterSection({ title, seeAllLabel, children }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="category-filter-section">
      <div className="category-filter-header">
        <h4>{title}</h4>
        <button
          type="button"
          className="category-filter-toggle"
          onClick={() => setOpen((current) => !current)}
          aria-label={title}
          aria-expanded={open}
        >
          <i className={`bi bi-chevron-${open ? 'up' : 'down'}`} aria-hidden="true" />
        </button>
      </div>
      {open && (
        <div className="category-filter-body">
          {children}
          {seeAllLabel && (
            <button type="button" className="category-filter-seeall">
              {seeAllLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function Category({ onBrandClick, onProfileClick, onMessageClick, onOrdersClick, onCartClick, onProductClick }) {
  const { t } = useTranslation()
  const [apiCategories, setApiCategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [condition, setCondition] = useState(0)
  const [selectedRatings, setSelectedRatings] = useState([])
  const [selectedManufacturers, setSelectedManufacturers] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(true)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('list')
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [savedItems, setSavedItems] = useState([])
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [selectedProductIndex, setSelectedProductIndex] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const breadcrumb = t('category.breadcrumb', { returnObjects: true })
  const brands = t('category.filters.brands.items', { returnObjects: true })
  const features = t('category.filters.features.items', { returnObjects: true })
  const conditions = t('category.filters.condition.items', { returnObjects: true })
  const manufacturers = t('category.filters.manufacturer.items', { returnObjects: true })

  useEffect(() => {
    getCategories()
      .then(setApiCategories)
      .catch(() => {})
  }, [])

  useEffect(() => {
    let cancelled = false
    setProductsLoading(true)
    setProductsError('')
    getProducts({
      categoryId: activeCategoryId,
      priceFrom: minPrice,
      priceTo: maxPrice,
      ...SORT_TO_API[sortBy],
    })
      .then((result) => {
        if (!cancelled) setProducts(result)
      })
      .catch(() => {
        if (!cancelled) setProductsError(t('store.loadError'))
      })
      .finally(() => {
        if (!cancelled) setProductsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [activeCategoryId, minPrice, maxPrice, sortBy, t])

  const activeCategoryName =
    apiCategories.find((category) => category.id === activeCategoryId)?.name ??
    t('category.allCategories')

  const toggleValue = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  }

  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedFeatures([])
    setSelectedManufacturers([])
    setSelectedRatings([])
    setCondition(0)
  }

  const activeFilters = [
    ...selectedBrands.map((value) => ({
      key: `brand-${value}`,
      label: value,
      onRemove: () => toggleValue(selectedBrands, setSelectedBrands, value),
    })),
    ...selectedFeatures.map((value) => ({
      key: `feature-${value}`,
      label: value,
      onRemove: () => toggleValue(selectedFeatures, setSelectedFeatures, value),
    })),
    ...selectedManufacturers.map((value) => ({
      key: `manufacturer-${value}`,
      label: value,
      onRemove: () => toggleValue(selectedManufacturers, setSelectedManufacturers, value),
    })),
    ...selectedRatings.map((tier) => ({
      key: `rating-${tier}`,
      label: `${tier} ${t('category.filters.ratings.chipUnit')}`,
      onRemove: () => toggleValue(selectedRatings, setSelectedRatings, tier),
    })),
    ...(condition !== 0
      ? [{ key: `condition-${condition}`, label: conditions[condition], onRemove: () => setCondition(0) }]
      : []),
  ]

  return (
    <div className="category-page">
      <StoreNavbar
        onBrandClick={onBrandClick}
        onProfileClick={onProfileClick}
        onMessageClick={onMessageClick}
        onOrdersClick={onOrdersClick}
        onCartClick={onCartClick}
        onBack={onBrandClick}
        mobileTitle={activeCategoryName}
      />

      <nav className="store-subnav">
        <button type="button" className="store-subnav-link store-subnav-menu is-active">
          <i className="bi bi-list" aria-hidden="true" />
          {t('store.menu')}
        </button>
        <button type="button" className="store-subnav-link">
          {t('store.hotOffers')}
        </button>
        <button type="button" className="store-subnav-link">
          {t('store.giftBoxes')}
        </button>
        <button type="button" className="store-subnav-link">
          {t('store.aboutUs')}
        </button>
        <button type="button" className="store-subnav-link store-subnav-help">
          {t('store.help')}
          <i className="bi bi-chevron-down" aria-hidden="true" />
        </button>
      </nav>

      <nav className="category-breadcrumb" aria-label="breadcrumb">
        {breadcrumb.map((crumb, index) => (
          <span key={crumb} className="category-breadcrumb-item">
            {index > 0 && <i className="bi bi-chevron-right category-breadcrumb-sep" aria-hidden="true" />}
            {crumb}
          </span>
        ))}
      </nav>

      {filtersOpen && <div className="category-filters-backdrop" onClick={() => setFiltersOpen(false)} />}

      <div className="category-layout">
        <aside className={`category-sidebar ${filtersOpen ? 'is-open' : ''}`}>
          <div className="category-sidebar-mobile-header">
            <span>{t('category.filters.category.title')}</span>
            <button
              type="button"
              className="category-filters-close"
              aria-label={t('common.close')}
              onClick={() => setFiltersOpen(false)}
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>

          <FilterSection title={t('category.filters.category.title')} seeAllLabel={t('category.filters.category.seeAll')}>
            <ul className="category-list-plain">
              <li>
                <button
                  type="button"
                  className={`category-filter-list-item ${activeCategoryId === null ? 'is-active' : ''}`}
                  onClick={() => setActiveCategoryId(null)}
                >
                  {t('category.allCategories')}
                </button>
              </li>
              {apiCategories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className={`category-filter-list-item ${activeCategoryId === category.id ? 'is-active' : ''}`}
                    onClick={() => setActiveCategoryId(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </FilterSection>

          <FilterSection title={t('category.filters.brands.title')} seeAllLabel={t('category.filters.brands.seeAll')}>
            {brands.map((brand) => (
              <label className="category-checkbox-row" key={brand}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleValue(selectedBrands, setSelectedBrands, brand)}
                />
                {brand}
              </label>
            ))}
          </FilterSection>

          <FilterSection title={t('category.filters.features.title')} seeAllLabel={t('category.filters.features.seeAll')}>
            {features.map((feature) => (
              <label className="category-checkbox-row" key={feature}>
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => toggleValue(selectedFeatures, setSelectedFeatures, feature)}
                />
                {feature}
              </label>
            ))}
          </FilterSection>

          <FilterSection title={t('category.filters.priceRange.title')}>
            <div className="category-price-track">
              <span className="category-price-range" />
            </div>
            <div className="category-price-inputs">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder={t('category.filters.priceRange.min')}
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder={t('category.filters.priceRange.max')}
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </div>
            <button type="button" className="category-filter-seeall">
              {t('category.filters.priceRange.apply')}
            </button>
          </FilterSection>

          <FilterSection title={t('category.filters.condition.title')}>
            {conditions.map((item, index) => (
              <label className="category-radio-row" key={item}>
                <input
                  type="radio"
                  name="condition"
                  checked={condition === index}
                  onChange={() => setCondition(index)}
                />
                {item}
              </label>
            ))}
          </FilterSection>

          <FilterSection title={t('category.filters.ratings.title')}>
            {RATING_TIERS.map((tier) => (
              <label className="category-checkbox-row category-rating-row" key={tier}>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(tier)}
                  onChange={() => toggleValue(selectedRatings, setSelectedRatings, tier)}
                />
                <RatingStars rating={tier} />
                <span className="category-rating-suffix">{t('category.filters.ratings.andUp')}</span>
              </label>
            ))}
          </FilterSection>

          <FilterSection
            title={t('category.filters.manufacturer.title')}
            seeAllLabel={t('category.filters.manufacturer.seeAll')}
          >
            {manufacturers.map((manufacturer) => (
              <label className="category-checkbox-row" key={manufacturer}>
                <input
                  type="checkbox"
                  checked={selectedManufacturers.includes(manufacturer)}
                  onChange={() => toggleValue(selectedManufacturers, setSelectedManufacturers, manufacturer)}
                />
                {manufacturer}
              </label>
            ))}
          </FilterSection>
        </aside>

        <main className="category-main">
          <div className="category-list-header">
            <span className="category-list-count">
              {t('category.itemsCount', { count: products.length, category: activeCategoryName })}
            </span>

            <div className="category-list-controls">
              <button
                type="button"
                className="category-filters-toggle"
                onClick={() => setFiltersOpen(true)}
              >
                <i className="bi bi-sliders" aria-hidden="true" />
                {t('category.filters.title')}
              </button>

              <label className="category-verified-check">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={() => setVerifiedOnly((current) => !current)}
                />
                {t('category.verifiedOnly')}
              </label>

              <select
                className="form-select form-select-sm category-sort-select"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="featured">{t('category.sortOptions.featured')}</option>
                <option value="priceLowHigh">{t('category.sortOptions.priceLowHigh')}</option>
                <option value="priceHighLow">{t('category.sortOptions.priceHighLow')}</option>
                <option value="newest">{t('category.sortOptions.newest')}</option>
                <option value="topRated">{t('category.sortOptions.topRated')}</option>
              </select>

              <div className="category-view-toggle">
                <button
                  type="button"
                  className={`category-view-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                  aria-label="grid view"
                  onClick={() => setViewMode('grid')}
                >
                  <i className="bi bi-grid-3x3-gap-fill" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={`category-view-btn ${viewMode === 'list' ? 'is-active' : ''}`}
                  aria-label="list view"
                  onClick={() => setViewMode('list')}
                >
                  <i className="bi bi-list-ul" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="category-active-filters">
              {activeFilters.map((filter) => (
                <span className="category-filter-chip" key={filter.key}>
                  {filter.label}
                  <button type="button" onClick={filter.onRemove} aria-label={`remove ${filter.label}`}>
                    <i className="bi bi-x" aria-hidden="true" />
                  </button>
                </span>
              ))}
              <button type="button" className="category-clear-filters" onClick={clearAllFilters}>
                {t('category.clearAllFilters')}
              </button>
            </div>
          )}

          {productsLoading && <p className="store-products-status">{t('store.loading')}</p>}
          {!productsLoading && productsError && (
            <p className="store-products-status store-products-error">{productsError}</p>
          )}

          <div className={`category-products is-${viewMode}`}>
            {!productsLoading && products.map((product) => {
              const isSaved = savedItems.includes(product.id)
              const isSelected = selectedProductIndex === product.id
              return (
                <article
                  className={`category-product-row ${isSelected ? 'is-selected' : ''}`}
                  key={product.id}
                  onClick={() => setSelectedProductIndex((current) => (current === product.id ? null : product.id))}
                >
                  <button
                    type="button"
                    className={`category-product-wishlist ${isSaved ? 'is-saved' : ''}`}
                    aria-label={product.name}
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleValue(savedItems, setSavedItems, product.id)
                    }}
                  >
                    <i className={`bi ${isSaved ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
                  </button>

                  <img src={product.image || PLACEHOLDER_IMAGE} alt={product.name} className="category-product-thumb" />

                  <div className="category-product-info">
                    <h3 className="category-product-title">{product.name}</h3>

                    <div className="category-product-price-row">
                      <span className="category-product-price">${Number(product.price).toFixed(2)}</span>
                    </div>

                    {product.category?.name && (
                      <span className="category-product-shipping">{product.category.name}</span>
                    )}

                    <p className="category-product-desc">{product.description}</p>

                    <button
                      type="button"
                      className="category-product-view"
                      onClick={(event) => {
                        event.stopPropagation()
                        onProductClick?.(product.id)
                      }}
                    >
                      {t('category.viewDetails')}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="category-pagination">
            <label className="category-page-size">
              {t('category.show')}
              <select
                className="form-select form-select-sm"
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <div className="category-page-nav">
              <button
                type="button"
                className="category-page-btn category-page-arrow"
                aria-label="previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                <i className="bi bi-chevron-left" aria-hidden="true" />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`category-page-btn ${currentPage === page ? 'is-active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="category-page-btn category-page-arrow"
                aria-label="next page"
                disabled={currentPage === 3}
                onClick={() => setCurrentPage((page) => Math.min(3, page + 1))}
              >
                <i className="bi bi-chevron-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </main>
      </div>

      <section className="store-newsletter">
        <h3 className="store-newsletter-title">{t('store.newsletter.title')}</h3>
        <p className="store-newsletter-subtitle">{t('store.newsletter.subtitle')}</p>
        <form className="store-newsletter-form" onSubmit={handleNewsletterSubmit}>
          <div className="input-group store-newsletter-input-group">
            <span className="input-group-text store-newsletter-icon">
              <i className="bi bi-envelope" aria-hidden="true" />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder={t('store.newsletter.emailPlaceholder')}
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
            />
          </div>
          <button type="submit" className="btn store-newsletter-btn">
            {t('store.newsletter.subscribe')}
          </button>
        </form>
      </section>

      <footer className="store-footer">
        <div className="store-footer-top">
          <div className="store-footer-brand">
            <img src={borcelleLogo} alt={t('login.brand')} className="store-footer-logo" />
            <p className="store-footer-tagline">{t('store.footer.tagline')}</p>
            <div className="store-footer-socials">
              {SOCIAL_LINKS.map((social) => (
                <a href="#" className="store-footer-social-btn" aria-label={social.label} key={social.icon}>
                  <i className={`bi ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div className="store-footer-column" key={column.titleKey}>
              <h4 className="store-footer-column-title">{t(column.titleKey)}</h4>
              <ul className="store-footer-links">
                {column.itemKeys.map((itemKey) => (
                  <li key={itemKey}>
                    <button type="button" className="store-footer-link">
                      {t(itemKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="store-footer-column store-footer-apps">
            <h4 className="store-footer-column-title">{t('store.footer.getApp.title')}</h4>
            <button type="button" className="store-app-badge">
              <i className="bi bi-apple" aria-hidden="true" />
              <span className="store-app-badge-text">
                <small>{t('store.footer.getApp.downloadOn')}</small>
                <strong>App Store</strong>
              </span>
            </button>
            <button type="button" className="store-app-badge">
              <i className="bi bi-google-play" aria-hidden="true" />
              <span className="store-app-badge-text">
                <small>{t('store.footer.getApp.getItOn')}</small>
                <strong>Google Play</strong>
              </span>
            </button>
          </div>
        </div>

        <div className="store-footer-bottom">
          <span>{t('store.footer.copyright')}</span>
          <button type="button" className="store-footer-lang">
            <img src={flagUk} alt="" className="store-footer-lang-flag" />
            {t('store.footer.language')}
            <i className="bi bi-chevron-up" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Category
