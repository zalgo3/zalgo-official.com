/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
};

export default nextConfig;
