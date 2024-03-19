"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import ToolCard from "@/components/cards/ToolCard";
import FrequentlyQuestion from "./FrequentlyQuestion";
import { getCategoryTools } from "@/services/user/toolsService";
import FeaturedToolsCard from "@/components/cards/FeaturedToolsCard";
import Button from "@/components/buttons/Button";

export default function CategoryCards({ slug, searchParams }) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [`category/${slug}/tools`, searchParams],
    async ({ pageParam = 1 }) => {
      const response = await getCategoryTools(slug, {
        ...searchParams,
        subcategory: searchParams.categories,
        page: pageParam,
      });

      queryClient.invalidateQueries(["tools-filters-count"]);

      return response.data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next) {
          return getQueryParam(lastPage.next, "page");
        }
      },
    }
  );

  const allResults = data
    ? data.pages.reduce((acc, page) => acc.concat(page.results), [])
    : [];

  return (
    <div className="space-y-6">
      {allResults?.length ? (
        <>
          <div className="grid gap-2 mt-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4">
            {allResults?.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} refetch={refetch} />
            ))}
          </div>

          {/* <Frequent lyQuestion /> */}

          {hasNextPage && (
            <Button
              variant="secondary"
              className="mx-auto"
              disabled={!hasNextPage}
              onClick={fetchNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More Tools"}
            </Button>
          )}
        </>
      ) : (
        <p>Oops! Nothing Found.</p>
      )}
    </div>
  );
}
