# RoadTrip Sync — Mobile

React Native + TypeScript app built with **Expo Router**. This is the Phase 4+ frontend for the RoadTrip Sync backend (`../server`).

## Tech Stack

- React Native + TypeScript (strict mode)
- Expo Router (file-based routing, tabs + stack)
- Expo Secure Store (auth token — Phase 5)
- Mappls SDK (maps — needs a development build, not Expo Go)
- socket.io-client (live locations — Phase 6)

## Current State

- Theme system in `src/constants/theme.ts`: brand palette (navy `#0F2942` / orange `#FF6B35` / teal `#2A7B9B`), typography tokens (Plus Jakarta Sans, loaded in root layout), spacing, radii, and shared `globalStyles` (text roles `h1`/`h2`/`h3`/`body`/`caption`/`link`, card, primary button). Screens never hardcode fonts — they use style roles.
- Shared components: `PrimaryButton` (label / onPress / icon), `TripCard` (status-aware trip card), `FilterChips` (status filter row), `AppHeader` (logo + title + avatar for custom screens).
- Welcome + Auth complete (`/auth` — single route, Log In / Sign Up is in-screen state, not navigation).
- **Home** = live dashboard: real active trips from `GET /api/trips` (empty state with Start a Trip action), Start a Trip card, Join-by-code input, CTA banner. Refreshes on focus + pull-to-refresh.
- **Trips** = full library: **real trips from `GET /api/trips`**, search + status chips (composed filters, derived from state), empty state. Refreshes on focus + pull-to-refresh.
- **Profile** = identity block, telemetry stats (Active Vehicles derived from *static* trip data — migration pending), convoy preferences list, Log Out (clears token, real).
- **Create Trip** (`/trip/create`): **real** — `POST /api/trips` with the Zod-schema payload (name, startLocation, endLocation, type from mode chips), conditional Transit Name field, reveals the **server-generated join code** (`utils/joinCode.ts` retired).
- **Join Trip** (`/trip/join`): 6-box code input (array state + refs: auto-advance, backspace-to-previous, paste support), verified trip preview (still static — real `POST /api/trips/join` is the next task), 2-col travel-mode grid, vehicle nickname → `router.replace("/trip/details")`. Receives a pre-filled code from Home's Join card via **navigation params** (`useLocalSearchParams`).
- Auth transition: login/signup ends with `router.dismissAll()` + `router.replace("/home")` so Home becomes the stack root — back-swipe can never reveal Welcome.
- **Auth is real**: register/login hit the backend (`/api/auth/*`), the JWT is stored via `services/token.ts` (SecureStore on native, localStorage on web — SecureStore has no web implementation), and `apiFetch` auto-attaches `Authorization: Bearer <token>` to every request.
- **Route protection**: root layout boot-gates on a `loadToken()` read (no flash of wrong screen), then a guard effect enforces the rules on every navigation — no token + protected route → `/auth`; token + public route → `/home`. Log Out clears the token and returns to Welcome.
- Tab bar (Home / Trips / Profile) with brand tints, render-prop icons, logo + avatar header on all tabs.
- Brand asset bundled: `assets/images/appLogo.png` (header logo). App icon / splash / favicon still pending 1024×1024 export — required before first EAS build.
- Layout convention: tab screens use the native header; **custom screens use `SafeAreaView` → `KeyboardAvoidingView` → `ScrollView`** (keyboard-safe, notch-safe).
- Stubs remaining: `trip/details`, `trip/live-map`.
- Data fetching pattern: tab screens load via `useFocusEffect` (refetch on every focus) + `RefreshControl` pull-to-refresh; action screens fetch in event handlers. All requests flow through `services/api.ts`.

## Phase 4 Plan

1. [x] Scaffold Expo project (`src/app/` routing structure)
2. [x] Clean template demo content
3. [x] Theme — navy/orange palette, tokens + globalStyles in `src/constants/theme.ts`
4. [x] Screen tree — Welcome, Auth (login/signup), Tabs (Home/Trips/Profile), Trip screens (create/join/details/live-map) — stubs with real navigation
5. [x] `src/services/api.ts` — fetch wrapper reading `EXPO_PUBLIC_API_URL`
6. [x] `.env` — `EXPO_PUBLIC_API_URL` (localhost for web, LAN IP for phone)
7. [x] Milestone: call `GET /health` from the app and render the response

## Phase 5 Plan (exam season — low-intensity)

The original "fake auth" plan was superseded — the auth flow went **real** early (backend + persistent token + route protection), and dynamic trips read/create went live. `utils/joinCode.ts` and `data/trips.ts` are retired or pending retirement.

Remaining: join trip → real `POST /api/trips/join`; then `trip/details`, `trip/live-map` (Mappls + sockets defer to Phase 6; a static shell is the option on the table).

## Phase 6 Plan (November)

Static → dynamic: swap mock data for real API calls (auth first, then trips, then vehicles/locations). Add Socket.IO live locations and the Mappls map — both require a **development build** (`eas build --profile development`), Expo Go cannot load them.

## Notes

- `app/` is the reserved Expo Router directory (routes only). Everything else lives in `src/`.
- Layouts: root `_layout.tsx` (fonts + stack, wraps everything), `(tabs)/_layout.tsx` (bottom tab bar), `auth/` and `trip/` currently rely on the root stack.
- Auth is a single route: `app/auth/index.tsx` → `/auth`. Log In / Sign Up switching is component state, not navigation. Validation is real (server-side Zod + case-insensitive email lookup; frontend pre-checks mirror the schema).
- Shared mode options live in `src/constants/modes.ts` (UI label ↔ backend enum mapping) — single source for create + join screens.
- Home shows active trips only; Trips is the searchable full library. Filter/search results are always derived from state, never stored.
- `.env` convention: **origin only** (`http://<LAN-IP>:8080`), paths carry their own prefixes (`/health` at root, `/api/...` under the router). The LAN IP changes with DHCP — `ipconfig` first whenever phone testing breaks.
- `app.json`: all template image references removed (files did not exist). Brand icons (1024×1024 logo, splash, favicon, Android adaptive) must be added **before the first EAS build**. Splash is solid navy until then.
- Deep-link scheme: `roadtripsync://`.
- `.env` is gitignored. `EXPO_PUBLIC_API_URL` = `http://localhost:8080/api` for web, `http://<PC-LAN-IP>:8080/api` for physical device testing.
- Backend has CORS middleware enabled (added during integration) — API calls work from web and native.
- Backend setup and API docs: see [`../server/README.md`](../server/README.md) and [`../test-data.md`](../test-data.md).
