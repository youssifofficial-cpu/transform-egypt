/**
 * TransforM Egypt — Playwright driver for agent use.
 * Starts the Vite dev server, drives chromium, takes screenshots.
 *
 * Usage:
 *   node .claude/skills/run-transform-egypt/driver.mjs [command] [args...]
 *
 * Commands:
 *   screenshot [route] [out]   — screenshot a route (default /, /tmp/out.png)
 *   smoke                      — visit all routes, report pass/fail
 *   form                       — fill and submit the /book form, screenshot result
 *   lang                       — toggle to Arabic, screenshot
 */

import { spawn } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { chromium } = require("/opt/node22/lib/node_modules/playwright");

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../../..");   // artifacts/transform-egypt/
const PORT = 5174;                          // avoid clashing with a running server
const BASE = `http://localhost:${PORT}`;

const [,, cmd = "smoke", ...args] = process.argv;

// ── helpers ─────────────────────────────────────────────────────────────────

async function startServer() {
  const proc = spawn("pnpm", ["run", "dev", "--", "--port", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
  });

  await new Promise((resolve, reject) => {
    proc.stdout.on("data", (d) => { if (d.toString().includes("ready in")) resolve(undefined); });
    proc.stderr.on("data", (d) => { if (d.toString().includes("ready in")) resolve(undefined); });
    proc.on("error", reject);
    setTimeout(() => reject(new Error("Server start timeout")), 30_000);
  });

  return proc;
}

async function withBrowser(fn) {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  try {
    return await fn(page, browser);
  } finally {
    await browser.close();
  }
}

// ── commands ─────────────────────────────────────────────────────────────────

async function cmdScreenshot([route = "/", outPath = "/tmp/transform-ss.png"]) {
  const server = await startServer();
  try {
    await withBrowser(async (page) => {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`✅ Screenshot saved: ${outPath}`);
    });
  } finally {
    server.kill();
  }
}

async function cmdSmoke() {
  const routes = ["/", "/services", "/transformations", "/boutique", "/reviews", "/book", "/cart"];
  const server = await startServer();
  const results = [];
  try {
    await withBrowser(async (page) => {
      for (const route of routes) {
        const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
        const status = res?.status() ?? 0;
        const title = await page.title();
        const ok = status === 200 && !title.includes("Error");
        results.push({ route, status, ok });
        console.log(ok ? "✅" : "❌", route, `(${status})`);
      }
    });
  } finally {
    server.kill();
  }
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error("FAILED:", failed.map((r) => r.route).join(", "));
    process.exit(1);
  }
  console.log("All routes OK");
}

async function cmdForm() {
  const outFilled = "/tmp/transform-form-filled.png";
  const outSubmit = "/tmp/transform-form-submitted.png";
  const server = await startServer();
  try {
    await withBrowser(async (page) => {
      await page.goto(`${BASE}/book`, { waitUntil: "networkidle" });
      await page.fill("input[type=text]", "Test Client");
      await page.fill("input[type=tel]", "01009780008");
      await page.fill("input[type=date]", "2026-06-15");
      await page.screenshot({ path: outFilled });
      console.log("✅ Form filled:", outFilled);

      await page.click("button[type=submit]");
      await page.waitForTimeout(600);
      await page.screenshot({ path: outSubmit });
      const confirmed = await page.$("text=Booking Received");
      console.log(confirmed ? "✅" : "❌", "Booking confirmation visible:", outSubmit);
    });
  } finally {
    server.kill();
  }
}

async function cmdLang() {
  const out = "/tmp/transform-arabic.png";
  const server = await startServer();
  try {
    await withBrowser(async (page) => {
      await page.goto(BASE, { waitUntil: "networkidle" });
      await page.click("button:has-text('عربي')");
      await page.waitForTimeout(300);
      await page.screenshot({ path: out });
      const dir = await page.evaluate(() => document.documentElement.dir);
      console.log(dir === "rtl" ? "✅" : "❌", `RTL: ${dir} — screenshot: ${out}`);
    });
  } finally {
    server.kill();
  }
}

// ── dispatch ─────────────────────────────────────────────────────────────────

const commands = { screenshot: cmdScreenshot, smoke: cmdSmoke, form: cmdForm, lang: cmdLang };

if (!commands[cmd]) {
  console.error(`Unknown command: ${cmd}`);
  console.error("Available:", Object.keys(commands).join(", "));
  process.exit(1);
}

commands[cmd](args).catch((e) => { console.error(e); process.exit(1); });
