# RoadTrip Sync — Mobile

React Native + TypeScript app built with **Expo Router**. This is the Phase 4+ frontend for the RoadTrip Sync backend (`../server`).

## Tech Stack

- React Native + TypeScript (strict mode)
- Expo Router (file-based routing, tabs + stack)
- Expo Secure Store (auth token — Phase 5)
- Mappls SDK (maps — needs a development build, not Expo Go)
- socket.io-client (live locations — Phase 6)

## Current State

- Theme system in `src/constants/theme.ts`: brand palette (navy `#0F2942` / orange `#FF6B35` / teal `#2A7B9B` / burnt `secondaryDark`), typography tokens (Plus Jakarta Sans, loaded in root layout), spacing, radii, and shared `globalStyles` (text roles `h1`/`h2`/`h3`/`body`/`caption`/`link`, card, primary button). Screens never hardcode fonts — they use style roles.
- Shared components: `PrimaryButton` (label / onPress / icon), `TripCard` (status-aware trip card), `FilterChips` (status filter row), `AppHeader` (logo + title + avatar for custom screens).
- Welcome + Auth complete (`/auth` — single route, Log In / Sign Up is in-screen state, not navigation).
- **Home** = live dashboard: active trips only (empty state with Start a Trip action), Start a Trip card, Join-by-code input (static), CTA banner.
- **Trips** = full library: search + status chips (composed filters, both derived from state), empty state.
- **Profile** = identity block, telemetry stats (Active Vehicles derived from trip data), convoy preferences list, Log Out (static).
- **Create Trip** (`/trip/create`): two-state screen (form → created reveal), travel-mode chips mapped to backend enums (`TravelMode` in `types/trip.ts`), conditional Transit Name field, fake 6-char join code (`utils/joinCode.ts`, ambiguous chars excluded — server provides the real code in Phase 6).
- **Join Trip** (`/trip/join`): 6-box code input (array state + refs: auto-advance, backspace-to-previous, paste support), verified trip preview (static — any complete code verifies), 2-col travel-mode grid, vehicle nickname, fake checks → `router.replace("/trip/details")`. Receives a pre-filled code from Home's Join card via **navigation params** (`useLocalSearchParams`).
- Auth transition: login/signup ends with `router.dismissAll()` + `router.replace("/home")` so Home becomes the stack root — back-swipe can never reveal Welcome.
- **Auth is real**: register/login hit the backend (`/api/auth/*`), the JWT is stored via `services/token.ts` (SecureStore on native, localStorage on web — SecureStore has no web implementation), and `apiFetch` auto-attaches `Authorization: Bearer <token>` to every request.
- **Route protection**: root layout boot-gates on a `loadToken()` read (no flash of wrong screen), then a guard effect enforces the rules on every navigation — no token + protected route → `/auth`; token + public route → `/home`. Log Out clears the token and returns to Welcome.
- Tab bar (Home / Trips / Profile) with brand tints, render-prop icons, logo + avatar header on all tabs.
- Brand asset bundled: `assets/images/appLogo.png` (header logo). App icon / splash / favicon still pending 1024×1024 export — required before first EAS build.
- Layout convention: tab screens use the native header; **custom screens use `SafeAreaView` → `KeyboardAvoidingView` → `ScrollView`** (keyboard-safe, notch-safe).
- Stubs remaining: `trip/join`, `trip/details`, `trip/live-map`.

## Phase 4 Plan

1. [x] Scaffold Expo project (`src/app/` routing structure)
2. [x] Clean template demo content
3. [x] Theme — navy/orange palette, tokens + globalStyles in `src/constants/theme.ts`
4. [x] Screen tree — Welcome, Auth (login/signup), Tabs (Home/Trips/Profile), Trip screens (create/join/details/live-map) — stubs with real navigation
5. [ ] `src/services/api.ts` — fetch wrapper reading `EXPO_PUBLIC_API_URL`
6. [x] `.env` — `EXPO_PUBLIC_API_URL` (localhost for web, LAN IP for phone)
7. [ ] Milestone: call `GET /health` from the app and render the response

## Phase 5 Plan (exam season — low-intensity)

All screens built with **static hardcoded data that mirrors the real API response shapes** (`toTripResponse`, roster with `driverName`, location objects). Includes a fake auth flow (any credentials → fake token → route protection) so screens and navigation are complete without the backend.

All three tabs, create trip, and join trip are built; the auth flow is **real** (backend + persistent token + route protection) — the original "fake auth" plan was superseded. Remaining before Phase 6 dynamic screens: `trip/details`, `trip/live-map` (Mappls + sockets defer to Phase 6; a static shell is the option on the table). The dynamic-data groundwork is done: `apiFetch` wrapper, health milestone ✓, real auth ✓.

## Phase 6 Plan (November)

Static → dynamic: swap mock data for real API calls (auth first, then trips, then vehicles/locations). Add Socket.IO live locations and the Mappls map — both require a **development build** (`eas build --profile development`), Expo Go cannot load them.

## Notes

- `app/` is the reserved Expo Router directory (routes only). Everything else lives in `src/`.
- Layouts: root `_layout.tsx` (fonts + stack, wraps everything), `(tabs)/_layout.tsx` (bottom tab bar), `auth/` and `trip/` currently rely on the root stack.
- Auth is a single route: `app/auth/index.tsx` → `/auth`. Log In / Sign Up switching is component state, not navigation. Submit currently runs fake checks; real validation arrives with the API in Phase 6.
- Shared mode options live in `src/constants/modes.ts` (UI label ↔ backend enum mapping) — single source for create + join screens.
- Home shows active trips only; Trips is the searchable full library. Filter/search results are always derived from state, never stored.
- `app.json`: all template image references removed (files did not exist). Brand icons (1024×1024 logo, splash, favicon, Android adaptive) must be added **before the first EAS build**. Splash is solid navy until then.
- Deep-link scheme: `roadtripsync://`.
- `.env` is gitignored. `EXPO_PUBLIC_API_URL` = `http://localhost:8080/api` for web, `http://<PC-LAN-IP>:8080/api` for physical device testing.
- Backend has no CORS middleware yet — API calls work from Expo Go (native) but are blocked on web.
- Backend setup and API docs: see [`../server/README.md`](../server/README.md) and [`../test-data.md`](../test-data.md).
