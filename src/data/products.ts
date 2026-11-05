export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter'
export type Size = '30ml' | '50ml' | '100ml'

export interface Fragrance {
  id: string
  slug: string
  name: string
  season: Season
  tagline: string
  family: string
  personality: string
  longevity: string
  sillage: string
  image: string
  accent: string
  bg: string
  prices: Record<Size, number>
  top: string[]
  heart: string[]
  base: string[]
  story: string
  description: string
  inspiration: string
  craftsmanship: string
}

export const SIZES: Size[] = ['30ml', '50ml', '100ml']

export const PRODUCTS: Fragrance[] = [
  {
    id: 'spring',
    slug: 'spring-fragrance',
    name: 'ÉCLOSION',
    season: 'Spring',
    tagline: 'First light through green leaves',
    family: 'Floral Green',
    personality: 'Delicate, hopeful, luminous',
    longevity: '6–8 hours',
    sillage: 'Moderate',
    image: '/images/spring.webp',
    accent: '#7A8B6F',
    bg: '#EDF0E6',
    prices: { '30ml': 145, '50ml': 195, '100ml': 260 },
    top: ['Green Fig Leaf', 'Bergamot', 'Pear Blossom'],
    heart: ['Lily of the Valley', 'Peony', 'Green Tea'],
    base: ['White Musk', 'Cedarwood', 'Vetiver'],
    story:
      'Éclosion opens the year the way a garden does after rain — quietly, then all at once. It is the scent of a morning when the light returns and everything green seems to lean toward it. Created for the hour when the first buds break, it carries the clean optimism of spring without ever becoming sweet.',
    description:
      'A fresh, delicate, botanical floral. Green fig leaf and bergamot sparkle over a heart of lily of the valley and peony, softened by green tea, and settled on a bed of white musk and pale cedarwood.',
    inspiration:
      'Inspired by the first walk of the season through a walled garden in Grasse — dew on fig leaves, pear blossom overhead, and the particular silence of a morning before the world wakes.',
    craftsmanship:
      'The pear blossom accord is built from natural isolates rather than a single synthetic note, layered over a green-tea infusion macerated for six weeks. The composition is aged in steel, never oak, to keep its light intact.',
  },
  {
    id: 'summer',
    slug: 'summer-fragrance',
    name: "SOLSTICE D'OR",
    season: 'Summer',
    tagline: 'Golden hour, bottled',
    family: 'Citrus Amber',
    personality: 'Radiant, warm, unhurried',
    longevity: '8–10 hours',
    sillage: 'Strong',
    image: '/images/summer.webp',
    accent: '#C08A2D',
    bg: '#F5EAD2',
    prices: { '30ml': 150, '50ml': 205, '100ml': 275 },
    top: ['Sicilian Lemon', 'Bergamot', 'Neroli'],
    heart: ['Orange Blossom', 'Ylang-Ylang', 'Sun-warmed Fig'],
    base: ['Amber', 'Sandalwood', 'Vanilla Bourbon'],
    story:
      "Solstice d'Or is the longest day of the year, kept. It smells of citrus cut in warm air, of skin after sun, of a table set late in the evening when nobody is in a hurry to leave. It is luminous without being loud — gold, not glitter.",
    description:
      'A warm, luminous citrus-amber. Sicilian lemon and neroli open bright; orange blossom and sun-warmed fig deepen the heart; amber, sandalwood and vanilla bourbon hold the warmth long after dusk.',
    inspiration:
      'Inspired by a late afternoon on the Côte d’Azur — the hour when the light turns to honey, the lemons are still warm from the tree, and the sea holds the day’s heat.',
    craftsmanship:
      'The Sicilian lemon is cold-pressed within hours of harvest, and the amber base is built on a labdanum absolute warmed with vanilla bourbon. The blend rests for eight weeks so the citrus settles into the amber instead of sitting on top of it.',
  },
  {
    id: 'autumn',
    slug: 'autumn-fragrance',
    name: 'BRAISE ROYALE',
    season: 'Autumn',
    tagline: 'Embers in the forest',
    family: 'Woody Spicy',
    personality: 'Sensual, grounded, magnetic',
    longevity: '10–12 hours',
    sillage: 'Heavy',
    image: '/images/autumn.webp',
    accent: '#7A2E2E',
    bg: '#F0E3DA',
    prices: { '30ml': 165, '50ml': 225, '100ml': 295 },
    top: ['Pink Pepper', 'Cardamom', 'Plum'],
    heart: ['Oud', 'Cinnamon Bark', 'Rose Absolute'],
    base: ['Smoked Cedar', 'Leather', 'Tonka Bean'],
    story:
      'Braise Royale is autumn after dark — a fire already lit, leaves underfoot, and a room that smells of woodsmoke and spice. It is the most sensual of the four, built to be noticed and then remembered. It does not ask for attention; it holds it.',
    description:
      'A rich, sensual woody-spicy. Pink pepper and plum open dark and bright at once; oud, cinnamon bark and rose absolute burn at the heart; smoked cedar, leather and tonka bean smoulder for hours.',
    inspiration:
      'Inspired by an evening walk through a forest in late October — the smell of fallen leaves, a distant chimney, and the first evening cold enough for a coat worn close.',
    craftsmanship:
      'The oud is a cultivated, sustainable oud, balanced with rose absolute so it reads as warmth rather than weight. The smoked cedar is treated over beechwood, and the tonka bean is added at the very end of maceration to keep its sweetness low and dark.',
  },
  {
    id: 'winter',
    slug: 'winter-fragrance',
    name: 'NUIT GLACÉE',
    season: 'Winter',
    tagline: 'Silence, snow, and smoke',
    family: 'Woody Musky',
    personality: 'Mysterious, composed, quietly powerful',
    longevity: '10–12 hours',
    sillage: 'Enveloping',
    image: '/images/winter.webp',
    accent: '#1E2A4A',
    bg: '#E4E7EC',
    prices: { '30ml': 170, '50ml': 230, '100ml': 300 },
    top: ['Juniper Berry', 'Icy Aldehydes', 'Black Pepper'],
    heart: ['Iris', 'Incense', 'Cold Violet'],
    base: ['Black Amber', 'Vetiver', 'Grey Musk'],
    story:
      'Nuit Glacée is the quietest hour of the year — snow falling on a dark city, breath visible in cold air, and a warmth that comes from within rather than from the room. It is cold on the surface and deep underneath, a fragrance for people who say little and mean it.',
    description:
      'A mysterious, sophisticated cold-weather woody-musky. Juniper and icy aldehydes open crisp; iris, incense and cold violet form a pale, still heart; black amber, vetiver and grey musk give it its long, dark gravity.',
    inspiration:
      'Inspired by a winter night in the mountains — the particular blue of snow under moonlight, the smell of incense from a chapel door, and the hush that only deep cold brings.',
    craftsmanship:
      'The iris butter is aged for three years before use, and the incense is a frankincense resin distilled at low temperature to keep its mineral edge. The grey musk is a modern, cruelty-free accord built to mimic the depth of the classical material.',
  },
]

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
export const related = (id: string) => PRODUCTS.filter((p) => p.id !== id)
export const money = (n: number) => `$${n}`
