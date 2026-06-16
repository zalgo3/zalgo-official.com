import {getPostAll} from 'lib/posts';
import {siteUrl} from 'lib/siteMetadata';

export const dynamic = 'force-static';

const escapeXml = (value: string): string =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

export async function GET(): Promise<Response> {
    const posts = await getPostAll({limit: 30});
    const items = posts
        .map(post => {
            const link = `${siteUrl}/blog/${post.data.slug}`;
            return `
        <item>
            <title>${escapeXml(post.data.title)}</title>
            <link>${link}</link>
            <guid>${link}</guid>
            <category>${escapeXml(post.data.category)}</category>
            <pubDate>${new Date(post.data.createdAt * 1000).toUTCString()}</pubDate>
            <description>${escapeXml(post.data.excerpt)}</description>
        </item>`;
        })
        .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>ざるご Official Website - ブログ</title>
        <link>${siteUrl}/blog</link>
        <description>歌い手/ゲーム実況者/データサイエンティストであるざるごのブログ</description>
        <language>ja</language>${items}
    </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    });
}
