# TransforM Egypt — Next.js 14 Website

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** — custom luxury design tokens
- **Framer Motion** — animations
- **Zustand** — cart state
- **React Hook Form + Zod** — booking/contact forms

## 🌐 Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add env vars from `.env.example`
4. Connect domain `transform-egypt.com` in Vercel dashboard

## 🌐 Deploy to Netlify

1. `npm run build`
2. Drag `.next` folder to Netlify, or connect GitHub
3. Add `@netlify/plugin-nextjs` (already in netlify.toml)

## 🔑 Environment Variables

Copy `.env.example` → `.env.local` and fill in values.

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── layout/       # Navigation, Footer, WhatsApp
│   └── sections/     # Hero, Services, Testimonials...
├── hooks/            # useI18n (EN/AR)
├── lib/              # data.ts, translations.ts, utils.ts
├── store/            # cart.ts (Zustand)
└── types/            # TypeScript interfaces
```

## 🌍 Bilingual (EN/AR)

Language toggle built-in. Arabic auto-enables RTL layout.
Translations in `src/lib/translations.ts`.

## ✅ What's Included

- Full Navigation (sticky, scroll-aware, mobile menu)
- Hero with parallax + Framer Motion
- Social Proof stats section
- Services grid with hover cards
- Testimonials auto-carousel
- Footer with newsletter
- Floating WhatsApp button
- Cart store (Zustand + localStorage)
- Full TypeScript types
- Tailwind luxury design system
- EN/AR translations (complete)
- Vercel + Netlify deploy configs

## 📸 Add Your Images

Place images in `/public/images/`:
- `hero-bg.png` — Hero background (already uploaded)
- `logo.png` — Gold T logo (already uploaded)
- `services/hair-extensions.jpg`
- `services/lash-extensions.jpg`
- `services/microblading.jpg`
- `services/skincare.jpg`
- `services/nails.jpg`

## 📞 Contact Info

Phones: 01009780008 / 01004545700
WhatsApp: wa.me/201009780008
Instagram: @transformegypt
