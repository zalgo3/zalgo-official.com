import path from 'path';

export default {
    staticPageGenerationTimeout: 3600,
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/images/I/**',
            },
        ],
    },
    webpack: (config, options) => {
        config.module.rules.unshift({
            test: /\.js$/,
            include: [path.resolve('node_modules/paapi5-nodejs-sdk')],
            parser: {amd: false},
        });
        return config;
    },
};
