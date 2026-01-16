import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Lead } from '../app/leads/lead.entity';
import { Property } from '../app/properties/property.entity';
import { User } from '../app/users/user.entity';

config(); // Load .env

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'tmdigital_db',
  entities: [Lead, Property, User],
  migrations: ['apps/backend/src/migrations/*.ts'],
  synchronize: false, // Migrations enabled!
});
