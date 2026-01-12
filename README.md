# tmDigital Sales Lead Manager

> Aplicação Full Stack para gestão de leads e propriedades rurais.

Este projeto foi desenvolvido visando resolver o desafio de gestão de carteira de clientes de um distribuidor de insumos agrícolas em MG.

## 🚀 Tecnologias Utilizadas

A solução foi construída utilizando uma stack moderna e robusta, focada em escalabilidade e manutenibilidade:

- **Frontend:** Angular 19+ (Standalone Components, Signals), PrimeNG v21 (Aura Theme), Tailwind CSS, NgRx (State Management).
- **Backend:** NestJS, TypeORM, PostgreSQL.
- **DevOps/Tooling:** Nx Monorepo, Docker, Husky, Lint-Staged, Jest/Vitest.

## ✨ Funcionalidades Implementadas

### Essenciais

- **Gestão de Leads:** CRUD completo com validação de CPF e integração com API do IBGE para preenchimento de endereço (Estado/Cidade).
- **Gestão de Propriedades:** Cadastro de propriedades rurais vinculadas aos leads, incluindo dados de Cultura (Soja, Milho, Algodão, Café, Cana) e Área (hectares).
- **Listagem e Filtros:** Tabelas ricas com filtros globais, filtros por coluna e ordenação (client-side).

### Diferenciais e Melhorias de UX

- **Dashboard Gerencial:** Visualização gráfica de:
  - Total de Leads.
  - Leads por Status (Gráfico de Pizza).
  - Área Total por Cultura (Gráfico de Barras).
  - **Leads por Município** (Gráfico de Barras - atendendo à lacuna inicial de dados geográficos).
- **Indicador de Prioridade:** Lógica visual para destacar leads prioritários (ícone de estrela).
- **Visão Global de Propriedades:** Além do modal dentro do Lead, foi criada uma rota dedicada (`/properties`) para gestão global de todas as fazendas da carteira, permitindo responder perguntas como _"Quais são as maiores fazendas de Soja da minha base?"_.
- **Integração IBGE:** Consumo da API de Localidades do IBGE para garantir a integridade dos dados de Cidade e Estado, eliminando erros de digitação.
- **Layout Padronizado (Enterprise):** Interface limpa e consistente utilizando `p-card` e grids responsivos, com filtros avançados integrados aos cabeçalhos das colunas.

## 🛠️ Instalação e Execução

Pré-requisitos: Docker e Node.js (v18+).

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd tmdigital
   ```

2. **Suba o Banco de Dados:**

   ```bash
   docker-compose up -d
   ```

3. **Instale as Dependências:**

   ```bash
   npm install
   ```

4. **Inicie a Aplicação (Front + Back):**

   ```bash
   npx nx run-many --targets=serve --projects=backend,frontend
   ```

   - Frontend: http://localhost:4200
   - Backend: http://localhost:3000/api

5. **Rodar Testes:**
   ```bash
   npx nx run-many --target=test --projects=backend,frontend
   ```

## 🏗️ Decisões Arquiteturais e Notas

- **Gerenciamento de Estado (NgRx):** Utilizado para centralizar a lógica de Leads e Propriedades. Foi implementada uma estratégia de **clonagem mutável** (`[...data]`) nos componentes de lista para resolver conflitos entre a imutabilidade do NgRx e a ordenação interna das tabelas do PrimeNG.
- **Geometria:** O campo de geometria foi mantido como `string` (WKT/GeoJSON simples) para fins deste teste. Em um cenário real de produção, recomenda-se a migração para **PostGIS** para permitir consultas espaciais reais.
- **Banco de Dados (TypeORM):** O projeto está configurado com `synchronize: true` para facilitar a primeira execução e criação automática das tabelas. Em produção, o correto é desativar essa opção e utilizar **Migrations** para garantir o controle de versão e a integridade do esquema do banco.
- **Qualidade de Código:** Configurado pipeline de **Husky** e **Lint-Staged** para garantir que todo commit respeite as regras de linting (ESLint) e formatação (Prettier).

---

Desenvolvido com 💜 e café.
