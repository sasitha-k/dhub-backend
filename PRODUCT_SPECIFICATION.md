# Product Specification: Driver Hub

| Field                    | Value                                                                            |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Product name**         | Driver Hub                                                                       |
| **Repository / package** | `dhub-backend` (npm: `driver-hub`)                                               |
| **Document version**     | 1.0                                                                              |
| **Scope**                | Web admin application (Next.js) and its integration with the Driver Hub REST API |

---

## 1. Executive summary

**Driver Hub** is an internal operations console for a vehicle-hire / chauffeur business. Staff use it to manage **bookings**, **customers**, **drivers**, **pricing packages**, and **financial balances** (customer credit and driver settlements). The application is a **Next.js** single-page-style admin UI that authenticates operators and calls a **remote REST API** for all business data and transactions.

This specification describes the product as implemented in this repository (frontend + Next API routes), not the backend service implementation, which lives behind configurable API base URLs.

---

## 2. Problem statement and goals

### 2.1 Problems addressed

- Centralize day-to-day scheduling and assignment: who drives whom, when, and under which tariff.
- Track **day vs night** operations (distinct package categories and booking views).
- Maintain a **customer directory** and support **credit / post-paid** flows (balances owed to the company).
- Maintain a **driver roster** (including employment type), **leave**, **expenses**, and **balance** adjustments.
- Standardize **packages** (tariffs) with multiple product shapes (time-based, distance, airport, custom, etc.).

### 2.2 Success criteria (product-level)

- Operators can create, edit, filter, and delete bookings for a chosen date.
- Operators can run the booking lifecycle: start, complete, cancel; optionally create **credit** bookings without the full start/complete flow.
- Operators can manage customers and drivers with search and summary metrics on list pages.
- Operators can view and act on **customer balances** (credit hires) and **driver balances / leaves / expenses**.
- Packages can be created and edited with category-specific pricing fields and an **available / unavailable** flag.

---

## 3. Target users and personas

| Persona                     | Needs                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Dispatcher / operations** | Create and edit bookings, assign drivers and packages, filter by day/night/unassigned, change status. |
| **Finance / admin**         | Customer balances, settlements, consolidated invoicing hooks, driver expenses and balance top-ups.    |
| **Fleet / HR (light)**      | Driver master data, part-time vs full-time view, driver leave records.                                |
| **System admin**            | Login, secure sessions; (planned) roles and settings—see §8.                                          |

---

## 4. Product scope (in scope)

### 4.1 Authentication and session

- **Login** with username and password against `POST /login`.
- **JWT** stored in a cookie (`token`, 7-day expiry; `Secure` in production, `SameSite=strict`).
- **Middleware**: unauthenticated users are redirected to `/login`; authenticated users hitting `/login` are redirected to `/booking`.
- Optional feature flag in config: `NEXT_PUBLIC_GLOBAL_AUTH` (defaults off in code).

### 4.2 Bookings (`/booking`, default landing after `/`)

- **List** bookings with server-side filtering by **date** (default: today).
- **Tabs**: day-time, night-time, unassigned (derived from `selectedPackage.packageCategory`).
- **Search** over the loaded result set (client-side filtering via shared search component).
- **CRUD**: create, read, update, delete via `/booking` endpoints.
- **Lifecycle**: `POST /booking/start`, `POST /booking/complete`, `POST /booking/cancel`.
- **Credit booking**: `POST /booking/credit` for completed-style credit entries with fee (skips normal start/complete).
- **Detail route**: `/booking/[bookingId]` for single booking view.
- **Payment-oriented fields** in the booking form (e.g. payment method, cash amount, completion flag) aligned with API payloads.

### 4.3 Customers (`/customers`)

- **Directory** with create/edit modal workflow.
- **Search** across name, email, mobile, address.
- **Summary cards**: totals and counts (e.g. records with email / address).

### 4.4 Customer balances & credit hires (`/customer-balances`, `/credit-hires`)

- **Balances list** from `GET /customers/balances` with optional filters (first name, last name, email, mobile).
- Display **amounts owed** to the company (e.g. `customerOwesCompany`), totals, sort by amount.
- **Settlement**: `POST /drivers/customer/settlement` with `customerId` and `amount`.
- **Customer detail modal**: booking history and related actions (per `CustomerDetailModal` / hooks).

_Note:_ The app sidebar may emphasize `/customers` → “Balances”; `/credit-hires` is implemented as a dedicated area for credit-style customer debt views.

### 4.5 Drivers (`/drivers`)

- **Directory** with create/edit modal workflow.
- **Search** across name, contact, license number.
- **Summary cards**: total drivers, part-time vs full-time (`employmentType`).

### 4.6 Driver operations

- **Driver balances** (`/driver-balances`): list balances; add balance and record **expenses** (`POST /drivers/balance`, `POST /drivers/expenses`).
- **Driver leaves** (`/driver-leaves`): list from `GET /drivers/leaves`.
- **History**: booking history and broader driver history via dedicated API hooks (`/driver/booking-history`, `/driver/history`).

### 4.7 Packages (`/packages`)

- **List** with day/night tabs and search on package name.
- **Statistics**: total / available / unavailable counts from `isAvailable`.
- **Create / edit** sheet form with:
  - **Category** (e.g. day vs night groupings used elsewhere).
  - **Type-specific tabs**: day time, night distance, night hourly, airport drop, long trip, custom (separate tab components).
  - **Availability** toggle (`isAvailable`).
- API: `GET /packages`, `POST /package`, `PUT /package`.

### 4.8 Invoicing (client + Next API)

- **Consolidated invoice** creation: `POST /invoice/consolidated` with `bookingIds` and optional `previousAmount`.
- **PDF proxy download**: Next route `GET /api/invoice/download?url=...&filename=...` fetches a remote PDF and returns it as an attachment (used to avoid browser/CORS issues with external invoice URLs).

### 4.9 Supporting UX

- **Branding**: company name and logo from `NEXT_PUBLIC_COMPANY_NAME`, `NEXT_PUBLIC_COMPANY_LOGO`.
- **Layout**: collapsible sidebar (“Driver hub”), breadcrumbs via `BreadcrumbProvider`.
- **Theme**: light/dark toggle (`next-themes`).
- **Responsive / tablet**: sidebar collapse behavior, touch targets—see `TABLET_OPTIMIZATION.md`.

---

## 5. Product scope (out of scope or placeholder in this repo)

The following appear **minimal, stubbed, or missing routes** relative to navigation or files in the tree:

| Area                                             | Current state                                                                                             |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| **Reports** (`/reports`)                         | Placeholder UI (“Reports” label only).                                                                    |
| **Billing** (`/billing`)                         | Placeholder UI.                                                                                           |
| **Roles** (`/roles`), **Settings** (`/settings`) | Linked from sidebar **without** matching `app/` routes in this repository (likely 404 until implemented). |
| **Users** (`/users`), **Riders** (`/riders`)     | Pages exist; main nav entries are **commented out** in the sidebar.                                       |
| **Credit Hires**                                 | Commented out as a top-level nav item; functionality overlaps with customer balances / dedicated pages.   |

Backend business rules, validation, and persistence are **not defined here**; they belong to the API service behind `NEXT_PUBLIC_API_URL` / configured hosts.

---

## 6. Technical architecture

### 6.1 Stack

- **Framework**: Next.js (App Router), React 19.
- **Styling**: Tailwind CSS, Radix UI primitives, MUI date pickers (where used).
- **HTTP**: Axios (`authInstance` for authenticated calls; separate `instance` for configurable base URL in some paths—see §6.3).
- **Auth token**: `js-cookie` / cookies for client middleware alignment.

### 6.2 External API (conceptual)

The UI expects a REST API exposing routes including (non-exhaustive):

- `/login`, `/bookings`, `/booking`, `/booking/start`, `/booking/complete`, `/booking/cancel`, `/booking/credit`
- `/customers`, `/customers/balances`, `/customer/booking-history`
- `/drivers`, `/drivers/balances`, `/drivers/leaves`, `/drivers/expenses`, `/drivers/balance`, `/driver/booking-history`, `/driver/history`
- `/drivers/customer/settlement`
- `/packages`, `/package`
- `/invoice/consolidated`

Authenticated requests send `Authorization: Bearer <token>`.

### 6.3 Configuration

| Variable / config key                                  | Purpose                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`                                  | Primary API base URL (`src/utils/config.js` → used by `instance`). |
| `NEXT_PUBLIC_GLOBAL_AUTH`                              | Optional global auth behavior flag.                                |
| `NEXT_PUBLIC_COMPANY_NAME`, `NEXT_PUBLIC_COMPANY_LOGO` | White-label header/branding.                                       |

**Implementation note:** `authInstance` currently uses a **hardcoded** `baseURL` in code; operations environments should align this with `NEXT_PUBLIC_API_URL` to avoid split-brain API hosts.

### 6.4 Security and compliance (high level)

- Cookie-based session for operators; HTTPS-only cookie flag in production.
- Middleware enforces login for all matched paths except static assets and Next internals; `/document` is allowed without redirect (custom rule).
- Invoice download route performs **server-side fetch** of user-supplied URLs—this should be **allowlisted** or restricted in production to prevent SSRF abuse (product risk to track).

---

## 7. Non-functional requirements

| Category            | Requirement                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Performance**     | List pages load data on mount / filter change; booking list refetches on date change. Package API client timeout configured (e.g. 120s) for heavy operations. |
| **Usability**       | Search on major directories; status badges and filters on bookings; modal/sheet patterns for create-edit.                                                     |
| **Accessibility**   | Radix-based components; sidebar toggle with `aria-label`. Further a11y audit not implied by code alone.                                                       |
| **Maintainability** | Feature hooks under `src/hooks/*`, API modules under `src/api/*`, shared UI under `src/components/*`.                                                         |

---

## 8. Roadmap hints (from codebase)

1. **Reports**: real reporting views and exports (PDF/CSV) backed by API endpoints.
2. **Billing**: invoices list, payment status, reconciliation UI.
3. **Roles & settings**: implement `/roles` and `/settings` and enforce permissions server-side.
4. **API client unification**: single axios instance driven entirely by env-based `baseURL`.
5. **Hardening**: SSRF protection on `/api/invoice/download`; centralized API error handling and session expiry UX.

---

## 9. Glossary

| Term                               | Meaning                                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Booking**                        | A scheduled job: customer, optional driver, optional package, date/time, status, fees/payment. |
| **Package**                        | A priced service template (duration, distance, airport, etc.) with day/night categorization.   |
| **Credit booking**                 | A booking created in “credit” mode via API, typically without the normal start/complete flow.  |
| **Customer balance / credit hire** | Amount a customer owes the company; settlements reduce balance.                                |
| **Driver balance / expense**       | Financial adjustments for a driver (payouts, deductions, expenses).                            |

---

## 10. Document maintenance

- **Owner**: product/engineering team for Driver Hub.
- **Update when**: major new modules ship, API contracts change, or nav/feature flags change.
- **Source of truth for UI behavior**: `src/app/**`, `src/api/**`, `src/hooks/**`, `src/middleware.js`.
