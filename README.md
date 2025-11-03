# Iliria ERP — M1 (Categories & Products with Supabase)

Live deploy with **Vercel** + **Supabase**.

## 1) Environment Variables (Vercel → Settings → Environment Variables)
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

## 2) Database (Supabase SQL)
Run the M1 SQL you already have (categories, products, product_counters, triggers, RLS).

## 3) Pages
- `/` : menu
- `/categories` : CRUD for categories (very basic)
- `/products` : create/list products (SKU auto via DB trigger), image upload to `product-images`

## 4) Dev (optional if running locally)
```bash
npm install
npm run dev
```

Deployed on Vercel it builds automatically.
