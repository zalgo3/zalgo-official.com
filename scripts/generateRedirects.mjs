import fs from 'fs';
import path from 'path';

// Old blog URLs lived at the site root (/<slug>); they now live at
// /blog/<slug>. A static export has no middleware, so emit one Cloudflare
// Pages redirect rule per post instead.
const postsDirectory = path.join(process.cwd(), 'posts');
const rules = fs
    .readdirSync(postsDirectory)
    .filter(slug => fs.existsSync(path.join(postsDirectory, slug, 'post.md')))
    .sort()
    .map(slug => `/${slug} /blog/${slug} 301`);

fs.writeFileSync(
    path.join(process.cwd(), 'public/_redirects'),
    `${rules.join('\n')}\n`
);
