# Plan - MVP Setup

## Phase 1: Project Scaffolding [checkpoint: f9d764e]
- [x] Task: Initialize Nx Monorepo for Angular and NestJS 662b7c1
- [x] Task: Set up PostgreSQL with Docker Compose e3d71ff
- [x] Task: Configure PrimeNG and NgRx in the Angular app b9074aa
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding' (Protocol in workflow.md)

## Phase 2: Backend Development (Core API) [checkpoint: 81af74c]
- [x] Task: Create Lead and Property entities and migrations 4ae3d21
- [x] Task: Implement Lead CRUD API (with CPF validation) f7440e7
- [x] Task: Implement Property CRUD API (linked to Leads) ee0339a
- [x] Task: Implement Dashboard metrics endpoint f58a323
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Backend Development (Core API)' (Protocol in workflow.md)

## Phase 3: Frontend Development (UI & State)
- [x] Task: Implement NgRx State for Leads and Properties 010d3a6
- [x] Task: Build Lead Management UI (List, Create, Edit, Delete) 6d5dc2e
- [x] Task: Build Property Management UI (Linked to Leads) 418d56b
- [ ] Task: Implement PT-BR localization and CPF masking/validation
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Frontend Development (UI & State)' (Protocol in workflow.md)

## Phase 4: Dashboard & Priority System
- [ ] Task: Build Dashboard UI with PrimeNG Charts
- [ ] Task: Implement Priority logic (> 100ha) and visual indicators
- [ ] Task: Implement Dashboard filtering logic
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Dashboard & Priority System' (Protocol in workflow.md)
