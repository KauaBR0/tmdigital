# Specification - MVP Setup

## Overview
This track implements the core functionality for the tmDigital Sales Lead Manager, including Lead and Property CRUD, a Dashboard, and a Priority Indicator system.

## Functional Requirements
- **Lead Management:**
  - Create, Read, Update, Delete leads.
  - Fields: Name, CPF (validated), Status (New, In Negotiation, Converted, Lost), Comments.
- **Property Management:**
  - Create, Read, Update, Delete properties.
  - Fields: Crop (Soy, Corn, Cotton), Area (Hectares), Geometry/Location.
  - Must be linked to a Lead.
- **Dashboard:**
  - Metrics: Total leads, status breakdown, municipality count, crop summary.
  - Interactive filters.
- **Priority System:**
  - Automated rule: Properties > 100 hectares = Priority.
  - Visual badges and filtering for priority leads.

## Technical Requirements
- **Frontend:** Angular + PrimeNG + NgRx.
- **Backend:** NestJS + TypeORM + PostgreSQL.
- **Architecture:** Monorepo (Nx), REST API.
- **Localization:** PT-BR.
