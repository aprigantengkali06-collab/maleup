# MaleUp – 24-Week Male Health Transformation PWA

A science-backed Progressive Web App for simultaneous fat loss and male health optimization over 24 weeks.

## Tech Stack

- **Framework**: Next.js 15 App Router + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State**: Zustand + React Query v5
- **Database**: Supabase (PostgreSQL + RLS)
- **Animation**: Framer Motion
- **Charts**: Recharts
- **PWA**: Service Worker + Web Push (VAPID)

## Features

- 🍽️ **5-Phase Meal Planning** – PSMF, Low-carb, Balanced, IF, Maintenance with 69+ Indonesian foods
- 🏋️ **Adaptive Workouts** – Strength, HIIT, Tabata with live timer
- 💪 **Kegel Training** – Animated pelvic floor trainer with audio cues
- 📊 **Progress Tracking** – Weight, measurements (AES-256 encrypted), achievements
- 🔔 **Push Notifications** – Meal, workout & kegel reminders via VAPID
- 🔒 **Privacy First** – Sensitive measurements encrypted client-side
- 📱 **Installable PWA** – Works offline with service worker caching

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/maleup.git
   cd maleup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Run migrations: `supabase db push` or execute files in `/supabase/migrations/`
   - Run seeds: execute files in `/supabase/seed/` in order (001–010)

4. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Fill in your Supabase URL, keys, etc.
   ```

5. **Generate VAPID keys** (for push notifications)
   ```bash
   npx web-push generate-vapid-keys
   # Copy the keys into .env.local
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Deploy to Vercel**
   ```bash
   vercel deploy
   # Add all env vars in Vercel dashboard
   # Cron jobs are configured in vercel.json (6 AM, 12 PM, 5 PM daily)
   ```

## Security Notes

### Measurement Encryption

Sensitive measurement data (penis length, girth) is encrypted with AES-256-GCM before being
stored in Supabase. The encryption key is set via `NEXT_PUBLIC_ENCRYPTION_KEY`.

**Why `NEXT_PUBLIC_`?** Encryption and decryption happen entirely in the browser, so the key
must be accessible on the client. This means the key is visible in the client bundle.

For this **personal-use app** that is acceptable because:
- Data is encrypted at-rest in Supabase (a compromised DB dump is not plaintext)
- Supabase Row-Level Security limits access to the authenticated user only
- There is no server-side attack surface for the key

**⚠️ No fallback key.** If `NEXT_PUBLIC_ENCRYPTION_KEY` is not set, the app will throw at
runtime rather than silently use a weak default. Always set this variable in your `.env.local`
and in your Vercel / deployment environment.

For a multi-user production deployment consider server-side encryption via Supabase Edge
Functions or per-user key derivation from the user's own password.

## Scientific References

- PSMF – PMC4784653
- HIIT Meta-analysis – PMC10054577
- Weight Loss & Testosterone – Esposito 2004 (JAMA)
- Kegel & ED – Dorey 2004 (BJGP)
- Penile Fat Pad – Andrologia 2021

## License

MIT
