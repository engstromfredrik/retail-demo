export interface ProductData {
  gtin: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  nutriScore: 'A' | 'B' | 'C' | 'D' | 'E';
  ecoScore: 'A' | 'B' | 'C' | 'D' | 'E';
  ingredients: string[];
  allergens: string[];
  netWeight: string;
  sustainability: {
    carbonFootprint: number; // kg CO2e
    recyclability: number; // percentage
    packaging: string;
    waterUsage: number; // liters
  };
  traceability: {
    origin: string;
    manufacturer: string;
    batchCode: string;
    productionDate: string;
    journeySteps: Array<{
      location: string;
      date: string;
      status: string;
    }>;
  };
}

export interface ResolverConfig {
  baseUrl: string;
  useMockData: boolean;
}

export enum ViewMode {
  SCAN = 'SCAN',
  PRODUCT = 'PRODUCT',
  SETTINGS = 'SETTINGS'
}
