"use client";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import { getCategoryToolText } from "@/services/user/toolsService";
import { useQuery } from "@tanstack/react-query";

export default function CategoryHeaderText({ slug }) {
  const {
    isLoading,
    isError,
    data: tools,
  } = useQuery({
    queryKey: [`category/${slug}/tools/text`],
    queryFn: () =>
    getCategoryToolText(slug).then((res) => res.data),
  });

  return (
    <div className="pt-6 pb-8 space-y-8" >
      <Breadcrumb/>
      <div className="space-y-2">
      <h1 className="text-2xl font-bold">
      Best AI {tools.title} Tools
      </h1>
      <div
        className="override-style w-full md:w-1/2"
        dangerouslySetInnerHTML={{ __html: tools.description }}
      />
      </div>
    </div>
  );
}
