# tmDigital Sales Lead Manager (Refactored)



Uma aplicação Full Stack robusta para gestão de leads e propriedades rurais, demonstrando domínio em **Segurança**, **Escalabilidade** e **Clean Architecture**.

## 🚀 Stack Tecnológica & Arquitetura

### Backend (NestJS)

- **Segurança:** Autenticação **JWT** (`passport-jwt`), Rate Limiting (`@nestjs/throttler`), Proteção de Headers (`helmet`), Bcrypt para hashing.
- **Banco de Dados:** PostgreSQL com **PostGIS** (Geometria Espacial Real).
- **ORM:** TypeORM com **Repository Pattern** (Desacoplamento) e **Migrations** versionadas.
- **Config:** Variáveis de ambiente (`@nestjs/config`) e validação via DTOs (`class-validator`).
- **Logging:** Tratamento centralizado de erros com **Exception Filters**.

### Frontend (Angular 19+)

- **Core:** Standalone Components, Signals, Interceptors (Auth).
- **State Management:** **NgRx** (Actions, Reducers, Effects) com Seletores otimizados.
- **Performance:** **Lazy Loading** real em tabelas (paginação server-side) e estratégia `OnPush`.
- **UI:** PrimeNG v21 (Aura), Tailwind CSS, Layout Responsivo Enterprise.
- **Integração:** Consumo da API do IBGE para localidades.

### DevOps & Qualidade

- **Monorepo:** Nx.
- **Containers:** Docker Compose (App + PostGIS).
- **Pipeline:** Husky (Pre-commit hooks), Lint-Staged, ESLint, Prettier.
- **Testes:** Unitários (Jest/Vitest) com cobertura de Services, Reducers e Componentes.

---

## 🛠️ Como Rodar o Projeto

### 1. Pré-requisitos

- Node.js (v18+)
- Docker e Docker Compose

### 2. Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto (baseado nas chaves abaixo):

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=tmdigital_db
DB_SYNCHRONIZE=false

# App & Security
PORT=3000
JWT_SECRET=sua_chave_secreta_super_segura
```

### 3. Subir Infraestrutura (PostGIS)

Suba o container do banco de dados preparado com a extensão PostGIS:

```bash
docker-compose up -d
```

### 4. Instalar Dependências

```bash
npm install
```

### 5. Executar Migrations

Aplique o schema do banco de dados (tabelas users, leads, properties com geometria):

```bash
npm run migration:run
```

### 6. Rodar a Aplicação

Inicie o Backend e o Frontend simultaneamente:

```bash
npx nx run-many --targets=serve --projects=backend,frontend
```

- **Frontend:** http://localhost:4200
- **Backend:** http://localhost:3000/api

---

## ✨ Destaques da Refatoração (Post-Feedback)

Este projeto passou por uma refatoração intensiva para cobrir lacunas comuns em testes técnicos:

### 🔒 1. Segurança (Zero Trust)

- **Antes:** API aberta.
- **Agora:** Todas as rotas críticas protegidas por **Guards JWT**. Login necessário. Senhas salvas com hash forte. Proteção contra ataques de força bruta (Rate Limiting) e vulnerabilidades web conhecidas (Helmet).

### ⚡ 2. Performance Real

- **Antes:** Frontend recebia todos os registros e paginava localmente (risco de crash com dados massivos).
- **Agora:** **Paginação Server-Side** completa (SQL `OFFSET/LIMIT`). O frontend solicita apenas a página atual via **Lazy Loading**. O Dashboard processa agregações (`COUNT`, `SUM`) diretamente no banco.

### 🗺️ 3. Geoprocessamento (PostGIS)

- **Antes:** Geometria salva como texto simples (`string`).
- **Agora:** Coluna do tipo `geometry(Geometry, 4326)`. Isso habilita o sistema para consultas espaciais reais (ex: "buscar fazendas num raio de X km", "calcular área exata").

### 🏗️ 4. Arquitetura Limpa (Repository Pattern)

- **Antes:** Services acoplados diretamente ao TypeORM.
- **Agora:** Camada de **Repositórios** isola a regra de negócio da infraestrutura de dados. Facilita testes e troca de ORM.

### 🔄 5. Versionamento de Banco (Migrations)

- **Antes:** `synchronize: true` (risco alto em produção).
- **Agora:** Controle total de alterações de schema via **Migrations**, garantindo rastreabilidade e segurança nos deploys.

---

## 🧪 Testes

Para garantir a integridade após a refatoração, execute a suíte de testes:

```bash
npx nx run-many --target=test --projects=backend,frontend
```

---

Desenvolvido com foco em excelência técnica.
