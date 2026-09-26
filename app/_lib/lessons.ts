// Lesson order drives the sidebar, home page, and prev/next links.
// Add a lesson here once its route exists.
export const lessons = [
  { slug: "01-routing", title: "Routing", blurb: "Folders become URLs. A page.tsx makes them public." },
  { slug: "02-layouts", title: "Layouts & Navigation", blurb: "Shared UI that survives navigation, and <Link>." },
  { slug: "03-dynamic-routes", title: "Dynamic Routes", blurb: "[slug] folders, params, and searchParams." },
  { slug: "04-server-client", title: "Server vs Client", blurb: "What runs where, and when to reach for \"use client\"." },
  { slug: "05-data-fetching", title: "Data Fetching", blurb: "Async components, streaming with Suspense, and use()." },
  { slug: "06-loading-error", title: "Loading & Errors", blurb: "loading.tsx, error.tsx, and not-found.tsx." },
  { slug: "07-server-actions", title: "Server Actions", blurb: "Forms that change data without writing an API." },
  { slug: "08-caching", title: "Caching", blurb: "\"use cache\", cacheLife, and updateTag." },
  { slug: "09-route-handlers", title: "Route Handlers", blurb: "route.ts: your own HTTP endpoints." },
  { slug: "10-proxy", title: "Proxy", blurb: "Redirect, rewrite, or add headers before a request." },
  { slug: "11-metadata", title: "Metadata", blurb: "Titles, meta tags, and generated social images." },
  { slug: "12-image-font", title: "Image & Font", blurb: "Optimized images and self-hosted fonts." },
];
