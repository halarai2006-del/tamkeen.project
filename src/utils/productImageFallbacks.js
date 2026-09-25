import { API_BASE_URL } from '../api/config'
import blackPhoneImage from '../assets/images/3.png'
import redPhoneImage from '../assets/images/image 33.png'
import smartwatchImage from '../assets/images/smartwatch-product.png'

const serverStorage = API_BASE_URL.replace(/\/api$/, '/storage')

export const FALLBACK_PRODUCT_IMAGES = {
  88: smartwatchImage,
  112: blackPhoneImage,
  113: blackPhoneImage,
  119: `${serverStorage}/339/pinkCarpet.png`,
  122: redPhoneImage,
}
