import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      })
    );
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/((?!admin|api)):path*",
        destination: "/:tenant/:path*",
        has: [
          {
            type: "host",
            value: "(?<tenant>.*)",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["localhost", "upload.wikimedia.org", "img.logo.dev"],
  },
};

export default withPayload(nextConfig);
