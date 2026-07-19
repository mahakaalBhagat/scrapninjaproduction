import { ScrapItem } from '@/services/scrapApi';

export interface CartItem extends ScrapItem {
  quantity: number;
}

export interface ESGMetrics {
  carbonSaved: number; // kg CO2 prevented
  landfillWasteReduced: number; // kg
  resourcesConserved: number; // percentage
  recyclingRate: number; // percentage
  complianceCertifications: string[];
  regulatoryStatus: 'compliant' | 'pending' | 'non-compliant';
  governanceScore: number; // 0-100
}
