export enum LeadStatus {
  NEW = 'Novo',
  INITIAL_CONTACT = 'Contato inicial',
  NEGOTIATION = 'Em negociação',
  CONVERTED = 'Convertido',
  LOST = 'Perdido',
}

export interface Lead {
  id: number;
  name: string;
  cpf: string;
  city?: string;
  state?: string;
  status: LeadStatus;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  isPriority?: boolean;
}
