import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lead } from '../leads/lead.entity';

export enum CropType {
  SOY = 'Soja',
  CORN = 'Milho',
  COTTON = 'Algodão',
  COFFEE = 'Café',
  SUGARCANE = 'Cana-de-açúcar',
}

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CropType,
  })
  crop: CropType;

  @Column('float')
  area: number;

  @Column({ type: 'text', nullable: true })
  geometry: string;

  @ManyToOne(() => Lead, (lead) => lead.properties, { onDelete: 'CASCADE' })
  lead: Lead;

  @Column()
  leadId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
