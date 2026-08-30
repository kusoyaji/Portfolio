import { metrics } from '@/content/profile';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';

/**
 * The first inversion. Numbers a recruiter can quote in a hiring meeting
 * without needing to understand what produced them.
 */
export function Proof() {
  return (
    <section aria-label="Track record" className="bg-ink text-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-20 lg:px-12 lg:py-28">
        <Stagger className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="border-t border-rule-invert pt-5">
                <p className="display text-5xl text-paper lg:text-6xl">
                  <Counter value={metric.value} />
                </p>
                <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-paper/70">
                  {metric.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
