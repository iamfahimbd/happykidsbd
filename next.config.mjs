const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "happykidsbd.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "kidswearbd.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
