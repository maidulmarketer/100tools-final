"use client";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import ToolCard from "@/components/cards/ToolCard";
import Container from "@/components/wrappers/Container";
import { getLovedTools } from "@/services/user/toolsService";
import { useQuery } from "@tanstack/react-query";

export default function Favorites() {
  const {
    isLoading,
    data: lovedTools,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorite-tools"],
    queryFn: () => getLovedTools().then((res) => res.data),
  });

  if (isLoading) return "Loading.....";

  return (
    <Container className="pt-14 pb-8 flex flex-col gap-9 bg-radials min-h-screen">
      <Breadcrumb/>
      <h1 className="text-4xl font-bold">Favorite</h1>
      <h2>
        These are the tools and posts you have favourited. You can remove them
        from your favourites by clicking the bookmark icon.
      </h2>

      {lovedTools.count ? (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-4 mt-6">
          {lovedTools?.results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} refetch={refetch} />
          ))}
        </div>
      ) : (
        <p className="text-center font-bold text-xl lg:text-3xl">
          No Tools Favorited Yet.
        </p>
      )}
    </Container>
  );
}