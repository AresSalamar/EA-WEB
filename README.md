<!-- File: README.md -->
# Astara Retail Perú Showroom & Vehicle Inventory Management

## Overview
This is a Single Page Application (SPA) developed for Astara Retail Perú (`ea8168u202417747`). It provides structured digital tools to efficiently manage the capacity of their exhibition rooms (showrooms), monitor vehicle stock lots by category, and assign vehicle models from the external catalog to specific showroom sections.

## Authorship
* **Author:** Kevin Junior Salazar Marquina
* **Student Code:** u202417747
* **GitHub Private Repository:** https://github.com/aressalamar/aressalamar-ea-web

## Description
The application is architected following Domain-Driven Design (DDD) principles with a layered and component-based structure across three bounded contexts:
* **`shared`**: Reusable API/Endpoint infrastructure (`BaseApi`, `BaseEndpoint`) and global layout components (`Layout`, `LanguageSwitcher`, `Home`, `PageNotFound`).
* **`showroom`**: Domain entities (`ShowroomSection`, `VehicleInventoryItem`), assemblers, fake API gateway, Pinia state store with analytical calculations (`filter`, `reduce`, `Intl.NumberFormat`), and presentation views/components.
* **`vehicles`**: Integration with the external DummyJSON Vehicles API (`Vehicle` entity, `VehicleAssembler`, `VehiclesApi`, and `useVehiclesStore`).

## Stack
* **Language:** JavaScript (ES6+ Object-Oriented)
* **Frontend Framework:** Vue 3 (`^3.5.43` with Composition API)
* **Build Tool:** Vite
* **UI Component Library:** PrimeVue (Material Design Preset) + PrimeFlex + PrimeIcons
* **State Management:** Pinia
* **Routing:** Vue Router (with semantic & child routes)
* **Internationalization:** Vue I18n (`en` default, `es` supported)
* **HTTP Client:** Axios
* **Mock Backend:** JSON Server (`0.17.4`)

## Configuration & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Fake API (`json-server`)
```bash
cd server
npx json-server --watch db.json --port 3000
```
*Endpoints exposed:*
* `http://localhost:3000/showroom-sections`
* `http://localhost:3000/vehicle-inventory-items`

### 3. Start the Development Server
```bash
npm run dev
```
