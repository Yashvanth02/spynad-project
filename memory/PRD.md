# Spynad — Product Requirements Document

## Original Problem Statement
Build a highly creative, immersive, visually striking marketing website for the digital agency **Spynad** (websites, eCommerce, portfolio, custom web solutions + branding/creatives/video). Must feel futuristic, bold and transformative with dark base, premium animations, parallax, magnetic cursor effects, and seamless scene transitions. Includes hero, services, why-us, portfolio, process timeline, branding & creatives, testimonials, final CTA. Hidden admin dashboard to view contact form submissions.

## User Choices (captured 2026-04-19)
- **Contact capture**: Form saved to MongoDB + auto-email via Resend
- **Portfolio**: Placeholder projects for now
- **Palette**: Strict white & black monochrome (overrides vibrant-gradient brief)
- **Admin**: Yes — with login
- **Logo**: Stylized text wordmark (placeholder)

## Personas
- **Founder (agency owner)**: Needs leads → checks admin dashboard
- **Prospect (brand/startup)**: Visits site → submits inquiry

## Architecture
- **Backend**: FastAPI + MongoDB (motor) with JWT auth for admin
- **Frontend**: React 19 + Tailwind + Framer Motion + Lenis smooth-scroll + shadcn/ui + sonner toasts
- **Email**: Resend (fire-and-forget async; gracefully skipped when key missing)
- **Routes**: `/` (home), `/admin/login`, `/admin`
- **API**: `/api/health`, `/api/contact`, `/api/admin/login`, `/api/admin/me`, `/api/admin/contacts`, `DELETE /api/admin/contacts/{id}`

## What's Been Implemented (2026-04-19)
- ✅ Immersive hero with kinetic type (word-reveal) + magnetic CTAs + glow button
- ✅ Interactive Services rows with hover image reveal
- ✅ Why Spynad asymmetric grid + metric counters
- ✅ Portfolio dynamic grid (4 items) with case-study modal
- ✅ Process scroll-driven vertical timeline (5 steps, animated progress line)
- ✅ Branding & Creatives dual marquee (kinetic outline text)
- ✅ Testimonials morphing blur-in quotes (auto + dots)
- ✅ Contact form (name/email/project/budget/message) → saves DB + fires Resend email
- ✅ Custom monochrome cursor (mix-blend-difference) + magnetic buttons
- ✅ Admin login (JWT) + dashboard table + delete + refresh + logout
- ✅ Admin seeded on startup from env
- ✅ 100% backend & frontend tests passing (iteration_1)

## Backlog
### P1
- Add real case-study deep pages (per-project route)
- Integrate 3D fluid shader in hero (r3f) for extra depth
- Newsletter capture in footer
- Page transitions between routes
### P2
- Multi-language (i18n)
- Dark/light theme toggle
- Admin: export leads CSV, filter/search
- Analytics (Plausible or GA)

## Credentials
- **Admin**: `admin@spynad.com` / `Spynad@2025`
- **.env**: `RESEND_API_KEY` empty — user to add after sign-up at https://resend.com

## Next Actions
1. User adds `RESEND_API_KEY` + verifies sender domain in Resend
2. User supplies real portfolio project info → replace placeholders
3. User uploads real logo → replace text wordmark
