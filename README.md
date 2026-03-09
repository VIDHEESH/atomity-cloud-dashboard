# Atomity — Cluster Efficiency Dashboard

A scroll-triggered, animated **Cluster Efficiency Dashboard** section built for the Atomity Frontend Engineering Challenge.

> **Feature chosen:** Option A — Cluster Efficiency (0:30–0:40 in the video)

🔗 **Live demo:** [https://atomity-cloud-dashboard-rxj2.vercel.app/](https://atomity-cloud-dashboard-rxj2.vercel.app/)

---

## Why Option A?

The Cluster Efficiency dashboard is a data-dense feature that requires thoughtful handling of:
- **Complex data visualization** — horizontal distribution charts proportional to cost
- **Interactive drill-down** — Cluster → Namespace context filtering
- **Dense tabular data rendering** — efficiency metrics across multiple dimensions
- **Analytic UI patterns** — KPI ribbons, time-filters, and structured grids
- **Animation choreography** — staggered entrances for bars, rows, and icons

I chose this because it best demonstrates the intersection of **animation craft**, **component architecture**, and **product thinking**. Instead of a glossy marketing layout, I interpreted this challenge as building a real, dense **B2B Analyst Tool** that a CTO or DevOps engineer would actually use.

---

## Approach to Animation

All animations use **Framer Motion** with `useReducedMotion()` respected throughout:

| Animation | Technique |
|-----------|-----------|
| KPI Ribbon cascade | Vertical spring-drop (`y: 20 → 0`) with 0.1s staggering |
| Grid panel entrance | Horizontal slide-in (`x: ±20 → 0`) mapping to natural eye flow |
| Distribution bars | Spring physics (`bounce: 0.2`) width expansion from 0% |
| Number counting | Dollar values animate from `$0` → target using `framer-motion` `animate()` |
| View transitions | `AnimatePresence` with cross-fade `popLayout` scaling |
| Scroll trigger | `IntersectionObserver` fires once at 10–15% visibility threshold |

**Key principle:** Every animation serves a purpose — revealing data hierarchy, guiding the eye through the chart-to-table flow, and providing interactive feedback.

---

## Token & Style Architecture

### Design Tokens

All visual values live in two places:

1. **CSS Custom Properties** (`globals.css` `:root` block) — single source of truth
2. **TypeScript token map** (`src/tokens/colors.ts`) — type-safe references for JS consumers

```
:root {
  --color-accent-primary: #3ecf7b;    /* Atomity green */
  --color-bg-card: #ffffff;
  --space-md: 1rem;
  --radius-xl: 20px;
  ...
}
```

Components reference `var(--color-accent-primary)` — never raw hex values.

### Dark Mode

The `[data-theme="dark"]` selector overrides all token values. The `ThemeToggle` component persists choice to `localStorage` and respects `prefers-color-scheme` on first load.

### Modern CSS Features Used

| Feature | Where |
|---------|-------|
| `color-mix()` | Dynamic transparency for hover states, borders, glow effects |
| `clamp()` | Fluid typography and spacing everywhere (`font-size: clamp(0.75rem, ...)`) |
| CSS nesting | All component `.module.css` files use native `& ` nesting |
| Container queries | `@container (max-width: 800px)` inside dashboard workspace for intelligent layout collapsing |
| Logical properties | `inline-size`, `block-size`, `margin-inline`, `padding-block` throughout |
| `:has()` selector | Parent-aware styling: table header highlight on row hover |
| `font-variant-numeric: tabular-nums` | Aligned monospace numbers in cost table |

---

## Data Fetching & Caching

### Strategy

- **Library:** TanStack Query (React Query v5)
- **API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) — fetches `/posts` and `/comments`
- **Transform:** Raw API data is deterministically transformed into cluster/namespace cost data

### Caching Configuration

```ts
{
  staleTime: 5 * 60 * 1000,      // 5 minutes fresh
  gcTime: 10 * 60 * 1000,         // 10 minutes before GC
  refetchOnWindowFocus: false,     // No redundant fetches
  retry: 2,                       // Graceful retry
}
```

### States Handled

| State | UI |
|-------|-----|
| **Loading** | Shimmer skeleton for both chart and table |
| **Error** | Error card with retry button |
| **Success** | Animated chart + table render |
| **Cached** | Instant display on revisit (no network tab activity) |

---

## Component Structure

```
src/
  tokens/
    colors.ts                    — Design token constants
  types/
    index.ts                     — TypeScript interfaces
  hooks/
    useApiData.ts                — TanStack Query data hooks
  components/
    AnalystDashboard/            — Main high-density grid orchestrator
    DataTable/                   — Efficiency metrics data-grid
    SavingsInsight/              — Actionable cost-reduction card
    AnimatedNumber/              — Counting number animation
    Badge/                       — Reusable status badge
    LoadingSkeleton/             — Shimmer loading state
    ErrorState/                  — Error with retry
    ThemeToggle/                 — Dark/light mode switch
  app/
    globals.css                  — Token definitions + application shell
    layout.tsx                   — Root layout with QueryProvider
    providers.tsx                — Client-side TanStack Query setup
    page.tsx                     — Page composition
```

Every component has its own `.tsx` + `.module.css` pair. No monolithic files.

---

## Libraries Used

| Library | Purpose | Why |
|---------|---------|-----|
| **Next.js 16** | Framework | App Router, SSR, optimized builds, Vercel deploy |
| **Framer Motion** | Animation | Preferred by challenge spec. Spring physics, `AnimatePresence`, `useReducedMotion` |
| **TanStack Query v5** | Data caching | Challenge-preferred. Automatic stale/cache management, devtools |
| **TypeScript** | Type safety | Challenge-preferred. Full typing across all components and hooks |
| **Tailwind CSS** | Utility layer | Challenge-preferred styling option. Used alongside CSS Modules |
| **CSS Modules** | Component styles | Scoped, no runtime cost, supports native CSS nesting |

No MUI, Chakra, shadcn, or any pre-built component library was used. Every element (Badge, DataTable, BarChart, Icons, Skeleton, ErrorState, ThemeToggle) was built from scratch.

---

## Tradeoffs & Decisions

1. **Analyst App Layout vs Marketing Page** — The video showed a marketing layout (big centered text, floating dashboard). To prove "Product Thinking" and "creativity", I deliberately abandoned the marketing landing page pattern and built a dense, full-bleed B2B SaaS Application layout (App Header, Workspace, Toolbar) which is much more appropriate for an Infrastructure Control Plane.

2. **Deterministic data transform over random** — The API data transforms use fixed multipliers rather than pure random, so the chart proportions stay meaningful and consistent across renders.

3. **CSS Modules over Tailwind-only** — While Tailwind is included, I primarily used CSS Modules for component styles to demonstrate raw CSS architecture skills and use modern CSS features (nesting, container queries, color-mix) that are harder to express cleanly in utility classes.

---

## What I Would Improve With More Time

- **Chart tooltips** — Hover tooltips on bars showing cost breakdown per resource
- **Shared layout transitions** — Morphing bar animations when drilling from cluster to namespace
- **Unit tests** — Component tests with React Testing Library
- **Performance profiling** — Verify no unnecessary re-renders with React DevTools
- **Real API integration** — Connect to a mock cloud cost API with realistic data shapes
- **Arrow key navigation** — Keyboard arrow key navigation within the data table
- **Sparkline mini-charts** — Trend lines in the efficiency column

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — scroll down to see the dashboard section animate in.

---

## Deploy to Vercel

```bash
npx vercel
```

Or connect the GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.
