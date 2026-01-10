export enum LeadStatus {
  NEW = 'Novo',
  NEGOTIATION = 'Em negociação',
  CONVERTED = 'Convertido',
  LOST = 'Perdido',
}

export interface Lead {
  id: number;
  name: string;
  cpf: string;
  status: LeadStatus;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  isPriority?: boolean;
}
