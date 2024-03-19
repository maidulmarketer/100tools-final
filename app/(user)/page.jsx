import { dehydrate, Hydrate } from "@tanstack/react-query";

import getQueryClient from "../getQueryClient";
import { getCategories } from "@/services/admin/categoryService";
import { getFeatures } from "@/services/admin/featureService";
import { getCounts, getUserTools } from "@/services/user/toolsService";

import Banner from "./components/Banner";
import Cards from "./components/Cards";
import Container from "@/components/wrappers/Container";
import SearchAndFilter from "./components/SearchAndFilters";
import Scroll from "./components/Scroll";

export default async function HomePage({ searchParams }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(["user-tools", searchParams], () =>
    getUserTools({
      ...searchParams,
      subcategory: searchParams.categories,
      page: 1,
    }).then((res) => res.data)
  );

  await queryClient.prefetchQuery(["tools-filters-count"], () =>
    getCounts().then((res) => res.data)
  );

  await queryClient.prefetchQuery(["category-filter"], () =>
    getCategories().then((res) => res.data)
  );

  await queryClient.prefetchQuery(["feature-filter"], () =>
    getFeatures().then((res) => res.data)
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <Scroll searchParams={searchParams}>
      <Container>
        <Hydrate state={dehydratedState}>
        <SearchAndFilter searchParams={searchParams} />
          <Cards searchParams={searchParams} />
        </Hydrate>
      </Container>
    </Scroll>
  );
}
