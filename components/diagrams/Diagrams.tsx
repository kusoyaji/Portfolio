'use client';

import { motion, useReducedMotion, type Transition } from 'motion/react';
import type { DiagramKey } from '@/content/projects';
import { EASE_OUT } from '@/components/motion/Reveal';
import { FailoverSequence } from '@/components/diagrams/FailoverSequence';

/*
 * Hand-authored diagrams rather than screenshots: they explain the shape of a
 * system more clearly than a UI capture, and they carry no client data, so
 * nothing here can leak.
 *
 * Everything is stroked in currentColor so a diagram works on paper and on the
 * inverted sections without a second copy.
 */

const VIEWPORT = { once: true, margin: '0px 0px -100px 0px' } as const;

const draw: Transition = { duration: 0.9, ease: EASE_OUT };

function Frame({
  children,
  viewBox,
  caption,
}: {
  children: React.ReactNode;
  viewBox: string;
  caption: string;
}) {
  return (
    <figure className="my-14 lg:my-20">
      <div className="relative">
        {/*
          Below ~36rem the diagram has to scroll — shrinking it to fit renders
          the labels at ~5px, which is worse than scrolling. tabIndex makes the
          region reachable without a pointer, which a scrollable box needs.
        */}
        <div
          tabIndex={0}
          role="group"
          aria-label={caption}
          className="overflow-x-auto rounded-xl border border-rule bg-paper-deep/60 px-5 py-8 lg:px-8 lg:py-10"
        >
          <svg
            viewBox={viewBox}
            role="img"
            aria-label={caption}
            className="mx-auto block h-auto w-full min-w-[36rem] max-w-4xl text-ink"
          >
            {children}
          </svg>
        </div>

        {/* Edge fade: the only honest signal that there is more to the right. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-px right-px w-16 rounded-r-xl bg-gradient-to-l from-paper to-transparent sm:hidden"
        />
      </div>

      <figcaption className="mt-4 font-mono text-[11px] leading-relaxed text-ink-faint">
        <span aria-hidden className="mr-1.5 sm:hidden">
          swipe →
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

function Node({
  x,
  y,
  w = 150,
  h = 62,
  label,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={accent ? 'rgba(180,83,9,0.07)' : 'transparent'}
        stroke={accent ? '#b45309' : 'currentColor'}
        strokeOpacity={accent ? 1 : 0.28}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        className="font-mono"
        fontSize={11}
        fill="currentColor"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          className="font-mono"
          fontSize={9}
          fill="currentColor"
          fillOpacity={0.5}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** A line that draws itself, then carries a repeating pulse along its length. */
function Link({
  d,
  delay = 0,
  pulse = true,
  reverse = false,
  reduced,
}: {
  d: string;
  delay?: number;
  pulse?: boolean;
  reverse?: boolean;
  reduced: boolean | null;
}) {
  return (
    <g>
      {/* `initial` becomes server-rendered markup, so it must not depend on
          useReducedMotion — that hook is null on the server and true on a
          reduced-motion client, which is a hydration mismatch. Only the
          transition varies, and transitions are client-side only. */}
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.28}
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT}
        transition={reduced ? { duration: 0 } : { ...draw, delay }}
      />
      {pulse && (
        <motion.circle
          r={3}
          fill="#b45309"
          className="motion-reduce:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={reduced ? { duration: 0 } : { delay: delay + 0.6 }}
        >
          <animateMotion
            dur="2.6s"
            begin={`${delay + 0.6}s`}
            repeatCount="indefinite"
            path={d}
            keyPoints={reverse ? '1;0' : '0;1'}
            keyTimes="0;1"
            calcMode="linear"
          />
        </motion.circle>
      )}
    </g>
  );
}

export function CoexistenceDiagram() {
  const reduced = useReducedMotion();
  return (
    <Frame
      viewBox="0 0 800 240"
      caption="Coexistence: the business app on the phone and the Cloud API share one number, with history synced in both directions."
    >
      <Node x={20} y={89} label="Business app" sub="on the owner’s phone" />
      <Node x={325} y={80} w={150} h={80} label="One number" sub="Meta coexistence" accent />
      <Node x={630} y={89} label="Our platform" sub="Cloud API + agent" />

      <Link d="M 170 108 L 325 108" delay={0.1} reduced={reduced} />
      <Link d="M 325 132 L 170 132" delay={0.2} reverse reduced={reduced} />
      <Link d="M 475 108 L 630 108" delay={0.15} reduced={reduced} />
      <Link d="M 630 132 L 475 132" delay={0.25} reverse reduced={reduced} />

      <text x={247} y={40} textAnchor="middle" className="font-mono" fontSize={9} fill="currentColor" fillOpacity={0.45}>
        replies from the phone
      </text>
      <text x={553} y={40} textAnchor="middle" className="font-mono" fontSize={9} fill="currentColor" fillOpacity={0.45}>
        automated replies
      </text>
      <text x={400} y={205} textAnchor="middle" className="font-mono" fontSize={9} fill="currentColor" fillOpacity={0.45}>
        message history and media stay in sync across both
      </text>
    </Frame>
  );
}

export function FailoverDiagram() {
  const reduced = useReducedMotion();
  const tiers = [
    { label: 'Gemini 3 Pro', sub: 'primary' },
    { label: 'Claude', sub: 'tier 2' },
    { label: 'Gemini Flash', sub: 'tier 3' },
    { label: 'GPT-4o-mini', sub: 'tier 4' },
    { label: 'Deterministic', sub: 'always answers' },
  ];

  return (
    <Frame
      viewBox="0 0 800 200"
      caption="Five-tier failover. Each tier is a complete fallback rather than a retry, so provider degradation or outage does not interrupt service."
    >
      {tiers.map((tier, i) => {
        const x = 8 + i * 158;
        return (
          <motion.g
            key={tier.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={
              reduced ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT, delay: i * 0.08 }
            }
          >
            <Node x={x} y={70} w={140} h={62} label={tier.label} sub={tier.sub} accent={i === 0} />
          </motion.g>
        );
      })}

      {[0, 1, 2, 3].map((i) => (
        <Link
          key={i}
          d={`M ${148 + i * 158} 101 L ${166 + i * 158} 101`}
          delay={0.3 + i * 0.08}
          pulse={false}
          reduced={reduced}
        />
      ))}

      <text x={400} y={168} textAnchor="middle" className="font-mono" fontSize={9} fill="currentColor" fillOpacity={0.45}>
        seven agentic tools remain available at every tier
      </text>
    </Frame>
  );
}

export function FederationDiagram() {
  const reduced = useReducedMotion();
  const tenants = ['Tenant A', 'Tenant B', 'Tenant C'];

  return (
    <Frame
      viewBox="0 0 800 300"
      caption="One Model Context Protocol surface federating several CRM tenants, with per-user tokens keeping each person inside their own permissions."
    >
      <Node x={20} y={119} label="AI client" sub="Claude" />
      <Node x={310} y={110} w={160} h={80} label="MCP centralizer" sub="per-user token auth" accent />

      <Link d="M 170 150 L 310 150" delay={0.1} reduced={reduced} />

      {tenants.map((tenant, i) => {
        const y = 40 + i * 90;
        return (
          <g key={tenant}>
            <Link
              d={`M 470 150 C 540 150, 560 ${y + 31}, 620 ${y + 31}`}
              delay={0.25 + i * 0.1}
              reduced={reduced}
            />
            <Node x={620} y={y} w={150} h={62} label={tenant} sub="Zoho CRM" />
          </g>
        );
      })}
    </Frame>
  );
}

export function RetrievalDiagram() {
  const reduced = useReducedMotion();
  const lanes = [
    { label: 'Semantic', sub: 'pgvector' },
    { label: 'Lexical', sub: 'BM25' },
    { label: 'HyDE', sub: 'hypothetical doc' },
  ];

  return (
    <Frame
      viewBox="0 0 800 300"
      caption="Hybrid retrieval. Semantic search resolves meaning, lexical search matches exact model and part numbers, HyDE handles queries phrased in absent terms; nine validation layers run before any response is returned."
    >
      <Node x={10} y={119} w={120} label="Question" />

      {lanes.map((lane, i) => {
        const y = 40 + i * 90;
        return (
          <g key={lane.label}>
            <Link
              d={`M 130 150 C 180 150, 195 ${y + 31}, 250 ${y + 31}`}
              delay={0.1 + i * 0.08}
              reduced={reduced}
            />
            <Node x={250} y={y} w={150} h={62} label={lane.label} sub={lane.sub} />
            <Link
              d={`M 400 ${y + 31} C 455 ${y + 31}, 470 150, 520 150`}
              delay={0.3 + i * 0.08}
              reduced={reduced}
            />
          </g>
        );
      })}

      <Node x={520} y={110} w={130} h={80} label="9-layer" sub="validation" accent />
      <Link d="M 650 150 L 700 150" delay={0.55} reduced={reduced} />
      <Node x={700} y={119} w={90} label="Answer" />
    </Frame>
  );
}

export function Diagram({ kind }: { kind: DiagramKey }) {
  switch (kind) {
    case 'coexistence':
      return <CoexistenceDiagram />;
    // The failover chain is scrubbed rather than drawn: scroll position stands in
    // for the request's position through the tiers.
    case 'failover':
      return <FailoverSequence />;
    case 'federation':
      return <FederationDiagram />;
    case 'retrieval':
      return <RetrievalDiagram />;
  }
}
