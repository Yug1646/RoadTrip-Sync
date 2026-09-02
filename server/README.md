# RoadTrip Sync — Server

Node.js + TypeScript REST API for RoadTrip Sync.

## Requirements

- Node.js >= 22
- PostgreSQL (local, needed from Phase 2)

## Progress Tracker

### Phase 1 — Project Setup

- [x] Folder structure (module-based)
- [x] `.gitignore` protects `.env` and `node_modules/`
- [ ] `.nvmrc` + `engines` field in `package.json`
- [ ] npm scripts (`dev` / `build` / `start`)
- [ ] Install `express`, `dotenv`, `tsx`
- [ ] `src/config/env.ts` — typed env vars, validated with Zod
- [ ] `app.ts` + `server.ts` wired up
- [ ] `GET /health` returns JSON
- [ ] Verify `tsconfig.json`
- [ ] First commit

### Phase 2 — Database & Basic APIs

- [ ] Local PostgreSQL setup
- [ ] Drizzle ORM + `drizzle-kit` config
- [ ] Schema: users, trips, trip_members, vehicles, locations
- [ ] Constraints: UNIQUE email + username, UNIQUE (trip_id, user_id) on trip_members and locations, FK delete behaviour
- [ ] Migrations generated and applied
- [ ] bcrypt password hashing
- [ ] JWT auth + auth middleware
- [ ] Zod validation for every request body/param
- [ ] Central error-handling middleware
- [ ] Rate limiting
- [ ] Endpoints tested with Bruno

### Phase 3 — Users, Trips & Maps (API side)

- [ ] POST /auth/register, POST /auth/login
- [ ] Users: profile endpoints
- [ ] Trips: create, list, update status
- [ ] Vehicles: create per trip
- [ ] Members: join, list, assign vehicle
- [ ] Locations: upsert current location per trip member

### Later (not started)

- [ ] Socket.IO real-time location broadcasting
- [ ] Trip start / end flow
