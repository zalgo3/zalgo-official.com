/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    images: {
        unoptimized: true,
    },
    basePath: '/zalgo-official.com',
};

module.exports = nextConfig;
