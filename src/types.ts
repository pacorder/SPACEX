export interface Company {
  id: string;
  name: string;
  ticker: string;
  category: 'materiales' | 'semiconductores' | 'infraestructura' | 'energia' | 'comunicaciones' | 'minerales' | 'inversores';
  priority: 'Alta' | 'Media' | 'Especulativa';
  marketCap: string;
  growthYtd: string;
  growth12m: string;
  role: string;
  description: string;
  risks: string;
  originalShareholder?: boolean;
}

export interface Sector {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  description: string;
  iconName: string;
}

export interface InvestmentAllocation {
  companyId: string;
  amount: number; // USD allocated
}
