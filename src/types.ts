export interface Kitnet {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  price: number;
  condominium?: number;
  iptu?: number;
  utilitiesIncluded: {
    water: boolean;
    electricity: boolean;
    gas: boolean;
    internet: boolean;
  };
  furnished: boolean;
  petFriendly: boolean;
  area: number; // m²
  bedrooms: number;
  bathrooms: number;
  latitude: number;
  longitude: number;
  images: string[];
  videoTour?: string;
  floorPlan?: string;
  description: string;
  nearby: {
    universities: { name: string; distance: string }[];
    subway: { line: string; distance: string }[];
    commerce: { name: string; type: string; distance: string }[];
  };
  avgUtilities?: number; // média de contas quando não inclusas
}

export interface FiltersState {
  maxPrice?: number;
  utilitiesIncluded: string[];
  furnished?: boolean;
  petFriendly?: boolean;
  maxDistanceUniversity?: number;
  maxDistanceSubway?: number;
}
