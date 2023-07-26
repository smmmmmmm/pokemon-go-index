const urlPrefix = process.env.NEXT_PUBLIC_HOSTING_URL
  ? process.env.NEXT_PUBLIC_HOSTING_URL
  : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true, // importした画像の型定義設定を無効にする
  },
  publicRuntimeConfig: { urlPrefix },
  trailingSlash: true,
};

module.exports = nextConfig;
