import { dehydrate, Hydrate } from "@tanstack/react-query";

import getQueryClient from "@/app/getQueryClient";
import {
  getCategoryTools,
  getCategoryToolText,
} from "@/services/user/toolsService";
import Container from "@/components/wrappers/Container";
import SearchAndFilter from "../../components/SearchAndFilters";
import CategoryCards from "./components/CategoryCards";
import CategoryHeaderText from "./components/CategoryHeaderText";
import { domain } from "@/constants/seo";
import { getSubCategory } from "@/services/admin/subCategoryService";
import Banner from "../../components/Banner";

export async function generateMetadata({ params: { slug } }) {
  const data = await getSubCategory(slug).then((res) => res.data);

  return {
    robots: {
      index: !data.is_noindex,
      googleBot: {
        index: !data.is_noindex,
      },
    },
    alternates: {
      canonical: domain + "/ai-tools/" + slug,
    },
  };
}

export default async function subCategoryDetails({
  params: { slug },
  searchParams,
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    [`category/${slug}/tools`, searchParams],
    () =>
      getCategoryTools(slug, { ...searchParams, page: 1 }).then(
        (res) => res.data
      )
  );

  await queryClient.prefetchQuery([`category/${slug}/tools/text`], () =>
    getCategoryToolText(slug).then((res) => res.data)
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <Container className="pb-0 md:pb-0">
      <Hydrate state={dehydratedState}>
        <CategoryHeaderText slug={slug} />
        <SearchAndFilter categorySlug={slug} />
        <CategoryCards slug={slug} searchParams={searchParams} />
      </Hydrate>
    </Container>
  );
}
