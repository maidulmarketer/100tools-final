"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import ToolCard from "@/components/cards/ToolCard";
import { getUserTools } from "@/services/user/toolsService";
import { getQueryParam } from "@/lib/utils";
import Button from "@/components/buttons/Button";
import FeaturedToolsCard from "@/components/cards/FeaturedToolsCard";

export default function Cards({ searchParams }) {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    ["user-tools", searchParams],
    async ({ pageParam = 1 }) => {
      const response = await getUserTools({
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
    <div className="space-y-8">
      {allResults?.length ? (
        <>
          <div className="grid mt-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 bg-dtheme">
            {/* <FeaturedToolsCard/> */}
            {allResults?.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} refetch={refetch} />
            ))}
          </div>

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
        <p className="text-center font-bold pt-5">Oops! Nothing Found....</p>
      )}
    </div>
  );
}
