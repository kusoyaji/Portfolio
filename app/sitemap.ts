import type { MetadataRoute } from 'next';
import { caseStudies } from '@/content/projects';
import { profile } from '@/content/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.links.site;
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${base}/work/${study.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
