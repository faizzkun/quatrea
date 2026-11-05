export interface Article {
  slug: string
  title: string
  excerpt: string
  readingTime: string
  date: string
  image: string
  imageAlt: string
  body: string[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'finding-your-signature-scent',
    title: 'The Art of Finding Your Signature Scent',
    excerpt:
      'A signature scent is not the fragrance you love most in the shop. It is the one that still feels like you at six in the evening, on a tired day, in your own clothes.',
    readingTime: '6 min read',
    date: 'October 28, 2026',
    image: '/images/spring.webp',
    imageAlt: 'Éclosion, the spring QUATRÉA fragrance bottle',
    body: [
      'Everyone remembers the first fragrance they chose for themselves. Fewer remember why. Usually it was not the notes, or the bottle, or the name — it was a feeling. A version of yourself you wanted to meet more often. That is the honest starting point for finding a signature scent: not what smells impressive, but what smells like the person you are becoming.',
      'Begin with your life, not the counter. A signature scent has to survive your actual days — the commute, the long meeting, the evening you did not plan for. The fragrances that last are the ones that work in the places you actually go, at the hours you actually live. Test on skin, never only on paper, and give it a full day. A scent that is beautiful for twenty minutes and tiring for six hours is not a signature; it is a first impression.',
      'Pay attention to the drydown, because that is what you will live with. Top notes are the introduction — bright, brief, designed to be noticed. The heart is the conversation. The base is the part that stays in the room after you have left, and the part that will be on your coat tomorrow morning. When you choose, choose the base you still like at midnight.',
      'Season matters more than most people admit. The fragrance that carries you through July will sit differently in January, and that is not a flaw in the perfume — it is the point of having a wardrobe at all. Many of the most confident wearers keep two or three signatures and rotate them with the light. A signature does not have to be one bottle for life. It has to be one honest answer to the question: who am I today?',
      'Finally, resist the urge to ask everyone else. Other people can tell you what a fragrance smells like on you, and that is useful — but they cannot tell you whether it feels like you. Wear it alone first. Walk in it. Work in it. If, by the end of the day, you have forgotten you are wearing it and yet keep catching something quietly good, you have found it.',
      'At QUATRÉA we built four fragrances around four seasons precisely because identity is not fixed. Éclosion for the hopeful mornings, Solstice d’Or for the long golden days, Braise Royale for the evenings that ask for warmth, and Nuit Glacée for the nights that ask for stillness. Your signature may be one of them — or the way you move between them.',
    ],
  },
  {
    slug: 'seasons-influence-fragrance',
    title: 'How Seasons Influence Fragrance',
    excerpt:
      'Heat lifts a scent and cold holds it close. The same perfume is a different experience in July than in January — and perfumers have always known it.',
    readingTime: '5 min read',
    date: 'October 14, 2026',
    image: '/images/summer.webp',
    imageAlt: "Solstice d'Or, the summer QUATRÉA fragrance bottle",
    body: [
      'Fragrance is chemistry, and chemistry answers to temperature. Warm skin and warm air lift the most volatile molecules first, so a citrus opening blooms in summer and fades faster; cold air slows everything down, so the same composition unfolds slowly, quietly, and lasts longer on a winter coat than it ever could on bare skin in August.',
      'That is why spring asks for green and floral notes — fig leaf, lily of the valley, peony — materials that read as fresh air and new growth. They would be lost under the weight of a heavy winter base, but in the mild light of spring they have exactly the space they need.',
      'Summer belongs to citrus and amber. Lemon, bergamot and neroli open bright because heat carries them; amber, sandalwood and vanilla bourbon underneath give the brightness something to land on, so the scent does not simply evaporate by noon. A good summer fragrance is built like a long afternoon: bright at the start, warm for hours.',
      'Autumn turns to spice and wood. Pink pepper, cardamom, cinnamon and oud are materials that need cool air to show their depth — in heat they can feel heavy, in autumn air they feel like shelter. The season itself does the work: fallen leaves, woodsmoke, the first evening cold. The perfume only has to agree with it.',
      'Winter is the season of musk, incense and deep woods. Icy aldehydes and juniper give the opening its cold clarity, while black amber, vetiver and grey musk create a warmth that sits close to the skin — the kind of warmth you notice when you step inside from the snow. In winter, a fragrance is less a greeting than a private room.',
      'The practical lesson is simple: let the season choose the weight. Light, green and floral when the air is mild; bright citrus when it is warm; spice and wood when it cools; deep musk and incense when it is cold. Wear with the year, not against it, and every fragrance you own will perform at its best.',
    ],
  },
  {
    slug: 'understanding-fragrance-notes',
    title: 'Understanding Fragrance Notes',
    excerpt:
      'Top, heart, base — three acts of the same story. Once you know how a fragrance unfolds over hours, you will never judge one in the first minute again.',
    readingTime: '7 min read',
    date: 'September 30, 2026',
    image: '/images/autumn.webp',
    imageAlt: 'Braise Royale, the autumn QUATRÉA fragrance bottle',
    body: [
      'Every fine fragrance is written in three acts. The top notes are the opening — the first fifteen minutes, the brightest and most volatile materials: citrus, green leaves, pepper, aldehydes. They are designed to be noticed immediately and to leave quickly. Judging a perfume by its top notes alone is like judging a novel by its first page.',
      'The heart notes arrive as the top fades, usually from twenty minutes to a few hours in. This is where the character of the fragrance lives: florals like rose and iris, spices like cinnamon and cardamom, fruits like plum and fig. The heart is the longest conversation in the composition, and it is the part most people remember when they describe a scent to a friend.',
      'The base notes are the foundation — woods, musks, ambers, resins, vanilla, leather. They are the heaviest molecules, the slowest to evaporate, and they can last eight to twelve hours or more on skin, and days on fabric. The base is what remains on your coat the next morning. It is the part of the fragrance that becomes, quietly, yours.',
      'A note is not a single ingredient. When a fragrance lists "rose absolute" or "green fig leaf", it usually means an accord — several materials composed together to suggest that thing more faithfully than any one material could. A good perfumer is less a collector of ingredients than a composer of impressions.',
      'Longevity and sillage describe how a fragrance behaves, not how good it is. Longevity is how long it lasts on skin. Sillage is the trail it leaves in the air behind you. A heavy sillage suits an evening; a moderate one suits an office; a close, skin-like sillage suits the person who wears fragrance for themselves alone. None is better — each is a different kind of presence.',
      'The next time you try a fragrance, give it the courtesy of time. Spray it once, on skin, and then do something else. Come back in an hour, and again in four. The scent you meet at four hours is the one you are actually considering buying. Everything before that was only the introduction.',
    ],
  },
  {
    slug: 'beauty-of-niche-perfumery',
    title: 'The Beauty of Niche Perfumery',
    excerpt:
      'Niche perfumery is not about being obscure. It is about a perfumer answering to an idea instead of a focus group — and the difference is something you can smell.',
    readingTime: '5 min read',
    date: 'September 12, 2026',
    image: '/images/winter.webp',
    imageAlt: 'Nuit Glacée, the winter QUATRÉA fragrance bottle',
    body: [
      'There is a difference between a fragrance made to please everyone and a fragrance made to say something. The first is engineered by committee — tested, softened, rounded off until nothing in it can offend anyone, and nothing in it can move anyone either. The second is made by a perfumer with a point of view, and it keeps its edges.',
      'Niche perfumery is, at its simplest, the second kind. Smaller production, higher concentrations of natural materials, longer maceration, and — most importantly — creative freedom. A niche perfumer can use an expensive iris butter aged for three years, or a cultivated oud, or an accord that takes eight weeks to settle, because nobody is asking them to make it cheaper for a million bottles.',
      'That freedom shows in the wearing. Niche fragrances tend to unfold more slowly and last longer, because they are built on heavier, richer base materials rather than on a bright opening designed to sell in the first ten seconds at a counter. They reward patience — the person who wears one all day gets a better fragrance than the person who only smelled the spray.',
      'It also shows in the honesty of the work. A niche house can make four fragrances instead of forty, and make each one properly. It can say "this is our spring" and mean it, rather than releasing a spring edition, a summer edition, a limited edition and a flanker of the same idea. Restraint, in perfumery as in everything else, is a form of respect.',
      'None of this means niche is always better, or that a widely loved fragrance is somehow lesser. Some of the great perfumes of the last century were made for everyone. But if you have ever worn something and felt that it was made for a person exactly like you — not for a demographic, but for a sensibility — you have felt what niche perfumery is for.',
      'QUATRÉA exists in that spirit: four fragrances, each one made slowly, each one answering to a season rather than a trend. We would rather make four things well than forty things adequately. The bottle on your shelf should feel like a decision, not an accumulation.',
    ],
  },
]

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug)
