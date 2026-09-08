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

### Phase 2 — Database & Basic APIs (database layer complete, API layer next)

- [x] Local PostgreSQL 18 installed, `roadtrip_sync_dev` database created
- [x] `drizzle-orm` + `drizzle-kit` installed (stable 0.x line)
- [x] Connection wired: `src/db/index.ts` (postgres.js driver), `drizzle.config.ts` uses validated env
- [x] Bruno collection scaffolded for all API routes
- [x] Schema in single `src/db/schema.ts` — vehicle-centric model: users, trips, vehicles, locations
- [x] Constraints: UNIQUE email + username, UNIQUE (trip_id, vehicle_id) on locations, ON DELETE cascade/restrict per FK, CHECK on trips.status
- [x] First migration generated (`drizzle/0000_mean_jean_grey.sql`) and applied
- [x] bcrypt password hashing (`utils/passwords.ts` — hash + compare helpers)
- [x] Central error-handling middleware (`middleware/error.ts` — AppError, Zod, 500 branches; mounted after router)
- [x] JWT auth middleware (`middleware/auth.ts` — Bearer verification, `req.user` typed via `src/types/express.d.ts`)
- [ ] Zod validation for every request body/param (register, login, users done — trips/vehicles/locations pending)
- [x] Rate limiting (`middleware/rateLimit.ts` — loose global limiter, strict limiter on `/api/auth`)
- [ ] Endpoints tested with Bruno (auth + users tested; trips/vehicles/locations pending)
- [ ] `build` / `start` npm scripts (needed at deployment, not before)

### Phase 3 — Users, Trips & Maps (API side)

- [x] POST /auth/register implemented (Zod validation, bcrypt hash, 201/409)
- [x] POST /auth/login implemented (401 on invalid credentials, returns signed JWT)
- [x] GET /auth/me — removed by decision: `GET /users/me` (protected) serves both profile and session check
- [x] Users: profile endpoints implemented and protected (GET + PATCH `/users/me`, self-collision guards, two-shape DTOs)
- [ ] Fix: username duplicate check missing in `createUser` (duplicate username currently returns 500 instead of 409)
- [ ] Refactor: extract `firstOrThrow` helper in `utils/` to remove repeated query + check + throw boilerplate
- [ ] Trips: create, list, update status implemented
- [ ] Vehicles: create per trip with driver assignment implemented
- [ ] Locations: driver upserts own vehicle's current location implemented

### Later (not started)

- [ ] Socket.IO real-time vehicle location broadcasting
- [ ] Trip start / end flow
- [ ] Future: passenger/member system (expenses, who paid, trip history) — only when those features are designed
