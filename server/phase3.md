# Phase 3 — Cleanup Plan

## Step 1 — Query Helpers (DONE ✅ — services refactored onto helpers)

**Rules (locked):**
- One file per module, inside the module that owns the table
- Each helper: one query → returns **row | null** — no throw, no DTO, no business logic
- Services keep their own checks/throws — semantics stay at the call site
- Cross-module import allowed: `import { findUserByEmail } from "../users/user.queries.js";`

### `modules/users/user.queries.ts`

| Helper | Signature | Used by |
| ------ | --------- | ------- |
| `findUserByEmail` | `(email: string) => user \| null` | `createUser` (conflict check), `authenticateUser` (login lookup) |
| `findUserByUsername` | `(username: string) => user \| null` | `createUser` (conflict check) |
| `findUserById` | `(userId: number) => user \| null` | `getUserDetailsById`, `updateUser` |

### `modules/trips/trip.queries.ts`

| Helper | Signature | Used by |
| ------ | --------- | ------- |
| `findTripById` | `(tripId: number) => trip \| null` | `getTripById`, `updateTrip`, `deleteTrip` |

### `modules/vehicles/vehicle.queries.ts`

| Helper | Signature | Used by |
| ------ | --------- | ------- |
| `findVehicleById` | `(vehicleId: number) => unit \| null` | `updateVehicle`, `deleteVehicle` |
| `findUnitByTripAndDriver` | `(tripId, driverId) => unit \| null` | `joinTrip` (double-join check), `getTripById` (membership test), `upsertVehicleLocation` (own-unit lookup) |

Then refactor the call sites in `auth.service`, `user.service`, `trip.service`, `vehicle.service`, `location.service` — checks and throws stay untouched.

## Step 2 — Naming / DTO consistency (after queries)

- `getTripLocation` → `getTripLocations` (plural — it returns a list)
- `location.controller.ts`: namespace-import `locationService` like other controllers
- Remove stale `// TODO` comments on finished functions
- `updateVehicle` service: `type: string` param → `UpdateVehicleInput` type from schema

## Step 3 — QA findings to decide/fix (from testing week)

- Creator loses GET access to their own trip after deleting their own unit
- Location updates currently allowed on `planned` / `completed` trips — decide the rule
- Joining a **completed** trip currently succeeds — decide the rule

## Step 4 — Socket.IO block (after code cleanup closes)

Socket auth (JWT), trip rooms, vehicle location broadcast, reconnection handling.
