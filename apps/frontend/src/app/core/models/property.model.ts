export enum CropType {
  SOY = 'Soja',
  CORN = 'Milho',
  COTTON = 'Algodão',
}

export interface Property {
  id: number;
  crop: CropType;
  area: number;
  geometry?: string;
  leadId: number;
  createdAt: string;
  updatedAt: string;
}
