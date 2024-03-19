"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AiOutlinePlus } from "react-icons/ai";

import { getSubCategories } from "@/services/admin/subCategoryService";

import Button from "@/components/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";

export default function AdminSubCategoriesPage() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: () => getSubCategories().then((res) => res.data),
  });

  const cols = [
    { title: "Title", dataField: "title" },
    { title: "Slug", dataField: "slug" },
    { title: "Category", renderer: (item) => item.category?.title },

    { title: "Meta title", dataField: "meta_title" },
    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`sub-categories/${item.slug}`}
          className="hover:underline text-dsuccess font-semibold"
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
      <div className="flex justify-between items-center">
        <PageTitle title="Sub Categories" />
        <Link href="sub-categories/create">
          <Button className="gap-2" variant="dynamic">
            <AiOutlinePlus className="w-5 h-5" /> Create
          </Button>
        </Link>
      </div>
      <Table cols={cols} data={data.results} />
    </div>
  );
}
