export default {
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
        const { isServer } = options;

        if (isServer) {
            config.node = Object.assign({}, config.node, {
                __dirname: false,
                __filename: false,
            });
            config.module.rules.unshift({
                test: /\.(m?js|node)$/,
                parser: { amd: false },
            });
        }
        return config;
    },
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 5000,
            aggregateTimeout: 300,
        }

        return config
    },
};
