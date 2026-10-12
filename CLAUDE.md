# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Next.js dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test runner is configured.

## Architecture

**StartupKit** is a Next.js 13+ App Router application for a Vietnamese startup ecosystem platform. It connects Founders, Investors, and Mentors through AI-powered matching, messaging, and deal rooms.

### Routing & i18n

All pages live under `app/[locale]/` for EN/VI internationalization. The middleware in `proxy.ts` handles:
- Locale detection and prepending
- Role-based access control for `/workspace/*` routes
- Redirecting unauthenticated users to role-appropriate pages

Route groups:
- `(auth)/` — Login, register, 2FA (no URL segment)
- `workspace/[role]/` — Role dashboards (startup, investor, mentor, admin)
- `market/` — Public marketplace (startups, investors, mentors)
- `deals/`, `profile/`, `startup/`, `project/` — Public pages

### Auth & Roles

`lib/auth-context.tsx` provides a React Context with mock users. Role is stored in cookie `startupkit_role`. Roles: `GUEST`, `STARTUP`, `INVESTOR`, `MENTOR`, `ADMIN`.

Use `dev-role/page.tsx` to switch roles during development.

### State Management

No Redux or Zustand. State is managed via:
1. **React Context** — auth (`lib/auth-context.tsx`), i18n dictionary (`lib/dict-context.tsx`)
2. **localStorage stores** (`lib/*-store.ts`) — investment, investor, mentor, project, notification data

All stores follow the same pattern: typed interfaces, `typeof window === "undefined"` guard, JSON serialization, prefixed localStorage keys like `startupkit_founder_projects`.

### No Backend

There is no API integration. All data is mock/localStorage-only. No fetch, axios, React Query, or SWR is used.

### i18n Dictionaries

Translations live in `dictionaries/en.json` and `dictionaries/vi.json`. Load server-side via `lib/getDictionary.ts`, access in client components via `useDictionary()` hook from `lib/dict-context.tsx`.

### UI & Styling

- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **shadcn/ui** (new-york style, configured in `components.json`)
- **Radix UI** primitives, **lucide-react** icons, **sonner** toasts
- Design tokens are hardcoded: Black `#111111`, Gold `#F4B400`, Border `#EAEAEA`
- Design rules documented in `ui/design_rule.md` and `ui/component_rule.md`

### Path Alias

`@/*` maps to the project root (configured in `tsconfig.json`).

### Key Files

| File | Purpose |
|------|---------|
| `proxy.ts` | Middleware: locale routing + RBAC |
| `lib/auth-context.tsx` | Auth state, mock users, role management |
| `lib/dict-context.tsx` | i18n context |
| `lib/getDictionary.ts` | Server-side dictionary loader |
| `lib/*-store.ts` | localStorage-based data stores |
| `ui/design_rule.md` | Visual design system rules |
| `ui/component_rule.md` | Component-level design specs |
| `design-history.md` | Architectural decisions log |
