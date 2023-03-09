/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fi-FI",],
    defaultLocale: "fi-FI",
  },
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
};

module.exports = nextConfig;
