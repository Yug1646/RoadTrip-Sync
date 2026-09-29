# RoadTrip Sync — Mobile

React Native + TypeScript app built with **Expo Router**. This is the Phase 4+ frontend for the RoadTrip Sync backend (`../server`).

## Tech Stack

- React Native + TypeScript
- Expo Router (file-based routing, tabs + stack)
- Expo Secure Store (auth token)
- Mappls SDK (maps — Phase 4/5 milestone, needs a development build)
- socket.io-client (live locations — Phase 4/6)

## Phase 4 Plan

1. ✅ Scaffold Expo project (`src/app/` routing structure)
2. ✅ Clean template demo content
3. [ ] Theme — navy/orange palette in `src/constants/theme.ts`
4. [ ] Screen tree — Welcome, Auth (login/signup), Tabs (Home/Trips/Profile), Trip screens (create/join/details/live-map) — static titles only
5. [ ] `src/services/api.ts` — fetch wrapper reading `EXPO_PUBLIC_API_URL`
6. [ ] `.env` — `EXPO_PUBLIC_API_URL` (localhost for web, LAN IP for phone)
7. [ ] Milestone: call `GET /health` from the app and render the response

## Phase 5 Plan (exam season — low-intensity)

All screens built with **static hardcoded data that mirrors the real API response shapes** (`toTripResponse`, roster with `driverName`, location objects). Includes a fake auth flow (any credentials → fake token → route protection) so screens and navigation are complete without the backend.

## Phase 6 Plan (November)

Static → dynamic: swap mock data for real API calls (auth first, then trips, then vehicles/locations). Add Socket.IO live locations and the Mappls map — both require a **development build** (`eas build --profile development`), Expo Go cannot load them.

## Notes

- `app/` is the reserved Expo Router directory (routes only). Everything else lives in `src/`.
- `.env` is gitignored. `EXPO_PUBLIC_API_URL` = `http://localhost:8080/api` for web, `http://<PC-LAN-IP>:8080/api` for physical device testing.
- Backend setup and API docs: see [`../server/README.md`](../server/README.md) and [`../test-data.md`](../test-data.md).
