/**
 * Product content model.
 * Every `description`, `variants` and `claims` entry is copied from the live crcollective.com
 * product pages (read 12 Nov 2026). Nothing here is invented. To add a product, add one object.
 * `images` are optional: when a file exists in /public/products/<slug>/ the site uses it,
 * otherwise a clearly labelled placeholder is shown.
 */
export type Product = {
  slug: string;
  name: string;
  shortName?: string;
  family: 'Tins & Boxes' | 'Jars' | 'Closures & Caps' | 'Dispensers';
  summary: string;           // one-line, taken from the page copy
  description: string[];     // paragraphs, verbatim from live site
  variants: string[];
  extraProducts?: { name: string; text: string }[];
  claims: { text: string; needsConfirmation: boolean }[]; // claims as stated by CR Collective
  sustainable?: boolean;
  comingSoon?: boolean;
  disclaimer?: string;
  accent: string;            // placeholder tint only
  shape: 'tin' | 'jar' | 'box' | 'cap' | 'can' | 'pump' | 'pod';
};

export const products: Product[] = [
  {
    slug: 'airtight-hemp', name: 'Airtight Hemp', family: 'Tins & Boxes', shape: 'box', accent: '#c5cfe3', sustainable: true,
    summary: 'HempSeal™ airtight, child-resistant packages made with hemp grown in the USA.',
    description: [
      'Our HempSeal™ line consists of airtight, child-resistant packages, made with hemp grown in the USA. This box is perfect for keeping products fresh and secure. The use of hemp in our packaging also helps to reduce the amount of recycled plastic resin used, making it an eco-friendly choice.',
      'Not only a friend to pre rolls, our patented airtight feature in this package extends the shelf life of gummies, mints, and other edibles.',
    ],
    variants: ['3J Hemp', '5J Hemp'],
    claims: [
      { text: 'Made with hemp grown in the USA', needsConfirmation: true },
      { text: 'Patented airtight feature', needsConfirmation: true },
      { text: 'Reduces the amount of recycled plastic resin used', needsConfirmation: true },
    ],
  },
  {
    slug: 'airtight-pod', name: 'Airtight Pods', family: 'Jars', shape: 'pod', accent: '#c5cfe3', comingSoon: true,
    summary: 'Coming soon.',
    description: ['Coming soon.'],
    variants: ['Airtight Pod 25mm', 'Airtight Pod 38mm', 'Airtight Pod 70mm', 'Airtight Pod 120mm'],
    claims: [],
  },
  {
    slug: 'tins', name: 'Airtight Tins', family: 'Tins & Boxes', shape: 'tin', accent: '#c5cfe3',
    summary: 'TinSeal™ airtight, child-resistant tins with a classic tin exterior.',
    description: [
      'Our TinSeal™ line of airtight, child-resistant packages are designed with a classic tin exterior and the patented airtight interior structure that your customers will love.',
      'The one-of-a-kind tin box can come in a variety of colors, wrap around printing and embossing or debossing throughout. It is the perfect package to stand out on the shelf.',
    ],
    variants: ['5j Airtight Tin', 'Small Airtight Tin'],
    claims: [{ text: 'Patented airtight interior structure', needsConfirmation: true }],
  },
  {
    slug: 'bio-boxes', name: 'Bio Boxes', family: 'Tins & Boxes', shape: 'box', accent: '#c5cfe3', sustainable: true,
    summary: 'Bio Button Box™ paper-formed child-resistant packages with a plant-based button.',
    description: [
      'Our Bio Button Box™ line of paper formed child-resistant packages are engineered with a plant-based button, lending to a 100% biodegradable package. Take advantage of the surface area with our full color printing options and showcase your product right with this desirable sustainable package.',
    ],
    variants: ['Small', 'Medium', 'Large'],
    claims: [{ text: '100% biodegradable package', needsConfirmation: true }],
  },
  {
    slug: 'aluminum-cans', name: "Can'+ Tops", shortName: "Can'+ Tops", family: 'Closures & Caps', shape: 'can', accent: '#c5cfe3',
    summary: 'Patented can locking cap for child-resistant infused beverages.',
    description: [
      "Can’+ Tops lead the industry for child safe beverage packaging. Our patented can locking cap has been Federally tested with thousands of children, resulting in a trusted solution for making infused beverages child resistant.",
    ],
    variants: ['200', '202'],
    extraProducts: [
      { name: 'Can’+ Carrier', text: 'The Can’+ Carrier is a premium, water-resistant paper board multipack solution - available in 4- and 6-pack - that’s precisely die-cut to lock securely over the Can’+ Top™ child-resistant lid mechanism.' },
      { name: 'Can’+ Applicator', text: 'Streamline your automation with our can’+ top applicator. Call today for pricing.' },
    ],
    claims: [
      { text: 'Patented can locking cap', needsConfirmation: true },
      { text: 'Federally tested with thousands of children', needsConfirmation: true },
      { text: 'Industry-leading child safe beverage packaging', needsConfirmation: true },
    ],
  },
  {
    slug: 'concentrate-jars', name: 'Concentrate Jars', family: 'Jars', shape: 'jar', accent: '#c5cfe3',
    summary: 'Patented concentrate jars in 5ml and 9ml across five shapes.',
    description: [
      "Catch your customers' eye with our unique, patented line of concentrate jars. Staying true to child resistant and customer clarity standards, our jars will satisfy you and your customer’s every need.",
      'Our Concentrate Jars come in a range of sizes including 5ml and 9ml, and are available in various shapes including triangle, hex, round, split, and square. This allows you to choose the perfect size and shape for your needs.',
    ],
    variants: ['5ml Circle', '9ml Circle', '5ml Square', '9ml Square', '5ml Tri', '9ml Tri', '5ml Hex', '9ml Hex', '9ml Square Split', '9ml Circle Split'],
    claims: [{ text: 'Patented line of concentrate jars', needsConfirmation: true }],
  },
  {
    slug: 'leaning-jars', name: 'Leaning Jars', family: 'Jars', shape: 'jar', accent: '#c5cfe3',
    summary: 'Patented, award-winning child-resistant and airtight glass jars.',
    description: [
      'Our patented Leaning Jar™ product line is a two time package design award winner. The Leaning Glass Jar is child-resistant and airtight, providing an added level of safety for your customers and increased life-span for your products.',
    ],
    variants: ['20DR', '30DR', '60DR'],
    claims: [
      { text: 'Two time package design award winner', needsConfirmation: true },
      { text: 'Patented product line', needsConfirmation: true },
    ],
  },
  {
    slug: 'ovals', name: 'Ovals', family: 'Jars', shape: 'jar', accent: '#c5cfe3',
    summary: 'Patented oval glass jars, child-resistant and airtight, in four sizes.',
    description: [
      'Catch your customer’s eye with our beautiful, patented jar designs. With 3 different sizes you can find a solution for all of your concentrate, gummy or flower needs.',
      'Choose the Oval Glass Jar for child-resistant and airtight packaging that offers superior quality and design. Order now and experience the ultimate in safety and freshness for your products!',
    ],
    variants: ['2oz', '3oz', '4oz', '10ml'],
    claims: [{ text: 'Patented jar designs', needsConfirmation: true }],
  },
  {
    slug: 'topicals', name: 'Topicals', family: 'Dispensers', shape: 'pump', accent: '#c5cfe3',
    summary: 'CR Pump™ low-profile child-resistant lotion pumps and sprayers.',
    description: [
      'Our CR Pump™ line of topical lotion and sprayers were engineered with a low-profile slim appearance to help distinguish yourself from the competition.',
      'Whether you’re working with sprays, lotions or oils, our extensive product line will fulfill your every need.',
      'As always, child resistance is the focus of our design, in this case, CR packaging that has never existed before.',
    ],
    variants: ['5ml Pocket Spray', '5ml Pocket Pump', '10ml Pocket Spray', '10ml Pocket Pump', '30ml Spray', '30ml Pump', '60ml Spray', '60ml Pump'],
    claims: [{ text: 'Child-resistant packaging that has never existed before', needsConfirmation: true }],
    disclaimer:
      'Certain formulations, ingredients, essential oils, solvents, or active compounds may adversely affect polypropylene (PP) and polyethylene (PE) packaging over time, potentially resulting in changes to product stability, package integrity, appearance, or functionality. Customer assumes full responsibility for performing compatibility and stability testing between their product formulation and the selected packaging prior to commercial production or order placement. Supplier makes no warranty, expressed or implied, regarding product compatibility, long-term stability, or performance with any specific formulation.',
  },
  {
    slug: 'vacusnap-caps', name: 'VacuSnap Caps', family: 'Closures & Caps', shape: 'cap', accent: '#c5cfe3',
    summary: 'Child-resistant cap with an airtight vacuum seal and an audible snap.',
    description: [
      'Freshness in a snap! Designed with an airtight vacuum seal, this child-resistant cap reduces air exposure to protect the flavor, aroma, and integrity of your concentrates. The satisfying audible snap closure instantly assures the consumer that their product is securely sealed and safeguarded from degradation.',
    ],
    variants: ['vacusnap'],
    claims: [],
  },
  {
    slug: 'wine-caps', name: 'Wine Caps', family: 'Closures & Caps', shape: 'cap', accent: '#c5cfe3',
    summary: 'The first premium multi-use child-resistant wine closure.',
    description: [
      'Introducing the Child-Resistant Wine Cap™, the first premium multi-use closure engineered specifically to meet child-resistant regulations while preserving the integrity, aroma, and elegance of your wine. Designed for wineries, infused-beverage brands, and specialty producers, this closure delivers a secure, certified child-resistant mechanism with a clear tamper-evident feature. Provide your customers with a safe, compliant wine bottle without sacrificing the luxury aesthetic and experience they expect.',
    ],
    variants: [],
    claims: [
      { text: 'First premium multi-use child-resistant wine closure', needsConfirmation: true },
      { text: 'Certified child-resistant mechanism', needsConfirmation: true },
      { text: 'Clear tamper-evident feature', needsConfirmation: true },
    ],
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
export const families = ['All', 'Tins & Boxes', 'Jars', 'Closures & Caps', 'Dispensers'] as const;

export const site = {
  name: 'CR Collective',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.crcollective.com',
  phone: '720 826-3866',
  phoneHref: 'tel:+17208263866',
  tagline: 'We supply the suppliers.',
};

/** Related products: same family first, then others, never itself. */
export function related(p: Product, n = 4) {
  const same = products.filter((x) => x.slug !== p.slug && x.family === p.family && !x.comingSoon);
  const rest = products.filter((x) => x.slug !== p.slug && x.family !== p.family && !x.comingSoon);
  return [...same, ...rest].slice(0, n);
}
