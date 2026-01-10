# Initial Concept

**Goal:** Create a CRUD application for "tmdigital" to help an agricultural inputs distributor in Minas Gerais manage sales leads and their rural properties (Soy, Corn, Cotton).

**Core Features:**
-   **Lead Management:** Register, list (with filters), edit, and remove leads (Name, CPF, Status, Comments).
-   **Property Management:** Register, list, edit, and remove rural properties linked to leads (Crop, Area, Geometry).
-   **Dashboard (Bonus):** Basic metrics (Total leads, Status breakdown, Municipality).
-   **Priority Indicator (Bonus):** Visual cue for large properties (> 100 ha).

**Tech Stack Requirements:**
-   Frontend: Angular + PrimeNG
-   Backend: NestJS + TypeORM + PostgreSQL

# Product Guide - tmDigital Sales Lead Manager

## Product Vision
To provide a centralized platform for agricultural input distributors to efficiently manage sales leads and rural properties. The application empowers sales teams to move beyond their existing client base, prioritize potential leads through data-driven insights, and maintain a clear history of lead interactions.

## Target Users
- **Sales Team & Managers:** Primary users who manage the lead pipeline and analyze performance metrics.
- **Farmers (Leads):** Stakeholders whose data and property information are the core of the system.

## Primary Goals
- **Lead Optimization:** Enable the sales team to discover and prioritize new leads efficiently.
- **Centralized Management:** Organize leads and rural properties in a single, accessible database.
- **Visual Insights:** Provide a dashboard with metrics and visual indicators for better decision-making.

## Core Features
- **Lead CRUD:** Full management of lead profiles (name, CPF, status, and history).
- **Rural Property Management:** Registration and tracking of crops (soy, corn, cotton) and land area.
- **Management Dashboard:** A summary view of total leads and status metrics.
- **Priority System:** Visual tagging and filtering for properties > 100 hectares, with dedicated dashboard highlights.

## Future Roadmap
- **Expansion:** Support more crops and geographic regions beyond Minas Gerais (MG).
- **Integration:** Connect with external APIs for agricultural market data or geographical mapping.