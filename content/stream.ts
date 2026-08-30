import type { StreamImage } from '@/components/ui/image-stream-hero';

/**
 * The hero corridor's cards.
 *
 * All portrait: the corridor's cards are 18x25, so a landscape source would be
 * cropped to an unreadable vertical slice. The real product shots are therefore
 * the mobile captures, which are already the right shape.
 *
 * Ordered so a real product lands between every pair of drawn plates. Both
 * rails run the same sequence, so this alternation is what the viewer sees
 * mirrored on each side.
 *
 * NDA client properties are absent by design — see scripts/capture.mjs.
 */
export const streamImages: StreamImage[] = [
  { src: '/images/art-inbox.webp', alt: 'Conversation threads at scale' },
  { src: '/captures/safq-ai-mobile.webp', alt: 'safq.ai' },
  { src: '/images/art-topology.webp', alt: 'Service topology' },
  { src: '/captures/ecommerce-consultant-mobile.webp', alt: 'E-commerce audit consultant' },
  { src: '/images/art-pipeline.webp', alt: 'Ingestion pipeline' },
  { src: '/images/art-retrieval.webp', alt: 'Vector retrieval' },
  { src: '/captures/mcp-zoho-mobile.webp', alt: 'Zoho MCP Gateway' },
  { src: '/images/art-tests.webp', alt: 'Automated test matrix' },
  { src: '/images/art-deploy.webp', alt: 'Deployed services' },
  { src: '/captures/mehdiboudar-mobile.webp', alt: 'This site' },
  { src: '/images/art-dashboard.webp', alt: 'Delivery analytics' },
  { src: '/images/art-crm.webp', alt: 'CRM pipeline' },
];
