export default {
    staticPageGenerationTimeout: 3600,
    reactStrictMode: true,
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
