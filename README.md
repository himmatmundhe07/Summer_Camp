# Kalpana PreSchool — Summer Camp 2026

A premium, mobile-first registration portal for the Kalpana PreSchool Summer Camp. Built with React, Tailwind CSS, Framer Motion, and Supabase.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion
- **Backend:** Supabase (PostgreSQL, Auth, Row Level Security)
- **Deployment:** Vercel

## Features

- 🎨 Neo-brutalist, child-friendly UI with micro-animations
- 📝 Multi-step registration form with sibling support
- 🎟️ QR Code ticket generation on confirmation
- 🔐 Protected admin dashboard with session persistence
- 📊 Attendance tracker with bulk actions and date filtering
- 📋 Audit logging for admin accountability
- 📱 Fully responsive (mobile + desktop)

## Local Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```

## Environment Variables

See `.env.example` for all required variables. Never commit real credentials.

## License

Private — All rights reserved.
