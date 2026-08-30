export type FlowStep = {
  index: string;
  /** What it is, in the fewest words. */
  title: string;
  /** Written for someone non-technical. This is the line that has to land. */
  plain: string;
  /** The engineering underneath, for the reader who wants it. */
  detail: string[];
  image: string;
  alt: string;
};

/**
 * The platform explained end to end, in the order a customer experiences it.
 *
 * This replaced two abstract "plates" that looked good and told the reader
 * nothing. A hiring manager gives a portfolio seconds, so each step leads with
 * a plain-language sentence and keeps the engineering underneath it.
 */
export const flow: FlowStep[] = [
  {
    index: '01',
    title: 'The message arrives',
    plain:
      'A customer writes on WhatsApp, Instagram or Messenger. All eight channels land in '
      + 'one conversation, so nobody is checking three different inboxes.',
    detail: [
      'Meta WhatsApp Cloud API',
      'Official coexistence — the Business app and the API share one number',
      'Template and opt-in compliance',
      '100+ webhooks per second at 99.9% uptime',
    ],
    image: '/images/flow-conversation.webp',
    alt: 'Illustration: a phone showing a chat thread, its messages routed through '
      + 'three paths that converge into a single highlighted block.',
  },
  {
    index: '02',
    title: 'The agent answers',
    plain:
      'An AI agent qualifies the lead and replies in the customer’s own language, at any '
      + 'hour. If a model provider degrades, the conversation steps down to the next one '
      + 'instead of dying.',
    detail: [
      'Multi-model orchestration with five-tier failover',
      'Deterministic fallback so a bad provider degrades the answer, never the thread',
      'Hybrid retrieval — BM25 and HyDE over pgvector',
      'Handles Darija and French mixed mid-sentence',
      'A nightly LLM judge scores conversations and gates releases',
    ],
    image: '/images/flow-orchestration.webp',
    alt: 'Illustration: a source node feeding several parallel rails; one rail breaks and '
      + 'the flow steps down to the next, still reaching the end.',
  },
  {
    index: '03',
    title: 'It becomes a record',
    plain:
      'The conversation lands in the client’s CRM as a structured lead or order with the '
      + 'fields already filled in. The sales team keeps working where they already work.',
    detail: [
      'Zoho CRM and Salesforce pipelines over OAuth2 and HMAC',
      'Per-tenant field mapping',
      'Idempotent webhooks — a redelivery never duplicates a record',
      'Click-to-WhatsApp ad attribution carried into the record',
    ],
    image: '/images/flow-crm.webp',
    alt: 'Illustration: a stack of chat bubbles feeding a structured record whose fields '
      + 'are being populated.',
  },
];

/** The number the whole sequence exists to move. */
export const flowOutcome = {
  value: '58%',
  against: '30%',
  label:
    'lead-to-visit conversion, measured against a human team working office hours '
    + 'on the same funnel',
};
