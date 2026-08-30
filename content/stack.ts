export type StackLayer = {
  index: string;
  title: string;
  /** One line a non-technical reader can follow. */
  blurb: string;
  items: string[];
};

/**
 * The messaging platform read top to bottom, from the surface a customer
 * touches down to the runtime underneath. Rendered as separating planes so the
 * depth is the point: this is one system, not a set of disconnected features.
 */
export const stackLayers: StackLayer[] = [
  {
    index: '01',
    title: 'Channels',
    blurb: 'Where the customer actually is, all feeding one conversation.',
    items: ['WhatsApp', 'Instagram', 'Messenger', 'Web chat', '8 channels total'],
  },
  {
    index: '02',
    title: 'Compliance',
    blurb:
      'The rules Meta enforces before a business may message anyone, handled ' +
      'so a campaign is never throttled or blocked.',
    items: [
      'Meta Cloud API',
      'Official coexistence',
      'Template approval',
      'Rate limiting & retry',
      '100+ webhooks/sec',
    ],
  },
  {
    index: '03',
    title: 'Orchestration',
    blurb:
      'The reasoning layer. A degraded provider downgrades the answer instead ' +
      'of ending the conversation.',
    items: [
      'Multi-model routing',
      'Agentic function calling',
      'Five-tier failover',
      'Deterministic fallback',
      'Nightly LLM judge',
    ],
  },
  {
    index: '04',
    title: 'Retrieval',
    blurb:
      'Finding the right answer in the client’s own material, including when ' +
      'the question mixes two languages mid-sentence.',
    items: ['pgvector', 'Hybrid BM25', 'HyDE expansion', 'Reranking', 'Darija & French'],
  },
  {
    index: '05',
    title: 'Systems of record',
    blurb: 'Where the outcome lands, so a conversation becomes a tracked lead or order.',
    items: ['Zoho CRM', 'Salesforce', 'Stripe', 'MCP servers', 'Idempotent webhooks'],
  },
];
