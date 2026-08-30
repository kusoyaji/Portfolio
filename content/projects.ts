export type DiagramKey = 'coexistence' | 'failover' | 'federation' | 'retrieval';

export type CaseSection = {
  heading: string;
  body: string[];
  diagram?: DiagramKey;
  /** Rendered as a full-bleed statement between sections. Factual, not editorial. */
  pull?: string;
};

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  /** One sentence that must land with a non-technical reader. */
  lede: string;
  role: string;
  period: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  sections: CaseSection[];
  links?: { label: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'platform-turnaround',
    index: '01',
    title: 'Meta-compliant messaging at scale',
    kicker: 'Platform engineering',
    lede:
      'The campaign and broadcast subsystem of a multi-tenant WhatsApp platform, ' +
      're-engineered around the rate limits, quality ratings and opt-in rules Meta ' +
      'enforces on every business account.',
    role: 'Platform engineer',
    period: '2026 — present',
    metrics: [
      { value: '20k', label: 'contacts per broadcast, reliably' },
      { value: '100k', label: 'contacts per import operation' },
      { value: '10+', label: 'enterprise tenants' },
    ],
    stack: [
      'Ruby on Rails',
      'Java 21',
      'Spring Boot',
      'Meta WhatsApp Cloud API',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    sections: [
      {
        heading: 'What Meta enforces',
        body: [
          'WhatsApp is not an open channel. Meta applies per-second rate limits, daily ' +
            'conversation caps, opt-in requirements, and a quality rating that degrades a ' +
            'number until it is throttled or blocked outright. Template sends are checked ' +
            'against approval status and variable structure before delivery.',
          'A send path that approximates these rules rather than implementing them will ' +
            'work in testing and fail in production, and the failure mode is not a dropped ' +
            'message. It is a business account whose rating falls far enough that the ' +
            'number stops reaching customers at all.',
        ],
        pull:
          'A quality rating that degrades a number until it is throttled, or blocked outright.',
      },
      {
        heading: 'The send path',
        body: [
          'The broadcast engine is built around those constraints: rate limiting matched to ' +
            'Meta’s published limits, batching, scheduled sends, and retry logic tuned ' +
            'against observed failures rather than assumed ones.',
          'It sustains 20,000-contact broadcasts at maximum viable delivery, and the ' +
            'campaign dashboard reports sent, delivered, read and failed per message, so a ' +
            'client can see where a campaign lost people instead of guessing.',
        ],
      },
      {
        heading: 'Ingestion and attribution',
        body: [
          'Contact import takes real spreadsheets with arbitrary columns and custom fields, ' +
            'with retry and scheduling behind it, handling 100,000 contacts per operation.',
          'Meta webhook payloads are captured in full and reconciled against each ' +
            'portfolio’s ad campaigns, which is what makes Click-to-WhatsApp attribution ' +
            'possible: the platform can say which advertisement a given customer came ' +
            'from. Conversation labels sync additively rather than overwriting, and agents ' +
            'filter by campaign, template, agent or label.',
          'Templates are created and previewed inside the platform, with dynamic variables ' +
            'resolved per client. Deployment runs on separated environments with Docker ' +
            'images and volumes under version control.',
        ],
      },
    ],
  },
  {
    slug: 'whatsapp-crm-layer',
    index: '02',
    title: 'WhatsApp and CRM integration layer',
    kicker: 'Integration architecture',
    lede:
      'Enterprise clients continue using the WhatsApp Business app on their own devices ' +
      'while the same number operates through the Cloud API, with every conversation ' +
      'synchronised into their CRM.',
    role: 'Solutions & integrations engineer',
    period: '2026 — present',
    metrics: [
      { value: '500k', label: 'contacts imported in <10 min' },
      { value: '100k', label: 'messages broadcast in <30 min' },
      { value: '+15%', label: 'conversion uplift' },
    ],
    stack: [
      'Meta WhatsApp Cloud API',
      'Zoho CRM',
      'Salesforce',
      'Java 21',
      'Spring Boot',
      'Webhooks',
      'OAuth2 / HMAC',
    ],
    sections: [
      {
        heading: 'The migration constraint',
        body: [
          'Automating WhatsApp requires the Cloud API. Historically, connecting a client’s ' +
            'number to the API meant deleting both WhatsApp and WhatsApp Business for that ' +
            'number at account level. The business lost the app outright.',
          'For an automotive dealership or property developer, that means the sales team ' +
            'loses the application they use every day. The usual workarounds — abandoning ' +
            'the automation, or running it on a second number nobody advertises — both ' +
            'reduce the value of the deployment substantially.',
        ],
      },
      {
        heading: 'Coexistence',
        body: [
          'I implemented Meta’s official coexistence on the platform. The business retains ' +
            'the WhatsApp Business app on its devices while the same number simultaneously ' +
            'operates through the Cloud API and our conversation layer.',
          'Message history synchronises in both directions, including media. Replies sent ' +
            'from the device appear to the agent, and automated replies appear in the app ' +
            'thread. Existing team workflows remain unchanged, which materially improves ' +
            'adoption rates across sales organisations.',
          'The same conversation layer now also carries Instagram and Messenger, so the ' +
            'agent answers on every Meta surface a customer might arrive through, from a ' +
            'single inbox.',
        ],
        diagram: 'coexistence',
        pull:
          'One number, operating simultaneously through the Business app and the Cloud API, with history synced both ways.',
      },
      {
        heading: 'Click-to-WhatsApp attribution',
        body: [
          'When a customer initiates contact through a Click-to-WhatsApp advertisement, ' +
            'Meta delivers a webhook containing the originating ad. This payload is ' +
            'frequently discarded.',
          'I capture it and inject the ad context directly into the agent’s prompt. The ' +
            'first response therefore reflects the specific campaign and product the ' +
            'customer engaged with, rather than opening with a generic greeting and ' +
            'requiring the customer to restate their interest.',
        ],
      },
      {
        heading: 'CRM integration',
        body: [
          'Sales teams operate primarily within the CRM. I built and deployed custom Zoho ' +
            'widgets binding tenants, prospects and contacts to their conversations.',
          'From any record, an agent can open that contact’s live conversation within the ' +
            'record itself — removing tab switching, manual phone-number lookups, and ' +
            'ambiguity about whether a customer has already been answered.',
          'Custom functions and workflows dispatch approved WhatsApp templates and flows ' +
            'from CRM triggers, resolving variables per client and handling opt-in, ' +
            'delivery and read tracking. The AI agent synchronises with the prospect ' +
            'module, creating prospects automatically from qualified conversations.',
        ],
        pull:
          'Custom Zoho widgets surface a contact’s live conversation inside the CRM record itself.',
      },
      {
        heading: 'Ordering inside the conversation',
        body: [
          'For e-commerce clients the platform holds catalogue and order state in real ' +
            'time, so the agent can assemble an order inside the chat, price it, and submit ' +
            'it for processing the moment the customer confirms.',
          'The customer never leaves the thread, and no agent re-keys the order into a ' +
            'second system. The conversation and the transaction are the same surface.',
        ],
      },
      {
        heading: 'Scale and compliance',
        body: [
          'The campaign engine imports 500,000 contacts in under ten minutes and broadcasts ' +
            '100,000 template messages in under thirty, within Meta’s rate limits, with ' +
            'delivery and read tracking throughout.',
          'Bi-directional synchronisation into Zoho and Salesforce is secured with OAuth2 ' +
            'and HMAC, with per-client field mapping and an eight-condition routing engine ' +
            'determining escalation to human agents. Delivered across ten enterprise ' +
            'tenants in automotive and real estate.',
        ],
      },
    ],
  },
  {
    slug: 'conversational-ai-platform',
    index: '03',
    title: 'Multi-model conversational AI platform',
    kicker: 'Production AI',
    lede:
      'A conversational AI serving ten enterprise brands across eight channels, ' +
      'architected so that a model provider outage or degradation does not interrupt ' +
      'customer service.',
    role: 'AI engineer — design, build and test',
    period: '2026 — present',
    metrics: [
      { value: '2,645+', label: 'automated tests' },
      { value: '99.9%', label: 'uptime' },
      { value: '10+', label: 'enterprise tenants' },
    ],
    stack: [
      'Gemini',
      'Claude',
      'OpenAI',
      'Java 21',
      'Spring Boot 3.3',
      'pgvector',
      'Redis',
      'Quartz',
      'Docker',
    ],
    sections: [
      {
        heading: 'Five-tier model failover',
        body: [
          'A single model provider represents a single point of failure, and language ' +
            'models degrade in ways conventional services do not: rate limiting, reduced ' +
            'output quality, regional outages and silent truncation.',
          'The agent runs a five-tier failover chain — Gemini 3 Pro, Claude, Gemini Flash, ' +
            'GPT-4o-mini, and a deterministic path that guarantees a response. Each tier is ' +
            'a complete fallback rather than a retry, and seven agentic function-calling ' +
            'tools remain available across the chain so capability does not degrade as ' +
            'requests fall through it.',
        ],
        diagram: 'failover',
      },
      {
        heading: 'Hybrid retrieval and validation',
        body: [
          'Retrieval runs on pgvector as a hybrid pipeline: semantic search for meaning, ' +
            'BM25 lexical search for exact model names and part numbers, and HyDE for ' +
            'queries phrased in terms absent from the source material.',
          'Content is ingested with Playwright so the client’s live site remains the source ' +
            'of truth rather than a periodic export. Nine layers of output validation run ' +
            'before any response reaches a customer, as an incorrect price presented to a ' +
            'customer carries commercial and contractual risk.',
        ],
        diagram: 'retrieval',
        pull:
          'Semantic, lexical and HyDE retrieval, followed by nine validation layers before any response reaches a customer.',
      },
      {
        heading: 'Voice, vision and Darija',
        body: [
          'Customers frequently communicate through voice notes and photographs rather ' +
            'than text. GPT-4o handles transcription, Gemini TTS provides responses across ' +
            'thirty voices, and Gemini Vision matches photographed products against the ' +
            'client catalogue.',
          'The system supports Moroccan Darija, the register customers predominantly use ' +
            'in this market and one that general-purpose assistants handle poorly.',
        ],
      },
      {
        heading: 'Escalation and reliability',
        body: [
          'An eight-condition eligibility engine determines per conversation whether the AI ' +
            'continues or a human agent takes over, evaluating sentiment, deal value, ' +
            'complexity, explicit request and repetition, so escalation occurs before ' +
            'customer satisfaction degrades.',
          'The platform runs on Java 21 virtual threads and Spring Boot 3.3, with 2,645+ ' +
            'automated tests, 138 Flyway migrations, Quartz batch jobs and Resilience4j ' +
            'circuit breakers, sustaining 100+ webhooks per second at 99.9% uptime.',
        ],
      },
    ],
  },
  {
    slug: 'mcp-servers',
    index: '04',
    title: 'Model Context Protocol servers',
    kicker: 'Protocol engineering',
    lede:
      'Custom MCP servers enabling an AI assistant to perform CRM operations directly, ' +
      'across multiple company accounts, under per-user authentication.',
    role: 'Backend & protocol engineer',
    period: '2026 — present',
    metrics: [
      { value: '2', label: 'MCP servers in production' },
      { value: '18', label: 'tools on the conversation server' },
      { value: '10+', label: 'tenants federated' },
    ],
    stack: ['Model Context Protocol', 'Claude', 'TypeScript', 'Zoho CRM', 'OAuth2'],
    sections: [
      {
        heading: 'Multi-tenant federation',
        body: [
          'Groups operating several brands maintain separate CRM accounts, each with ' +
            'distinct credentials and record schemas. Querying across them conventionally ' +
            'requires accessing each account individually.',
          'The centralizer federates multiple Zoho tenants behind a single Model Context ' +
            'Protocol surface, allowing an AI client to query and act across every account ' +
            'within one session, with per-user token authentication constraining each ' +
            'operator to their own permissions.',
        ],
        diagram: 'federation',
      },
      {
        heading: 'Conversation-layer tooling',
        body: [
          'A second server exposes eighteen tools over the conversation layer, covering ' +
            'thread search, history retrieval, agent assignment, labelling and reply ' +
            'dispatch.',
          'Together these servers allow an assistant to execute CRM and messaging ' +
            'operations directly rather than describing them.',
        ],
        pull:
          'Two production MCP servers, eighteen tools, per-user token authentication across federated tenants.',
      },
    ],
    // No public link: the MCP repo is not published. Do not re-add a GitHub link
    // here until the repository actually resolves — a 404 from a CV or portfolio
    // is worse than no link at all.
  },
  {
    slug: 'client-experiences',
    index: '05',
    title: 'Product design and front-end',
    kicker: 'Product & web',
    lede:
      'Interfaces for my own products and for enterprise clients, covering design, ' +
      'front-end engineering and deployment.',
    role: 'Design & full-stack',
    period: '2024 — present',
    metrics: [
      { value: '2', label: 'own products shipped' },
      { value: '3', label: 'client platforms under NDA' },
      { value: 'Full', label: 'design-to-deploy ownership' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Motion', 'Prisma', 'Stripe', 'Railway'],
    sections: [
      {
        heading: 'safq.ai',
        body: [
          'A Next.js SaaS product built over the AI orchestration backend: Stripe billing, ' +
            'NextAuth v5, Prisma, and a dashboard proxying the conversation and campaign ' +
            'APIs.',
          'Designed and engineered end to end — interface, billing flows, infrastructure, ' +
            'domain and deployment, on the same Docker, Railway and DNS stack used for the ' +
            'backend platform.',
        ],
      },
      {
        heading: 'Client work under NDA',
        body: [
          'Several client platforms are covered by confidentiality agreements and are not ' +
            'shown publicly. The work spans scroll-driven product narratives, model and trim ' +
            'configurators, financing and affordability calculators, and location finders.',
          'Each was delivered end to end, from art direction and interface design through ' +
            'front-end engineering and deployment. Available to review privately on request.',
        ],
      },
    ],
  },
];

export type ClientSite = {
  slug: string;
  name: string;
  descriptor: string;
  url: string;
  tags: string[];
  /** Capture filenames written by scripts/capture.mjs. */
  desktop: string;
  mobile: string;
};

// Client platforms are deliberately absent: that work is under NDA and must not
// be shown publicly, named, or linked. Only my own products appear here.
export const clientSites: ClientSite[] = [
  {
    slug: 'safq-ai',
    name: 'safq.ai',
    descriptor:
      'SaaS product. Stripe billing, NextAuth v5, Prisma, and a dashboard over the AI orchestration backend.',
    url: 'https://safq.ai',
    tags: ['SaaS', 'Stripe', 'Product'],
    desktop: '/captures/safq-ai-desktop.webp',
    mobile: '/captures/safq-ai-mobile.webp',
  },
  // Named products only appear here while their URL resolves. A dead link on a
  // portfolio is worse than one fewer project — re-check before adding any entry.
];
