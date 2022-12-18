/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
