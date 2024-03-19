/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "abbappii.pythonanywhere.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "testapi.100aitools.io",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    const redirectsData = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/me/redirect",
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((data) =>
        data.map((el) => ({
          source: el.old,
          destination: el.new,
          permanent: el.is_permanent,
        }))
      );

    return redirectsData || [];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
  use: [{loader: '@svgr/webpack', options: {icon: true}}],
    });
  
    return config;
  },
}; 

module.exports = nextConfig;
