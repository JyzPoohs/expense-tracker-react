# TorchEye Ledger — Frontend

React SPA for a personal finance management application. Communicates with the Spring Boot backend via JWT-authenticated REST calls. Authentication is delegated to Keycloak using PKCE flow.

> **Repositories:** [Frontend](https://github.com/JyzPoohs/expense-tracker-react) · [Backend](https://github.com/JyzPoohs/expense-tracker) · [Infrastructure](https://github.com/JyzPoohs/expense-tracker-infra)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui (Radix UI primitives) |
| Charts | Recharts |
| Tables | TanStack Table v8 |
| Auth | Keycloak JS (PKCE flow) |
| HTTP Client | Axios |
| Form Validation | Zod |
| Routing | React Router v7 |
| Date Utilities | date-fns + react-day-picker |
| Notifications | Sonner (toast) |
| Icons | Lucide React |
| Font | Geist Variable |

---

## Project Structure

```
src/
├── api/              # Axios instance with auth interceptors
├── auth/             # Keycloak config and AuthProvider
├── components/
│   ├── common/       # Reusable primitives (SearchBar, DatePicker, Select)
│   ├── dashboard/    # BarChart, PieChart components
│   ├── layouts/      # AppSidebar, Header, DataTable, ProtectedLayout
│   ├── transaction/  # Create, Edit, View dialogs + TransactionForm
│   ├── summary/      # SummaryCard
│   └── ui/           # shadcn generated components
├── config/           # Static configuration (chart config, sidebar items, etc.)
├── hooks/            # Data-fetching hooks (useTransactions, useDashboard, useCategories)
├── pages/
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── transaction/TransactionList.tsx
│   └── settings/Settings.tsx, CategoriesSettings.tsx
├── routes/           # AppRoutes with protected route wrappers
├── services/         # API call functions per domain
├── types/            # TypeScript interfaces
└── utils/            # Date helpers, icon mapper
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | Summary cards + 6-month bar chart + monthly expense pie chart |
| `/transactions` | Transaction List | Filterable data table with full CRUD dialogs |
| `/settings` | Settings | Tab-based settings shell |
| `/settings/categories` | Category Settings | View system and custom categories |
| `/profile` | Profile | User profile view |

---

## Completed Features

- [x] Keycloak PKCE authentication with silent token refresh
- [x] Protected routing — unauthenticated users redirected to Keycloak login
- [x] Auto user provisioning on first login
- [x] Transaction list with filters: type, category, month/year
- [x] Create, view, edit, delete transactions via modal dialogs
- [x] Dashboard: 6-month income vs expense bar chart
- [x] Dashboard: Current month expense breakdown pie chart
- [x] Dashboard: Summary cards (total income, total expense, net balance)
- [x] System categories + user custom categories
- [x] Category settings page
- [x] Responsive sidebar layout with mobile sheet
- [x] Dark / light theme toggle
- [x] Toast notifications for all CRUD operations
- [x] TypeScript strict typing throughout

---

## Roadmap

### Phase 2 — Budget Management UI
- [ ] Budget configuration page (set monthly limits per category)
- [ ] Budget progress bars on Dashboard
- [ ] Over-budget visual alerts

### Phase 3 — Category Management (Write)
- [ ] Create / edit / delete custom categories (currently read-only)
- [ ] Per-category color picker and icon selector

### Phase 4 — Search & Export
- [ ] Full-text search across transaction notes and remarks
- [ ] Arbitrary date range picker
- [ ] Export transactions to CSV

### Phase 5 — AI Financial Advisor UI
- [ ] Dedicated "Insights" page
- [ ] Monthly AI analysis panel with per-category breakdown and savings suggestions
- [ ] Proactive alerts for budget overruns or unusual spending patterns

### Phase 6 — UX Improvements
- [ ] Pagination or infinite scroll on transaction list
- [ ] Skeleton loaders during data fetch
- [ ] Empty state illustrations
- [ ] Edit history on transaction detail view

### Phase 7 — Testing
- [ ] Unit tests for hooks and utility functions (Vitest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright)

---

## Local Development

### Prerequisites

- Node.js 20+
- Keycloak and MySQL running (see [infrastructure repo](https://github.com/JyzPoohs/expense-tracker-infra))
- Backend API running (see [backend repo](https://github.com/JyzPoohs/expense-tracker))

### Setup

```bash
cp .env.example .env
# Fill in your local Keycloak and API URLs

npm install
npm run dev
```

App runs at `http://localhost:5173`.

### Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL (e.g. `http://localhost:8081`) |
| `VITE_KEYCLOAK_URL` | Keycloak server URL (e.g. `http://localhost:8080`) |
| `VITE_KEYCLOAK_REALM` | Keycloak realm name |
| `VITE_KEYCLOAK_CLIENT_ID` | Keycloak client ID |

### Build

```bash
npm run build
```

Output in `dist/`.
