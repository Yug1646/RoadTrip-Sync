# RoadTrip Sync — Mobile

React Native + TypeScript app built with **Expo Router**. This is the Phase 4+ frontend for the RoadTrip Sync backend (`../server`).

## Tech Stack

- React Native + TypeScript (strict mode)
- Expo Router (file-based routing, tabs + stack)
- Expo Secure Store (auth token — Phase 5)
- Mappls SDK (maps — needs a development build, not Expo Go)
- socket.io-client (live locations — Phase 6)

## Current State

- Theme system in `src/constants/theme.ts`: brand palette (navy `#0F2942` / orange `#FF6B35` / teal `#2A7B9B`), typography tokens (Plus Jakarta Sans, loaded in root layout), spacing, radii, and shared `globalStyles` (text roles `h1`/`h2`/`h3`/`body`/`caption`, card, primary button). Screens never hardcode fonts — they use style roles.
- `PrimaryButton` component (`src/components/`) with `label` + optional `onPress` props.
- Welcome screen complete; auth navigation conventions: `router.push` into auth flows, `router.replace` reserved for post-login.
- Tab bar (Home / Trips / Profile) with brand tints and render-prop icons.
- All other screens (`auth/`, `trip/`, remaining tabs) are stubs.

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

Immediate next: login form with controlled inputs (`useState`) → signup → health milestone.

## Phase 6 Plan (November)

Static → dynamic: swap mock data for real API calls (auth first, then trips, then vehicles/locations). Add Socket.IO live locations and the Mappls map — both require a **development build** (`eas build --profile development`), Expo Go cannot load them.

## Notes

- `app/` is the reserved Expo Router directory (routes only). Everything else lives in `src/`.
- Layouts: root `_layout.tsx` (fonts + stack, wraps everything), `(tabs)/_layout.tsx` (bottom tab bar), `auth/` and `trip/` currently rely on the root stack.
- `app.json`: all template image references removed (files did not exist). Brand icons (1024×1024 logo, splash, favicon, Android adaptive) must be added **before the first EAS build**. Splash is solid navy until then.
- Deep-link scheme: `roadtripsync://`.
- `.env` is gitignored. `EXPO_PUBLIC_API_URL` = `http://localhost:8080/api` for web, `http://<PC-LAN-IP>:8080/api` for physical device testing.
- Backend has no CORS middleware yet — API calls work from Expo Go (native) but are blocked on web.
- Backend setup and API docs: see [`../server/README.md`](../server/README.md) and [`../test-data.md`](../test-data.md).
