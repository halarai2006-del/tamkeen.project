import { FALLBACK_PRODUCT_IMAGES } from '../utils/productImageFallbacks'

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function pickProductImages(product) {
  const gallery = [product?.image, ...(Array.isArray(product?.images) ? product.images : [])]
  const unique = [...new Set(gallery.map(cleanString).filter(Boolean))]
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
