import { domain } from "@/constants/seo";
import { getPublicStorage } from "@/services/publicServices";

export default async function robots() {
  const is_noindex = await getPublicStorage().then(
    (res) => res.data.home_page.is_noindex
  );

  return {
    rules: {
      userAgent: "*",
      allow: is_noindex ? "" : "/",
      disallow: is_noindex ? "/" : "/admin/",
    },
    sitemap: domain + "/sitemap.xml",
  };
}
