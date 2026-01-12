import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from '../properties/property.entity';

export enum LeadStatus {
  NEW = 'Novo',
  INITIAL_CONTACT = 'Contato inicial',
  NEGOTIATION = 'Em negociação',
  CONVERTED = 'Convertido',
  LOST = 'Perdido',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ unique: true })
  cpf: string;

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NEW,
  })
  status: LeadStatus;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @OneToMany(() => Property, (property) => property.lead)
  properties: Property[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
