import chairImage from '../../assets/images/1.png'
import blackPhoneImage from '../../assets/images/3.png'
import gamingSetImage from '../../assets/images/5.png'
import cameraImage from '../../assets/images/6.png'
import laptopImage from '../../assets/images/7.png'
import homeApplianceImage from '../../assets/images/rasm.png'
import tableLampImage from '../../assets/images/image 94.png'
import airMattressImage from '../../assets/images/image 93.png'
import potImage from '../../assets/images/image 90.png'
import kitchenMixerImage from '../../assets/images/image 88.png'
import coffeeMakerImage from '../../assets/images/image 87.png'
import plantImage from '../../assets/images/image 89.png'
import headphonesImage from '../../assets/images/image 86.png'
import kettleImage from '../../assets/images/image 85.png'
import tabletImage from '../../assets/images/image 32.png'
import redPhoneImage from '../../assets/images/image 33.png'

const LAPTOP_CATEGORIES = ['MacBook', 'Chromebooks', 'Windows PCs', 'Mac pc']
const PHONE_CATEGORIES = ['mobile phone']

export const DEAL_TILES = [
  { key: 'deal-laptops', titleKey: 'store.items.laptopsPc', image: laptopImage, apiNames: LAPTOP_CATEGORIES, discount: '-15%' },
  { key: 'deal-cameras', titleKey: 'store.items.cameras', image: cameraImage, apiNames: ['Cameras'], discount: '-25%' },
  { key: 'deal-gaming', titleKey: 'store.items.gamingSet', image: gamingSetImage, apiNames: ['Gaming Accessories'], discount: '-25%' },
  { key: 'deal-phones', titleKey: 'store.items.smartphones', image: blackPhoneImage, apiNames: PHONE_CATEGORIES, discount: '-25%' },
]

export const HOME_OUTDOOR_TILES = [
  { key: 'home-chairs', titleKey: 'store.items.softChairs', image: chairImage, apiNames: ['Soft chairs'], price: 19 },
  { key: 'home-lamps', titleKey: 'store.items.tableLamps', image: tableLampImage, apiNames: ['Table lamps'], price: 19 },
  { key: 'home-mattress', titleKey: 'store.items.airMattress', image: airMattressImage, apiNames: ['Air mattress'], price: 19 },
  { key: 'home-dishes', titleKey: 'store.items.kitchenDishes', image: potImage, apiNames: ['Kitchen dishes'], price: 19 },
  { key: 'home-mixer', titleKey: 'store.items.kitchenMixer', image: kitchenMixerImage, apiNames: ['Kitchen mixer'], price: 100 },
  { key: 'home-coffee', titleKey: 'store.items.coffeeMaker', image: coffeeMakerImage, apiNames: ['Coffee maker'], price: 39 },
  { key: 'home-appliance', titleKey: 'store.items.homeAppliance', image: homeApplianceImage, apiNames: ['Home appliance'], price: 19 },
  { key: 'home-plants', titleKey: 'store.items.homePlants', image: plantImage, apiNames: ['Home plants'], price: 15 },
]

export const CONSUMER_TILES = [
  { key: 'consumer-cameras', titleKey: 'store.items.cameras', image: cameraImage, apiNames: ['Cameras'], price: 89 },
  { key: 'consumer-headphones', titleKey: 'store.items.headphones', image: headphonesImage, apiNames: ['Headphones'], price: 10 },
  { key: 'consumer-kettle', titleKey: 'store.items.electricKettle', image: kettleImage, apiNames: ['Electric kettle'], price: 90 },
  { key: 'consumer-gaming', titleKey: 'store.items.gamingSet', image: gamingSetImage, apiNames: ['Gaming Accessories'], price: 35 },
  { key: 'consumer-laptops', titleKey: 'store.items.laptopsPc', image: laptopImage, apiNames: LAPTOP_CATEGORIES, price: 340 },
  { key: 'consumer-tablets', titleKey: 'store.items.tablets', image: tabletImage, apiNames: ['Tablets'], price: 19 },
  { key: 'consumer-phones-red', titleKey: 'store.items.smartphones', image: redPhoneImage, apiNames: PHONE_CATEGORIES, price: 240 },
  { key: 'consumer-phones-black', titleKey: 'store.items.smartphones', image: blackPhoneImage, apiNames: PHONE_CATEGORIES, price: 199 },
]

export function resolveTile(tile, categories, products) {
  const wanted = tile.apiNames.map((name) => name.toLowerCase())
  const categoryIds = categories
    .filter((category) => wanted.includes(category.name.toLowerCase()))
    .map((category) => category.id)

  const prices = products
    .filter((product) => categoryIds.includes(product.category?.id))
    .map((product) => Number(product.price))
    .filter((price) => Number.isFinite(price))

  if (prices.length === 0) return { ...tile, categoryIds: [] }
  return { ...tile, categoryIds, price: Math.min(...prices) }
}

export function resolveTiles(tiles, categories, products) {
  return tiles.map((tile) => resolveTile(tile, categories, products))
}
