const securityHeaders = [
    {key: 'X-Content-Type-Options', value: 'nosniff'},
    {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
    {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
    },
];

export default {
    // 5 minutes is a generous per-page ceiling now that affiliate lookups are
    // cached and the post list is no longer re-read per page; the previous
    // 3600s masked those slow builds.
    staticPageGenerationTimeout: 300,
    reactStrictMode: true,
    images: {
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
    headers: async () => [
        {
            source: '/:path*',
            headers: securityHeaders,
        },
    ],
};
