const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = {
    ...nextConfig,
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname),
        };
        return config;
    },
};
