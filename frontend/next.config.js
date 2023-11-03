/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig,
  publicRuntimeConfig: {
    version: process.env.npm_package_version
  }
}
