# TorchEye Ledger — Frontend

React SPA for a personal finance management application. Communicates with the Spring Boot backend via JWT-authenticated REST calls. Authentication is delegated to Keycloak using PKCE flow.

> **Repositories:** [Frontend](https://github.com/JyzPoohs/expense-tracker-react) · [Backend](https://github.com/JyzPoohs/expense-tracker) · [Infrastructure](https://github.com/JyzPoohs/expense-tracker-infra)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
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
├── api/              # Axios instance with auth + global error interceptors
├── auth/             # Keycloak config and AuthProvider
├── components/
│   ├── common/       # Reusable primitives (SearchBar, DatePicker, Select)
│   ├── dashboard/    # BarChart, PieChart components
│   ├── layouts/      # AppSidebar, Header, DataTable, ProtectedLayout
│   ├── transaction/  # Create, Edit, View dialogs + TransactionForm
│   ├── summary/      # SummaryCard
│   └── ui/           # shadcn generated components
├── config/           # Static config (chart config, sidebar items)
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
- [x] Global 401/403/500 error handling via Axios response interceptor
- [x] Transaction list with filters: type, category, month/year
- [x] Create, view, edit, delete transactions via modal dialogs
- [x] Dashboard: 6-month income vs expense bar chart
- [x] Dashboard: Current month expense breakdown pie chart
- [x] Dashboard: Summary cards (total income, total expense, net balance)
- [x] Dashboard data loaded in parallel (`Promise.all`)
- [x] System categories + user custom categories (read-only settings page)
- [x] Responsive sidebar layout with mobile sheet
- [x] Dark / light theme toggle
- [x] Toast notifications for all CRUD operations
- [x] TypeScript strict typing throughout

---

## Roadmap

### Sprint 2 — Feature Completion *(current)*
- [ ] Budget configuration page (set monthly limits per category)
- [ ] Budget progress bars on Dashboard
- [ ] Over-budget visual alerts

### Phase 3 — Category Management (Write)
- [ ] Create / edit / delete custom categories from Settings UI (KAN-85)
- [ ] Per-category color picker and icon selector (KAN-50)

### Phase 4 — Search & Export
- [ ] Full-text search across transaction notes and remarks
- [ ] Arbitrary date range picker (KAN-70)
- [ ] Export transactions to CSV (KAN-71)

### Phase 5 — AI Financial Advisor UI
- [ ] Dedicated "Insights" page
- [ ] Monthly AI analysis panel with per-category breakdown and savings suggestions
- [ ] Proactive alerts for budget overruns or unusual spending patterns

### Phase 6 — UX Improvements
- [ ] Pagination on transaction list (KAN-69)
- [ ] Skeleton loaders during data fetch (KAN-72)
- [ ] Empty state illustrations

### Phase 7 — Testing
- [ ] Unit tests for hooks and utility functions (Vitest) (KAN-74)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright) (KAN-75)

---

## Local Development

### Prerequisites
- Node.js 20+
- Keycloak and MySQL running — see [infrastructure repo](https://github.com/JyzPoohs/expense-tracker-infra)
- Backend API running — see [backend repo](https://github.com/JyzPoohs/expense-tracker)

### Setup

```bash
cp .env.example .env
# Edit .env with your local values

npm install
npm run dev
```

App runs at `http://localhost:5173`.

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:1331` | Backend API base URL |
| `VITE_KEYCLOAK_URL` | `http://localhost:1880` | Keycloak server URL |
| `VITE_KEYCLOAK_REALM` | `expense-realm` | Keycloak realm name |
| `VITE_KEYCLOAK_CLIENT_ID` | `expense-client` | Keycloak client ID |

### Build

```bash
npm run build
```

Output in `dist/`.
