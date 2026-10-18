const HIDDEN_CATEGORIES = {
  chromebooks: [8],
  forth: [22],
  electronics: [56, 64],
  animal: [65],
  testSh: [71],
}

const HIDDEN_PRODUCTS_BY_CATEGORY = {
  macBook: [167, 214, 216, 223],
  tv: [42, 166, 215, 218, 219, 221, 222],
  headphones: [156, 171, 173, 175],
  desktopComputer: [135, 136, 137, 138, 139, 140, 141, 142, 143],
  windowsPcs: [180],
  macPc: [129, 179],
  tablets: [29, 154, 168, 212],
  smartwatches: [231, 232, 233],
  allCategoriesPages4To7: [
    107, 108, 112, 113, 114, 115, 116, 117, 118, 119, 121, 122, 123, 126, 128, 132, 134, 149, 151,
    152, 153, 155, 157, 158, 165, 169, 170, 176, 177, 205, 206, 208, 211, 227, 228, 235, 236,
  ],
}

const HIDDEN_CATEGORY_IDS = new Set(Object.values(HIDDEN_CATEGORIES).flat())
const HIDDEN_PRODUCT_IDS = new Set(Object.values(HIDDEN_PRODUCTS_BY_CATEGORY).flat())

export function isCategoryVisible(category) {
  return !HIDDEN_CATEGORY_IDS.has(category?.id)
}

export function isProductVisible(product) {
  return !HIDDEN_PRODUCT_IDS.has(product?.id) && isCategoryVisible(product?.category)
}
