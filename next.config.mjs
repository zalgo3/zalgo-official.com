// Security headers live in public/_headers: a static export cannot set them
// from next.config, so Cloudflare Pages applies them instead.
export default {
    // Every page is generated at build time, so ship plain static files to
    // Cloudflare Pages instead of paying for a Next.js server runtime.
    output: 'export',
    // 5 minutes is a generous per-page ceiling now that affiliate lookups are
    // cached and the post list is no longer re-read per page; the previous
    // 3600s masked those slow builds.
    staticPageGenerationTimeout: 300,
    reactStrictMode: true,
    images: {
        // No image optimization server exists in a static export.
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'thumbnail.image.rakuten.co.jp',
                port: '',
                pathname: '/**',
            },
            {
                // The Rakuten Product Search API (20250801) returns product
                // images on this CDN host; without it next/image rejects them
                // and the product thumbnails render blank.
                protocol: 'https',
                hostname: 'r.r10s.jp',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
