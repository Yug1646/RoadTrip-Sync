# RoadTrip Sync — Server

Node.js + TypeScript REST API for RoadTrip Sync.

Product model: the **vehicle** is the tracked unit. Drivers are app users; passengers have no accounts. See the root README for the full concept.

## Requirements

- Node.js >= 22 (see `.nvmrc`)
- PostgreSQL (local, needed from Phase 2)

## Setup

```powershell
npm install
npm run dev          # starts API with tsx watch (reads .env, PORT from env)
npm run db:generate  # drizzle-kit: generate SQL migrations from schema
npm run db:migrate   # drizzle-kit: apply migrations to the database
npm run db:studio    # drizzle-kit: browse database in browser GUI
```

API test collection lives in the root `collection/` folder (Bruno / OpenCollection).

## Progress Tracker

### Phase 1 — Project Setup (complete)

- [x] Folder structure (module-based)
- [x] `.gitignore` protects `.env` and `node_modules/`
- [x] `.nvmrc` + `engines` field in `package.json`
- [x] `src/config/env.ts` — typed env vars, validated with Zod, fail-fast on missing values
- [x] Install `express`, `dotenv`, `tsx`, `zod`
- [x] `app.ts` + `server.ts` wired up, feature routes mounted through central `routes.ts`
- [x] `GET /health` returns JSON
- [x] `tsconfig.json` verified (tsc clean)
- [x] GitHub repo connected, code pushed

### Phase 2 — Database & Basic APIs (complete)

- [x] Local PostgreSQL 18 installed, `roadtrip_sync_dev` database created
- [x] `drizzle-orm` + `drizzle-kit` installed (stable 0.x line)
- [x] Connection wired: `src/db/index.ts` (postgres.js driver), `drizzle.config.ts` uses validated env
- [x] Bruno collection scaffolded for all API routes
- [x] Schema in single `src/db/schema.ts` — vehicle-centric model: users, trips, vehicles (mode-based: `type`, no name column), locations
- [x] Constraints: UNIQUE email + username, UNIQUE join_code, UNIQUE (trip_id, vehicle_id) on locations, ON DELETE cascade/restrict per FK, CHECK on trips.status
- [x] Database reset + fresh baseline migration (`drizzle/0000_doctor_doom.sql`) applied — dev data intentionally wiped
- [x] bcrypt password hashing (`utils/passwords.ts` — hash + compare helpers)
- [x] Central error-handling middleware (`middleware/error.ts` — AppError, Zod, 500 branches; mounted after router)
- [x] JWT auth middleware (`middleware/auth.ts` — Bearer verification, `req.user` typed via `src/types/express.d.ts`)
- [x] Zod validation for every request body/param — all endpoints (register, login, users, trips, vehicles, locations)
- [x] Rate limiting (`middleware/rateLimit.ts` — loose global limiter, strict limiter on `/api/auth`)
- [x] Endpoints tested with Bruno — all 21 endpoints across auth, users, trips, vehicles, locations
- [ ] `build` / `start` npm scripts (needed at deployment, not before)

### Phase 3 — Cleanup, QA & Real-Time (complete — Socket.IO moved to Phase 4)

**Build — all service/controller functions (complete):**

- [x] POST /auth/register implemented (Zod validation, bcrypt hash, 201/409)
- [x] POST /auth/login implemented (401 on invalid credentials, returns signed JWT)
- [x] GET /auth/me — removed by decision: `GET /users/me` (protected) serves both profile and session check
- [x] Users: profile endpoints implemented and protected (GET + PATCH `/users/me`, self-collision guards, two-shape DTOs)
- [x] Fix: username duplicate check in `createUser` (409)
- [x] Trips module: create (transaction: trip + creator's unit + generated join code, born `planned`), list (created **and** joined), get by id (members-only), update (name/status/locations), delete (204; **active trips → 409**; creator-only with existence-hiding 404s)
- [x] Trips: join-by-code flow — `POST /trips/join` (code → 404, double-join → 409); `GET /trips` includes joined trips
- [x] Vehicles: **mode-based units** (`type`: car / motorcycle / public_transport / walk / other — no name column). Decision: **no add endpoint** — `POST /trips/join` creates the unit. Implemented + tested: list (members-only), update (driver-only), delete (driver-only; blocked while trip is active); authMiddleware applied
- [x] Locations: driver upserts own unit's current location (ON CONFLICT upsert; one row per unit per trip), list units + positions for the map (members-only; not-started units return `null` coords)

**QA & Cleanup (complete):**

- [x] Query helper extraction (`user.queries.ts`, `trip.queries.ts`, `vehicle.queries.ts` — per-module placement; services refactored onto them)
- [x] Full-backend QA pass — all endpoints tested across inputs, messages, status codes, edge states (member/non-member, planned/active/completed); findings fixed during the pass
- [x] Full code review of all modules — findings became shipped rules (roster in trip details, completed-trip freeze, join rules, creator-unit guard)
- [x] Vehicle rule shipped: mode changes frozen once a trip is `completed` (planned/active = editable, completed = frozen)
- [x] Known debt — fully resolved: creator-access edge fixed, location sharing gated to `active` only, joining `completed` trips blocked, minor naming items cleaned
- [ ] Query helper extraction (`user.queries.ts`, `trip.queries.ts`, ... — per-module placement)
- [ ] Naming and DTO consistency pass

**Phase 4 — React Native (Expo) + TypeScript + Socket.IO**, built together: the mobile app consumes the REST API, and the real-time layer (socket auth via JWT, trip rooms, vehicle location broadcast, reconnection) is implemented alongside it.

### Later (not started)

- [ ] Trip start / end flow refinements
- [ ] Future: passenger/member system (expenses, who paid, trip history) — only when those features are designed
- [ ] Future: garage — reusable personal vehicles per user + trip participation roster (this deliberately brings back a `trip_members`-style table when designed)
