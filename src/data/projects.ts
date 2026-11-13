export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  source: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Residential' | 'Interiors' | 'Hospitality';
  location: string;
  year: string;
  area: string;
  focus: string;
  status: string;
  cover: string;
  coverAlt: string;
  coverCredit: string;
  coverSource: string;
  intro: string;
  concept: string;
  materials: string[];
  gallery: ProjectImage[];
};

// Fictional portfolio concept studies. Photography is credited visual reference,
// not documentation of completed STHIRA Studio commissions.
export const projects: Project[] = [
  {
    slug: 'courtyard-house', number: '01', title: 'The Courtyard House', subtitle: 'A home shaped around a pause',
    category: 'Residential', location: 'Jaipur, Rajasthan', year: '2026', area: 'Concept study', focus: 'Courtyard-led living', status: 'Residential concept study',
    cover: '/images/projects/courtyard-house-cover.jpg',
    coverAlt: 'Quiet indoor courtyard with minimalist furniture and natural daylight',
    coverCredit: 'Rahib Yaqubov', coverSource: 'https://www.pexels.com/photo/minimalist-interior-design-17386428/',
    intro: 'A study in the relationship between shelter and openness. The home is imagined as a sequence of shaded thresholds, quiet rooms and a central garden that brings the changing day into everyday life.',
    concept: 'Rather than treating the courtyard as leftover space, this concept makes it the organising heart of the home. Every route brushes past planted ground, filtered daylight or a framed view of the sky.',
    materials: ['Lime plaster', 'Local stone', 'Oiled teak', 'Brushed bronze'],
    gallery: [
      { src: '/images/projects/courtyard-house-modern-courtyard.jpg', alt: 'Modern courtyard with restrained architecture and desert planting', caption: 'A sheltered room beneath the open sky', credit: 'aboodi vesakaran', source: 'https://www.pexels.com/photo/modern-courtyard-with-minimalist-architecture-in-dubai-31033523/' },
      { src: '/images/projects/courtyard-house-indian-courtyard.jpg', alt: 'Indian courtyard with mature greenery and contemporary architecture', caption: 'Greenery as the centre of daily life', credit: 'Sanjeev Singh', source: 'https://www.pexels.com/photo/a-place-called-home-28220198/' }
    ]
  },
  {
    slug: 'house-of-light', number: '02', title: 'House of Light', subtitle: 'A softer rhythm for daily living',
    category: 'Interiors', location: 'Ahmedabad, Gujarat', year: '2025', area: 'Concept study', focus: 'Daylight & materiality', status: 'Interior concept study',
    cover: '/images/projects/house-of-light-cover.jpg',
    coverAlt: 'Spacious contemporary home interior with a minimalist open-plan design',
    coverCredit: 'Salman Saqib', coverSource: 'https://www.pexels.com/photo/modern-minimalist-home-interior-design-28456460/',
    intro: 'A calm interior language built around filtered light, tactile finishes and a few carefully chosen objects. The concept favours a slower, more deliberate relationship with the everyday.',
    concept: 'The rooms are kept visually quiet so that light, texture and proportion do the work. Joinery sits flush, storage recedes, and soft natural materials make the spaces feel welcoming rather than sparse.',
    materials: ['Natural oak', 'Linen', 'Travertine', 'Hand-finished plaster'],
    gallery: [
      { src: '/images/projects/house-of-light-textures.jpg', alt: 'Serene minimalist interior with natural materials, soft lighting and textured walls', caption: 'Texture gives the quiet palette its depth', credit: 'Pavel Morillo', source: 'https://www.pexels.com/photo/elegant-minimalist-interior-with-natural-textures-32103603/' },
      { src: '/images/projects/house-of-light-bedroom.jpg', alt: 'Light bedroom with white linen, a sofa and indoor plants', caption: 'A softer atmosphere for rest', credit: 'Rachel Claire', source: 'https://www.pexels.com/photo/interior-of-bedroom-with-minimalistic-style-4846112/' }
    ]
  },
  {
    slug: 'still-house', number: '03', title: 'The Still House', subtitle: 'A retreat in the landscape',
    category: 'Hospitality', location: 'Udaipur, Rajasthan', year: '2025', area: 'Concept study', focus: 'Architecture & landscape', status: 'Hospitality concept study',
    cover: '/images/projects/still-house-cover.jpg',
    coverAlt: 'Contemporary villa with a calm pool and restrained architectural forms',
    coverCredit: 'Rana Matloob Hussain', coverSource: 'https://www.pexels.com/photo/modern-luxury-villa-with-pool-and-minimalist-design-34378030/',
    intro: 'A small retreat imagined as a place to slow down. The architecture opens selectively to the landscape, balancing expansive shared spaces with moments of privacy.',
    concept: 'Deep overhangs temper the sun, courtyards bring the outdoors close, and a limited material palette allows the site to remain the most expressive element.',
    materials: ['Board-formed concrete', 'Rough-cut stone', 'Dark timber', 'Native planting'],
    gallery: [
      { src: '/images/projects/still-house-landscape.jpg', alt: 'Modern villa set within a lush landscape around an infinity pool', caption: 'The building settles into its landscape', credit: 'Oleg Prachuk', source: 'https://www.pexels.com/photo/a-modern-villa-with-pool-7942030/' },
      { src: '/images/projects/still-house-pool-terrace.jpg', alt: 'Contemporary villa lounge and pool terrace in daylight', caption: 'A threshold between lounge and water', credit: 'Jonathan Borba', source: 'https://www.pexels.com/photo/contemporary-resort-building-with-minimalistic-design-5563472/' }
    ]
  },
  {
    slug: 'home-in-layers', number: '04', title: 'A Home in Layers', subtitle: 'Texture, craft and continuity',
    category: 'Residential', location: 'Pune, Maharashtra', year: '2024', area: 'Concept study', focus: 'Spatial continuity', status: 'Residential concept study',
    cover: '/images/projects/home-in-layers-cover.jpg',
    coverAlt: 'Bright modern hallway with timber flooring and a staircase',
    coverCredit: 'The R.E Editor', coverSource: 'https://www.pexels.com/photo/a-hallway-with-wooden-floors-and-white-doors-28272314/',
    intro: 'An exploration of how architecture and interior design can work as one continuous language, using thresholds, built-in elements and material transitions to give the home a clear identity.',
    concept: 'The plan is organised as a sequence of connected layers. Shared spaces remain open and generous, while quieter rooms are tucked behind timber screens and softly lit passages.',
    materials: ['Walnut veneer', 'Limestone', 'Microcement', 'Textured glass'],
    gallery: [
      { src: '/images/projects/home-in-layers-staircase.jpg', alt: 'Warm interior with a wooden staircase and a sunlit window', caption: 'Timber brings warmth to vertical movement', credit: 'Tahir Osman', source: 'https://www.pexels.com/photo/staircase-in-house-19514336/' },
      { src: '/images/projects/home-in-layers-stair-detail.jpg', alt: 'Top view of a wooden staircase in a minimalist interior', caption: 'A simple geometry of steps and light', credit: 'Tahir Osman', source: 'https://www.pexels.com/photo/staircase-in-house-15758636/' }
    ]
  }
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);