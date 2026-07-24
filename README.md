# LOOPR

**Real-time parking coordination network.**

LOOPR connects a driver who is about to leave a legal parking space with a driver looking for one nearby. The product coordinates timing, navigation and confirmation so drivers can stop circling the city.

## Live landing page

[loopr-parking-pilot.t-zborowski.chatgpt.site](https://loopr-parking-pilot.t-zborowski.chatgpt.site)

## Initial pilot cities

- Kraków
- Wrocław
- Málaga

## MVP scope

- two modes: **I am looking for a spot** and **I am leaving a spot**
- real-time parking signals with location and departure time
- request, acceptance and navigation flow
- synchronization statuses and success confirmation
- reputation and abuse-prevention foundations
- city waitlist with persistent D1 storage

## Positioning

LOOPR does not sell public parking spaces. It provides real-time information and coordinates arrival and departure between drivers.

## Development

Prerequisites: Node.js 22.13 or newer.

```bash
pnpm install
pnpm dev
pnpm build
```

The project uses vinext, React, Cloudflare D1 and Drizzle. `.openai/hosting.json` contains the Sites deployment configuration.

## Current status

Public landing page and waitlist are live. The next phase is validating parking liquidity in focused districts and closed communities.
