// The backend returns product images inconsistently: `image` is an empty string
// for some products (or missing on cart lines), `design` usually duplicates
// `image`, and `images` holds the extra gallery shots. This is the single place
// that turns that into one main `image` plus a de-duplicated list of extra
// `images`, so pages never have to guess.

import { FALLBACK_PRODUCT_IMAGES } from '../utils/productImageFallbacks'

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function pickProductImages(product) {
  const gallery = [product?.image, ...(Array.isArray(product?.images) ? product.images : [])]
  const unique = [...new Set(gallery.map(cleanString).filter(Boolean))]
  // `design`, then a local stand-in, are only last resorts for products with no photo at all.
  if (unique.length === 0) unique.push(cleanString(product?.design))
  if (unique.filter(Boolean).length === 0) unique.push(FALLBACK_PRODUCT_IMAGES[product?.id])
  const [image = '', ...images] = unique.filter(Boolean)
  return { image, images }
}

export function normalizeProduct(product) {
  if (!product) return product
  const { image, images } = pickProductImages(product)
  return { ...product, name: cleanString(product.name), image, images }
}

export function normalizeCategory(category) {
  if (!category) return category
  return { ...category, name: cleanString(category.name), image: cleanString(category.image) }
}
