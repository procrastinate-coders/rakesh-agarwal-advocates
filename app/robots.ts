import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

// Search engines plus the crawlers behind ChatGPT, Claude, Perplexity,
// Gemini and Apple Intelligence — all welcome on the public pages.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['*', 'Googlebot', 'Bingbot', ...AI_CRAWLERS],
        allow: '/',
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
