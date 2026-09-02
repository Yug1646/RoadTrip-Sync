# RoadTrip Sync

A cross-platform mobile application for groups of people travelling together in multiple vehicles.

## The Idea

A group on a road trip (for example, Mumbai to Goa with one bike and one car) creates a shared trip room. Members join the room, get organised into vehicles, and — once the trip is active — can see each other's live locations on a map in real time.

## Core Concepts

| Concept  | Meaning                                                    |
| -------- | ---------------------------------------------------------- |
| User     | A registered account                                       |
| Trip     | A shared trip room (e.g. "Mumbai to Goa")                  |
| Member   | A user participating in a trip                             |
| Vehicle  | Any vehicle (bike, car, van...) belonging to a trip        |
| Location | A member's current — not historical — position on a trip   |

## Tech Stack

- **Mobile:** Flutter, Dart
- **Backend:** Node.js (>= 22), TypeScript, Express.js
- **Database:** PostgreSQL, Drizzle ORM
- **Validation:** Zod
- **Auth:** JWT, bcrypt
- **Real-time:** WebSockets / Socket.IO
- **Maps:** Google Maps Platform, device GPS

## Repository Structure

```
RoadTrip Sync/
├── mobile/   Flutter application (not started yet)
└── server/   Node.js + TypeScript REST API (in progress)
```

Backend progress is tracked in [server/README.md](server/README.md).

## Status

Early development — Phase 1 (project foundation).
