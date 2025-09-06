module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  experimental: {
    optimizeCss: true,
  },
  // Increase build timeout for font downloads
  staticPageGenerationTimeout: 120,
};