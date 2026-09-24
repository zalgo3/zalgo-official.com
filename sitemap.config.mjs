/** @type {import('next-sitemap').IConfig} */
export default {
    siteUrl: 'https://zalgo-official.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    // Write next to the static export so the sitemap and robots.txt ship.
    outDir: 'out',
};
