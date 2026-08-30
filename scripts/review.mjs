/**
 * Local visual review. Shoots the built site at several scroll depths so the
 * whole page can be looked at, not just the fold.
 *
 * Usage: node scripts/review.mjs [baseUrl]
 * Output lands in .review/ which is gitignored — these are working images.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const base = process.argv[2] ?? 'http://localhost:3210';
const OUT = path.join(process.cwd(), '.review');

const shots = [
  { name: 'home-fold', url: '/', scroll: 0 },
  { name: 'home-proof', url: '/', scroll: 1 },
  { name: 'home-work', url: '/', scroll: 2 },
  { name: 'home-showcase', url: '/', scroll: 3.4 },
  { name: 'home-capabilities', url: '/', scroll: 6.2 },
  { name: 'home-experience', url: '/', scroll: 7.6 },
  { name: 'home-about', url: '/', scroll: 9.4 },
  { name: 'home-contact', url: '/', scroll: 10.6 },
  { name: 'case-hero', url: '/work/whatsapp-crm-layer', scroll: 0 },
  { name: 'case-diagram', url: '/work/whatsapp-crm-layer', scroll: 1.6 },
  { name: 'case-failover', url: '/work/conversational-ai-platform', scroll: 1.5 },
];

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

for (const shot of shots) {
  await page.goto(base + shot.url, { waitUntil: 'networkidle' });
  await page.evaluate((n) => window.scrollTo(0, n * window.innerHeight), shot.scroll);
  // Reveal animations are viewport-triggered; give them time to resolve.
  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(OUT, `${shot.name}.png`) });
  console.log(`ok ${shot.name}`);
}

await browser.close();
