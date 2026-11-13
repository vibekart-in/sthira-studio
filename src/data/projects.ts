export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Residential' | 'Interiors' | 'Hospitality';
  location: string;
  year: string;
  area: string;
  status: string;
  cover: string;
  coverAlt: string;
  intro: string;
  concept: string;
  materials: string[];
  gallery: { src: string; alt: string; caption: string }[];
};

// These are fictional portfolio concept studies, not completed client commissions.
export const projects: Project[] = [
  {
    slug: 'courtyard-house', number: '01', title: 'The Courtyard House', subtitle: 'A home shaped around a pause',
    category: 'Residential', location: 'Jaipur, Rajasthan', year: '2026', area: 'Concept study', status: 'Residential concept',
    cover: 'https://images.unsplash.com/photo-1776657215949-1b7fce8cd351?auto=format&fit=crop&w=1800&q=85',
    coverAlt: 'Minimal courtyard with a quiet stepping-stone path, concrete walls and planted grass',
    intro: 'A study in the relationship between shelter and openness. The home is imagined as a sequence of shaded thresholds, quiet rooms and a central garden that brings the changing day into everyday life.',
    concept: 'Rather than treating the courtyard as leftover space, this concept makes it the organising heart of the home. Every route brushes past planted ground, filtered daylight or a framed view of the sky.',
    materials: ['Lime plaster', 'Local stone', 'Oiled teak', 'Brushed bronze'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1783315943625-6c00dc4b265b?auto=format&fit=crop&w=1500&q=85', alt: 'Quiet concrete courtyard with a planted centre and strong daylight', caption: 'A protected outdoor room' },
      { src: 'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=1500&q=85', alt: 'Minimal living room with warm timber, plants and soft sunlight', caption: 'Material warmth within a restrained palette' }
    ]
  },
  {
    slug: 'house-of-light', number: '02', title: 'House of Light', subtitle: 'A softer rhythm for daily living',
    category: 'Interiors', location: 'Ahmedabad, Gujarat', year: '2025', area: 'Concept study', status: 'Interior concept',
    cover: 'https://images.unsplash.com/photo-1754613389158-3b13a051a81a?auto=format&fit=crop&w=1600&q=85',
    coverAlt: 'Warm neutral living room with linen curtains and natural daylight',
    intro: 'A calm interior language built around filtered light, tactile finishes and a few carefully chosen objects. The concept favours a slower, more deliberate relationship with the everyday.',
    concept: 'The rooms are kept visually quiet so that light, texture and proportion do the work. Joinery sits flush, storage recedes, and soft natural materials make the spaces feel welcoming rather than sparse.',
    materials: ['Natural oak', 'Linen', 'Travertine', 'Hand-finished plaster'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=1500&q=85', alt: 'Warm minimalist interior with natural materials and sunlight', caption: 'An intentionally quiet living space' },
      { src: 'https://images.unsplash.com/photo-1733078868229-fac69ef3afad?auto=format&fit=crop&w=1500&q=85', alt: 'Contemporary interior with a sculptural staircase and considered furniture', caption: 'Movement through the home' }
    ]
  },
  {
    slug: 'still-house', number: '03', title: 'The Still House', subtitle: 'A retreat in the landscape',
    category: 'Hospitality', location: 'Udaipur, Rajasthan', year: '2025', area: 'Concept study', status: 'Hospitality concept',
    cover: 'https://images.unsplash.com/photo-1762419757194-406cc4a13d73?auto=format&fit=crop&w=1600&q=85',
    coverAlt: 'Geometric modern concrete architecture framed by green landscape',
    intro: 'A small retreat imagined as a place to slow down. The architecture opens selectively to the landscape, balancing expansive shared spaces with moments of privacy.',
    concept: 'Deep overhangs temper the sun, courtyards bring the outdoors close, and a limited material palette allows the site to remain the most expressive element.',
    materials: ['Board-formed concrete', 'Rough-cut stone', 'Dark timber', 'Native planting'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1776657215949-1b7fce8cd351?auto=format&fit=crop&w=1500&q=85', alt: 'Sculptural courtyard with grass and stepping stones', caption: 'A quieter connection to the landscape' },
      { src: 'https://images.unsplash.com/photo-1754613389158-3b13a051a81a?auto=format&fit=crop&w=1500&q=85', alt: 'Softly lit interior with a natural and restrained palette', caption: 'Spaces that invite a slower pace' }
    ]
  },
  {
    slug: 'home-in-layers', number: '04', title: 'A Home in Layers', subtitle: 'Texture, craft and continuity',
    category: 'Residential', location: 'Pune, Maharashtra', year: '2024', area: 'Concept study', status: 'Residential concept',
    cover: 'https://images.unsplash.com/photo-1733078868229-fac69ef3afad?auto=format&fit=crop&w=1600&q=85',
    coverAlt: 'Contemporary home interior with warm finishes and sculptural staircase',
    intro: 'An exploration of how architecture and interior design can work as one continuous language, using thresholds, built-in elements and material transitions to give the home a clear identity.',
    concept: 'The plan is organised as a sequence of connected layers. Shared spaces remain open and generous, while quieter rooms are tucked behind timber screens and softly lit passages.',
    materials: ['Walnut veneer', 'Limestone', 'Microcement', 'Textured glass'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=1500&q=85', alt: 'Softly lit neutral interior with timber details', caption: 'A warm material sequence' },
      { src: 'https://images.unsplash.com/photo-1754613389158-3b13a051a81a?auto=format&fit=crop&w=1500&q=85', alt: 'Contemporary interior with understated furniture and natural tones', caption: 'Everyday spaces, thoughtfully resolved' }
    ]
  }
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
