import { ProductData } from './types';

// Mock database simulating a GS1 resolver response
export const MOCK_PRODUCTS: Record<string, ProductData> = {
  '9506000134352': {
    gtin: '9506000134352',
    name: 'Organic Basil Pesto Genovese',
    brand: 'Verde Gustooooo',
    description: 'Authentic Italian pesto made with fresh organic basil, pine nuts, and aged Parmigiano Reggiano. Crafted in small batches to preserve the vibrant color and intense aroma.',
    image: 'https://picsum.photos/800/800?random=1',
    nutriScore: 'C',
    ecoScore: 'A',
    ingredients: ['Basil (45%)', 'Sunflower Oil', 'Pine Nuts', 'Parmigiano Reggiano', 'Extra Virgin Olive Oil', 'Garlic', 'Sea Salt'],
    allergens: ['Milk', 'Tree Nuts (Pine Nuts)'],
    netWeight: '190g',
    sustainability: {
      carbonFootprint: 0.85,
      recyclability: 98,
      packaging: 'Glass Jar with Metal Lid',
      waterUsage: 45
    },
    traceability: {
      origin: 'Genoa, Italy',
      manufacturer: 'Verde Gusto S.p.A',
      batchCode: 'L-2024-08-15-XJ',
      productionDate: '2024-08-15',
      journeySteps: [
        { location: 'Genoa Farm, Italy', date: '2024-08-12', status: 'Harvested' },
        { location: 'Verde Gustoooo Factory', date: '2024-08-15', status: 'Processed & Jarrred' },
        { location: 'Milan Distribution Center', date: '2024-08-18', status: 'Dispatched' },
        { location: 'Retail Store', date: '2024-08-20', status: 'Received' }
      ]
    }
  },
  '0614141000036': {
    gtin: '0614141000036',
    name: 'Sustainable Bamboo T-Shirt',
    brand: 'EcoWear',
    description: 'Soft, breathable, and 100% biodegradable. This t-shirt is made from organically grown bamboo with zero pesticides.',
    image: 'https://picsum.photos/800/800?random=2',
    nutriScore: 'A', // N/A really, but keeping structure
    ecoScore: 'A',
    ingredients: ['100% Bamboo Viscose'],
    allergens: [],
    netWeight: '150g',
    sustainability: {
      carbonFootprint: 2.1,
      recyclability: 100,
      packaging: 'Compostable Bag',
      waterUsage: 250
    },
    traceability: {
      origin: 'Sichuan, China',
      manufacturer: 'GreenTextiles Ltd',
      batchCode: 'BAM-2024-Q3',
      productionDate: '2024-07-01',
      journeySteps: [
        { location: 'Bamboo Grove, Sichuan', date: '2024-06-15', status: 'Harvested' },
        { location: 'Fiber Processing Unit', date: '2024-06-20', status: 'Spun' },
        { location: 'Garment Factory, Shanghai', date: '2024-07-01', status: 'Stitched' }
      ]
    }
  }
};

export const DEFAULT_RESOLVER_URL = 'https://id.gs1.org';

// Simple Icons as components
export const Icons = {
  Scan: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="10" height="10" x="7" y="7" rx="2"/><path d="M7 17v4"/><path d="M17 7V3"/><path d="M7 7H3"/><path d="M17 17h4"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Leaf: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.5 2.5 9A8 8 0 0 1 11 20v0Z"/><path d="M8 14h6"/><path d="M3 21c3 0 7-1 7-8"/></svg>
  ),
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 5h4"/><path d="M3 9h4"/></svg>
  ),
  MessageCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  )
};