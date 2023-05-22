export default {
    staticPageGenerationTimeout: 3600,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'thumbnail.image.rakuten.co.jp',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
