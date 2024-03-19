export const domain =
  process.env.NEXT_PUBLIC_DOMAIN || "https://aitools-staging.vercel.app";

export const staticSitemapData = [
  {
    path: "",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/ai-tools",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/newsletter",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/tools",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/blogs",
    changeFrequency: "monthly",
    priority: 1,
  },
];
