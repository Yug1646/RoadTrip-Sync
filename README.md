# RoadTrip Sync

A cross-platform mobile application for groups travelling together in multiple vehicles, where each vehicle shares its live location with the rest of the group.

## The Idea

A group on a road trip (for example, Mumbai to Goa in two cars) creates a shared trip. Every vehicle has one **driver** — the person whose phone runs RoadTrip Sync and shares that vehicle's GPS location. Passengers don't need the app or an account.

```text
Trip: Mumbai → Goa

Vehicle A — "Yug's Bike"   driver: Yug    (app connected → shares location)
Vehicle B — "Steve's Car"  driver: Steve  (app connected → shares location)

Tony, Peter, Bucky, Thor = passengers (no app, no account, not tracked)
```

The driver's device represents the vehicle — like a navigation device in a car representing that car's position. The group sees every vehicle of the trip on a live map.

## Core Concepts

| Concept  | Meaning                                                          |
| -------- | ---------------------------------------------------------------- |
| User     | A registered account — drivers and trip creators                 |
| Trip     | A shared journey (e.g. "Mumbai to Goa") with one or more vehicles |
| Vehicle  | The tracked unit — belongs to a trip, has exactly one driver     |
| Location | A vehicle's current — not historical — position on the trip      |

## Tech Stack

- **Mobile:** Flutter, Dart
- **Backend:** Node.js (>= 22), TypeScript, Express.js
- **Database:** PostgreSQL, Drizzle ORM
- **Validation:** Zod
- **Auth:** JWT, bcrypt
- **Real-time:** WebSockets / Socket.IO
- **Maps:** Google Maps Platform, device GPS

## How Tracking Works

```text
Driver's phone GPS
      ↓
Flutter app
      ↓
WebSocket / Socket.IO
      ↓
Node.js server  →  PostgreSQL (stores current vehicle location)
      ↓
Broadcast to other trip participants' apps
```

Frequent updates flow through the real-time layer; the database only stores each vehicle's latest position.

## Repository Structure

```
RoadTrip Sync/
├── collection/   Bruno / OpenCollection API requests
├── mobile/       Flutter application (not started yet)
├── server/       Node.js + TypeScript REST API (in progress)
└── docs/         Design documents
```

Backend progress is tracked in [server/README.md](server/README.md).

## Status

Phase 2 in progress — auth complete (register, login, JWT middleware, protected /auth/me); trips, vehicles and locations endpoints next.
