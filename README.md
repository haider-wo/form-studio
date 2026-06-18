# FORM Studio — Graphic Design Agency Website

A bold, experimental single-page website for a graphic design studio, built with React + Vite.

## Pages & Features

| Page | Description |
|------|-------------|
| **Home** | Single-page scroll with 10 sections |
| **Hero** | Kinetic marquee, diagonal accent line, animated entrance |
| **Portfolio** | 12 projects with category filter, "Load More" pagination, lightbox |
| **Services** | 6 service cards with scroll-triggered reveals |
| **About** | Studio story with stats and stacked image composition |
| **Process** | 4-step workflow on dark background |
| **Testimonials** | Auto-rotating carousel with manual controls |
| **Team** | 4 team members with hover effects |
| **Blog** | 3 insight cards with category badges |
| **Contact** | Functional form with validation |
| **404** | Catch-all error page |

## Design Tokens

| Token | Value |
|-------|-------|
| `--color-primary` | `#CCFF00` (Acid Lime) |
| `--color-text-primary` | `#111111` |
| `--color-text-secondary` | `#666666` |
| `--color-background` | `#FFFFFF` |
| `--color-surface` | `#F5F5F5` |
| `--color-border` | `#E0E0E0` |
| `--font-family` | `Inter, Helvetica Neue, Arial, sans-serif` |
| `--text-display` | `clamp(80px, 12vw, 140px)` |
| `--text-h1` | `clamp(36px, 5vw, 56px)` |
| `--text-h2` | `clamp(28px, 3.5vw, 42px)` |
| `--border-radius` | `4px` |
| `--border-width` | `1px` |

## Animations

- **Fade-ins** — IntersectionObserver scroll reveals
- **Kinetic type** — Infinite marquee in hero
- **Scroll-triggered** — Staggered section entrances
- **3D depth** — Image stack parallax in About
- **Hover effects** — Scale transforms, color shifts, magnetic buttons
- **Custom cursor** — Lime circle with hover expansion

## Project Structure

```
src/
├── components/
│   ├── ui/           # Button, Card, Badge, SectionTitle
│   ├── sections/     # Hero, Portfolio, Services, About, Process, Testimonials, Team, Blog, Contact
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── CustomCursor.jsx
├── pages/
│   ├── Home.jsx
│   └── NotFound.jsx
├── data/
│   └── [content files]
├── styles/
│   └── [CSS files]
├── App.jsx
└── index.jsx
```

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
