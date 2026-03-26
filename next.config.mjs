/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  experimental : {
    serverComponentsHmrCache : false,// default to true
  },
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jdkxkcoijactdaptblrm.supabase.co",
      },
    ],
  }
};

export default nextConfig;
