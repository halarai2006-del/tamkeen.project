// Stand-in photos for products the backend has no image for at all (checked on
// both the product list and product detail endpoints). They are only used when
// the server sends no image, so an image uploaded on the server always wins.
// Delete an entry once its photo has been uploaded in the backend admin panel.
import { API_BASE_URL } from '../api/config'
import blackPhoneImage from '../assets/images/3.png'
import redPhoneImage from '../assets/images/image 33.png'
import smartwatchImage from '../assets/images/smartwatch-product.png'

// Files already stored on the backend (e.g. the pink carpet used by other test products).
const serverStorage = API_BASE_URL.replace(/\/api$/, '/storage')

export const FALLBACK_PRODUCT_IMAGES = {
  88: smartwatchImage, // "New Product name"
  112: blackPhoneImage, // "samsung"
  113: blackPhoneImage, // "samsung"
  119: `${serverStorage}/339/pinkCarpet.png`, // "carpit"
  122: redPhoneImage, // "phone"
}
