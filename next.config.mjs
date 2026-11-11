/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // The old site's hidden "Services" menu item was a 404; send it to the new development page.
      { source: '/services', destination: '/product-development', permanent: true },
    ];
  },
};
export default nextConfig;
