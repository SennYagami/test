/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'], // Only run ESLint on the 'src' directories during production builds (next build)
  },
  images: {
    unoptimized: true
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/landing-page/landing-page-with-components',
  //     },
  //   ]
  // },
  // redirects() {
  //   const sourcesRequiringAuthToken = [
  //     '/',
  //     '/landing-page/:slug*',
  //     '/blog/:path*',
  //   ]

  //   return process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY
  //     ? [
  //         {
  //           source: '/missing-token',
  //           destination: '/',
  //           permanent: false,
  //         },
  //       ]
  //     : sourcesRequiringAuthToken.map((source) => ({
  //         source: source,
  //         destination: '/missing-token',
  //         permanent: false,
  //       }))
  // },
  // images: {
  //   domains: ['cdn.buttercms.com'],
  // },
}

module.exports = nextConfig
