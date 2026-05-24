/**
 * Post-build prerender: generates per-route HTML + sitemap.xml + robots.txt
 * into dist/public. Runs after `vite build`.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "dist/public");

const SITE_URL = "https://transform-egypt.com";

const routes = [
  { path: "/", title: "TransforM Egypt — Where Beauty Meets Precision", description: "Egypt and the Middle East's #1 premium beauty brand." },
  { path: "/services", title: "Beauty Services — TransforM Egypt", description: "Hair extensions, lash, microblading, skincare, nails, wigs." },
  { path: "/transformations", title: "Before & After Gallery — TransforM Egypt", description: "Real client transformations." },
  { path: "/reviews", title: "Client Reviews — TransforM Egypt", description: "Thousands of 5-star reviews." },
  { path: "/boutique", title: "Beauty Boutique — TransforM Egypt", description: "Shop professional beauty products." },
  { path: "/book", title: "Book an Appointment — TransforM Egypt", description: "Book at any of our 4 Cairo branches." },
];

const indexHtml = readFileSync(join(OUT, "index.html"), "utf8");

for (const route of routes) {
  let html = indexHtml
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${route.description}" />`)
    .replace("</head>", `  <link rel="canonical" href="${SITE_URL}${route.path}" />\n</head>`);

  if (route.path !== "/") {
    const dir = join(OUT, route.path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
  }
}

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${r.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;

writeFileSync(join(OUT, "sitemap.xml"), sitemap);

// robots.txt
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log("✅ Prerender complete:", routes.length, "routes + sitemap + robots.txt");
