/**
 * Captures the live sites shown in the work section.
 *
 * Re-runnable: `node scripts/capture.mjs`. Rerun whenever a client site ships a
 * redesign, otherwise the portfolio quietly starts showing work that no longer
 * exists.
 *
 * Viewport shots, not full-page — they are presented inside browser chrome, and
 * a 12,000px full-page capture scaled into a window frame is unreadable.
 */
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'captures');

// Only publicly showable products of Mehdi's own.
//
// Client properties are NDA-covered and must never appear here — not the URLs,
// not the slugs, not the names, not even in a comment. This file is tracked and
// the remote is public. The authoritative list lives in .claude/redactions.txt,
// which is gitignored for exactly that reason; check a candidate URL against it
// before adding anything.
//
// Two traps worth knowing about:
//  - publish-check.sh greps the built output for redacted words. It cannot read
//    a PNG, so a screenshot of a forbidden site sails straight past it. This
//    list is the only real guard.
//  - A page can be public and still be unusable: one of Mehdi's own MCP servers
//    renders a redacted product name three times in its login screen, so its
//    capture leaked the term as pixels and had to be dropped.
const targets = [
  { slug: 'safq-ai', url: 'https://safq.ai' },
  { slug: 'mehdiboudar', url: 'https://mehdiboudar.com' },
  { slug: 'mcp-zoho', url: 'https://zoho-mcp-centralizer-production.up.railway.app/admin/login' },
  { slug: 'ecommerce-consultant', url: 'https://ecommerce-consultant.vercel.app' },
];

const viewports = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, scale: 2 },
  { name: 'mobile', ...devices['iPhone 13'], scale: 2 },
];

async function capture(browser, target, profile) {
  const context = await browser.newContext({
    ...profile,
    deviceScaleFactor: profile.scale,
    colorScheme: 'light',
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  try {
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 45_000 });
  } catch {
    // networkidle never settles on sites with polling or video; the DOM is
    // usually good enough by now, so fall through and shoot what we have.
  }

  // Nudge the page so scroll-triggered entrances resolve, then return to top.
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1800);

  const file = path.join(OUT, `${target.slug}-${profile.name}.png`);
  await page.screenshot({ path: file, animations: 'disabled' });
  await context.close();
  return file;
}

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

for (const target of targets) {
  for (const profile of viewports) {
    try {
      const file = await capture(browser, target, profile);
      console.log(`ok   ${path.basename(file)}`);
    } catch (error) {
      console.error(`FAIL ${target.slug}-${profile.name}: ${error.message}`);
    }
  }
}

await browser.close();
