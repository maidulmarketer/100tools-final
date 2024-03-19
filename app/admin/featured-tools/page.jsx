"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AiOutlinePlus } from "react-icons/ai";

import { getCategories } from "@/services/admin/categoryService";

import Button from "@/components/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";
import Image from "next/image";
import { getFeaturedTools } from "@/services/admin/featuredToolsService";

export default function AdminFeaturedToolsPage() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["featured-tools"],
    queryFn: () => getFeaturedTools().then((res) => res.data),
  });

  const cols = [
    {
      title: "Tool",
      renderer: (item) => (
        <div className="flex items-center gap-2">
          <Image
            src={item.feature_tool.image || "/images/image-placeholder.webp"}
            width={100}
            height={100}
            alt="ai-tool-banner"
            className="object-cover w-20 rounded aspect-video "
          />
          <p>{item.feature_tool.name}</p>
        </div>
      ),
    },
    { title: "Text", dataField: "custom_field" },
    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`featured-tools/${item.slug}`}
          className="font-semibold hover:underline text-dsuccess"
        >
          Details/Edit
        </Link>
      ),
    },
  ];

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Featured Tools" />
        <Link href="featured-tools/create">
          <Button className="gap-2" variant="dynamic">
            <AiOutlinePlus className="w-5 h-5" /> Create
          </Button>
        </Link>
      </div>
      <Table cols={cols} data={data.results} />
    </div>
  );
}
