This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

**Planned UI surface (feature IDs):** public discovery and filters (**D***), then attendee dashboard, zones, subscriptions (**A***), organizer flows (**O***), admin (**AD***) — summarized in [`docs/FEATURES.md`](../docs/FEATURES.md); screen-level detail in [`docs/mvp-feature-list.md`](../docs/mvp-feature-list.md) and [`docs/event-listing-ux.md`](../docs/event-listing-ux.md).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Discovery UI is **mobile-first** (touch-friendly targets, full-width actions on small screens, snap-scrolling chip rows); see [`docs/event-listing-ux.md`](../docs/event-listing-ux.md).

### Hydration warnings (Grammarly / extensions)

If DevTools shows a mismatch on `<body>` for `data-gr-ext-installed` or similar, that is usually **Grammarly** (or another extension) changing the DOM before React hydrates. `app/layout.tsx` uses `suppressHydrationWarning` on `<html>` and `<body>` for that case, or disable the extension on localhost. See [Next.js: hydration error](https://nextjs.org/docs/messages/react-hydration-error).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
