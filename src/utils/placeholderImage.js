// Shown for products the backend has no photo for (an empty `image` string) and
// for photos that fail to load. A small picture glyph makes it read as "no
// image" rather than as an empty grey box.
const PLACEHOLDER_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>" +
  "<rect width='200' height='200' fill='#e9ecef'/>" +
  "<circle cx='72' cy='78' r='12' fill='#adb5bd'/>" +
  "<path d='M40 148 L84 100 L112 130 L136 104 L160 148 Z' fill='#adb5bd'/>" +
  '</svg>'

export const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(PLACEHOLDER_SVG)}`

// Swaps a broken <img> (e.g. a product image URL that 404s after the file was
// removed/replaced on the backend) to the placeholder instead of leaving the
// browser's broken-image icon on screen.
export function handleImageFallback(event) {
  const img = event.currentTarget
  if (img.getAttribute('src') === PLACEHOLDER_IMAGE) return
  img.src = PLACEHOLDER_IMAGE
}
