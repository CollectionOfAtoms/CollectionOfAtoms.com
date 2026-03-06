import { posts } from '../../data/posts';

const SITE_URL = 'https://collectionofatoms.com';
const SITE_TITLE = 'Collection of Atoms';
const SITE_DESCRIPTION = 'Thoughts, projects, and things still becoming.';

function toRFC2822(mmddyyyy) {
  const [m, d, y] = mmddyyyy.split('/');
  return new Date(y, m - 1, d).toUTCString();
}

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const published = posts.filter((p) => p.status === 'Published' && p.listed);

  const items = published
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.id}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRFC2822(post.date)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join('');

  const lastBuildDate = published.length
    ? toRFC2822(published[0].date)
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
