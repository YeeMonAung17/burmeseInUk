export interface GroceryStore {
  id: string
  name: string
  priceLevel: string
  description: string
  tips: string
  website: string
}

export const groceryData: GroceryStore[] = [
  {
    id: '1',
    name: 'Wing Yip',
    priceLevel: '££',
    description:
      'One of the UK’s largest Chinese supermarket chains, founded in Birmingham in 1970. Stocks a wide range of Chinese and pan‑Asian products. :contentReference[oaicite:0]{index=0}',
    tips: 'Park at the Cricklewood or Croydon superstores; great for bulk and specialist ingredients.',
    website: 'https://www.wingyip.com',
  },
  {
    id: '2',
    name: 'Tian Tian Market',
    priceLevel: '££',
    description:
      'Modern East‑Asian supermarket chain in London with over 10,000 products from China, Japan, Korea and Southeast Asia. :contentReference[oaicite:1]{index=1}',
    tips: 'Check the Ealing or West London branches for good weekly deals on dumplings and ramen.',
    website: 'https://www.tiantianmarket.co.uk',
  },
  {
    id: '3',
    name: 'Oseyo',
    priceLevel: '££',
    description:
      'Korean‑food specialist chain in the UK which also stocks Chinese, Japanese and other Asian groceries; 14+ stores and growing. :contentReference[oaicite:2]{index=2}',
    tips: 'Look out for their own‐brand snacks and seasonal imports — good for unique finds.',
    website: 'https://www.oseyo.co.uk',
  },
  {
    id: '4',
    name: 'SeeWoo',
    priceLevel: '££',
    description:
      'Long‑standing Chinese supermarket in London’s Chinatown, offering seafood, fresh produce and many Asian groceries. :contentReference[oaicite:3]{index=3}',
    tips: 'Worth visiting for fresh tofu, live seafood and large sauce selection.',
    website: 'https://www.seewoo.com',
  },
  {
    id: '5',
    name: 'Loon Fung',
    priceLevel: '££',
    description:
      'Established Oriental supermarket chain (Chinese & Vietnamese goods) with multiple London branches. :contentReference[oaicite:4]{index=4}',
    tips: 'Good for bulk shopping and less‑crowded afternoons; ask about their wholesale side.',
    website: 'https://www.loonfung.co.uk',
  },

  {
    id: '6',
    name: 'Tesco',
    priceLevel: '££',
    description:
      "UK's largest supermarket chain, offers groceries, clothing, and electronics.",
    tips: 'Get a Clubcard for discounts and points.',
    website: 'https://www.tesco.com',
  },
  {
    id: '7',
    name: 'Sainsbury’s',
    priceLevel: '££',
    description: 'Offers groceries, clothing, and home goods across the UK.',
    tips: 'Look out for Nectar card deals.',
    website: 'https://www.sainsburys.co.uk',
  },
  {
    id: '8',
    name: 'Waitrose & Partners',
    priceLevel: '£££',
    description: 'Premium supermarket chain known for quality products.',
    tips: 'Check their loyalty scheme for discounts.',
    website: 'https://www.waitrose.com',
  },
  {
    id: '9',
    name: 'Lidl',
    priceLevel: '£',
    description:
      'Discount supermarket with a focus on value and seasonal specials.',
    tips: 'Arrive early for weekly special offers.',
    website: 'https://www.lidl.co.uk',
  },
  {
    id: '10',
    name: 'Aldi',
    priceLevel: '£',
    description:
      'Discount grocery chain offering high-quality private-label products.',
    tips: 'Look for “Aldi Finds” for special deals.',
    website: 'https://www.aldi.co.uk',
  },
]
