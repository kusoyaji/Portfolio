/** Mobile pass. Same idea as review.mjs, at 390x844. */
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const base = process.argv[2] ?? 'http://localhost:3211';
const OUT = path.join(process.cwd(), '.review');

const shots = [
  { name: 'm-fold', url: '/', scroll: 0 },
  { name: 'm-work', url: '/', scroll: 2.6 },
  { name: 'm-showcase', url: '/', scroll: 5 },
  { name: 'm-case', url: '/work/whatsapp-crm-layer', scroll: 0 },
  { name: 'm-diagram', url: '/work/whatsapp-crm-layer', scroll: 3 },
];

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });
const context = await browser.newContext({ ...devices['iPhone 13'] });
const page = await context.newPage();

for (const shot of shots) {
  await page.goto(base + shot.url, { waitUntil: 'networkidle' });
  await page.evaluate((n) => window.scrollTo(0, n * window.innerHeight), shot.scroll);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(OUT, `${shot.name}.png`) });
  console.log(`ok ${shot.name}`);
}

await browser.close();
