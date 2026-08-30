import type { Metadata } from 'next';
import { ImageStreamHero } from '@/components/ui/image-stream-hero';
import { CoverFlowCarousel, type CarouselItem } from '@/components/ui/3-d-coverflow-carousel';

/**
 * Preview route for the two imported components, wired to real captures.
 *
 * Deliberately NOT on the home page. Both ship their own hard-coded visual
 * language — the coverflow in particular is inline-styled to a near-black and
 * gold restaurant theme — and dropping either straight into the editorial
 * paper/ink/amber page would read as two different websites bolted together.
 * This route lets the components be judged on their own before deciding what,
 * if anything, gets adapted into the site proper.
 *
 * Every image here is Mehdi's own public work. The NDA client properties are
 * absent by design; see scripts/capture.mjs for the full reasoning.
 */
export const metadata: Metadata = {
  title: 'Component lab — Mehdi Boudar',
  robots: { index: false, follow: false },
};

const STREAM = [
  { src: '/captures/safq-ai-desktop.webp', alt: 'safq.ai product dashboard' },
  { src: '/images/flow-conversation.webp', alt: 'Message routing illustration' },
  { src: '/captures/ecommerce-consultant-desktop.webp', alt: 'E-commerce audit consultant' },
  { src: '/images/flow-orchestration.webp', alt: 'Model failover illustration' },
  { src: '/captures/mehdiboudar-desktop.webp', alt: 'Portfolio site' },
  { src: '/images/flow-crm.webp', alt: 'CRM record illustration' },
  { src: '/captures/mcp-zoho-desktop.webp', alt: 'Zoho MCP Gateway' },
  { src: '/captures/safq-ai-mobile.webp', alt: 'safq.ai on mobile' },
];

const PRODUCTS: CarouselItem[] = [
  {
    tag: '#SaaS',
    titleLine1: 'SAFQ.AI',
    titleLine2: '— AI ORCHESTRATION',
    desc: 'Next.js SaaS over the AI backend: Stripe billing, NextAuth, Prisma, campaign APIs',
    img: '/captures/safq-ai-desktop.webp',
    ctaText: 'Visit site',
    ctaUrl: 'https://safq.ai',
  },
  {
    tag: '#AIProduct',
    titleLine1: 'AUDIT CONSULTANT',
    titleLine2: '— SHOPIFY GROWTH',
    desc: 'Connects to a store, reads competitor catalogs and live ads, returns a cited diagnosis',
    img: '/captures/ecommerce-consultant-desktop.webp',
    ctaText: 'Visit site',
    ctaUrl: 'https://ecommerce-consultant.vercel.app',
  },
  {
    tag: '#Protocol',
    titleLine1: 'ZOHO MCP GATEWAY',
    titleLine2: '— MULTI-ACCOUNT',
    desc: 'Model Context Protocol server federating several CRM accounts behind one interface',
    img: '/captures/mcp-zoho-desktop.webp',
    ctaText: 'Visit site',
    ctaUrl: 'https://zoho-mcp-centralizer-production.up.railway.app/admin/login',
  },
  {
    tag: '#Portfolio',
    titleLine1: 'MEHDIBOUDAR.COM',
    titleLine2: '— THIS SITE',
    desc: 'Next.js 16, scroll-scrubbed 3D, Lenis and GSAP, statically prerendered',
    img: '/captures/mehdiboudar-desktop.webp',
    ctaText: 'Visit site',
    ctaUrl: 'https://mehdiboudar.com',
  },
];

export default function LabPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="mx-auto max-w-[88rem] px-6 pt-32 pb-12 lg:px-12">
        <p className="eyebrow">
          <span className="text-amber">Lab</span> — imported components
        </p>
        <h1 className="display mt-5 max-w-[20ch] text-[clamp(2.2rem,5vw,4rem)]">
          Two candidates, real assets.
        </h1>
        <p className="mt-6 max-w-[62ch] leading-relaxed text-ink-soft">
          Both are running against actual captures of shipped work. Neither is on the
          home page yet: each carries its own colour language, and the coverflow in
          particular is inline-styled to a dark restaurant theme that would fight the
          rest of the site.
        </p>
      </section>

      <section className="mx-auto max-w-[88rem] px-6 pb-16 lg:px-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          Image stream hero
        </h2>
        <ImageStreamHero
          images={STREAM}
          className="mt-4 h-[560px] w-full rounded-lg border border-rule bg-ink"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
            <div className="px-6">
              <h3 className="text-balance text-4xl font-medium tracking-tight text-paper sm:text-5xl">
                From infrastructure
                <br />
                to interface.
              </h3>
            </div>
            <p className="max-w-md text-balance px-6 text-sm text-paper/70">
              Production AI, multi-tenant Java backends, CRM and messaging integrations,
              and the client-facing web on top of them.
            </p>
          </div>
        </ImageStreamHero>
      </section>

      <section className="mx-auto max-w-[88rem] px-6 pb-24 lg:px-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          Coverflow carousel — unmodified, showing the theme clash
        </h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-rule">
          <CoverFlowCarousel items={PRODUCTS} sectionLabel="SHIPPED WORK" />
        </div>
      </section>
    </main>
  );
}
