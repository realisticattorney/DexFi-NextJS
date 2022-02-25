module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.trustwalletapp.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
