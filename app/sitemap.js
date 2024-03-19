import { domain, staticSitemapData } from "@/constants/seo";
import {
  getPublicBlogs,
  getPublicSubCategories,
  getPublicTools,
} from "@/services/publicServices";

export default async function sitemap() {
  const staticSiteMap = staticSitemapData.map(
    ({ path, changeFrequency, priority }) => ({
      url: domain + path,
      lastModified: new Date(),
      changeFrequency: changeFrequency,
      priority: priority,
    })
  );

  const toolSitemaps = await getPublicTools().then(({ data }) => {
    return data.map((item) => ({
      url: domain + "/tools/" + item.slug,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    }));
  });

  const blogsSitemaps = await getPublicBlogs().then(({ data }) => {
    return data.map((item) => ({
      url: domain + "/blogs/" + item.slug,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    }));
  });

  const subCategoriesSitemaps = await getPublicSubCategories().then(
    ({ data }) => {
      return data.map((item) => ({
        url: domain + "/ai-tools/" + item.slug,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      }));
    }
  );

  return [
    ...staticSiteMap,
    ...toolSitemaps,
    ...blogsSitemaps,
    ...subCategoriesSitemaps,
  ];
}
