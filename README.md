# tmDigital Sales Lead Manager

Aplicação de gerenciamento de leads e propriedades para o setor agropecuário.

## Stack Tecnológica

- **Frontend:** Angular 19+, PrimeNG, Tailwind CSS, NgRx
- **Backend:** NestJS, TypeORM, Postgres
- **DevOps:** Docker, Nx Monorepo

## Como Rodar

1. Suba o banco de dados:

   ```bash
   docker-compose up -d
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode a aplicação (Backend + Frontend):
   ```bash
   npx nx run-many --targets=serve --projects=backend,frontend
   ```

## Notas de Implementação

- **Geometria:** Atualmente, a geometria da propriedade é armazenada como uma string simples para fins de teste. Em um cenário de produção real, recomenda-se o uso de **PostGIS** (com tipos `GEOMETRY` ou `GEOGRAPHY`) ou armazenamento em formato **GeoJSON** para permitir consultas espaciais avançadas e validação de dados geográficos.
