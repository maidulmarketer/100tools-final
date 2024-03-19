"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AiOutlinePlus } from "react-icons/ai";

import { getTools, updateTool } from "@/services/admin/toolService";

import Button from "@/components/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";
import Image from "next/image";
import Select from "@/components/forms/Select";
import { toast } from "sonner";
import Input from "@/components/forms/Input";
import { useState } from "react";

export default function AdminToolsPage() {
  const [searchKey, setSearchKey] = useState("");

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["admin-tools", searchKey],
    queryFn: () => getTools({ search: searchKey }).then((res) => res.data),
  });

  function handleStatusChange(e, slug) {
    const { value } = e.target;
    const promise = updateTool(slug, { status: value })
      .then(refetch)
      .catch((error) => {
        throw error;
      });

    toast.promise(promise, {
      loading: "Updating status...",
      success: "Status updated",
      error: "Failed...!",
    });
  }

  const cols = [
    {
      title: "Tool",
      renderer: (item) => (
        <div className="flex gap-2 items-center">
          <Image
            src={item.image || "/images/image-placeholder.webp"}
            width={100}
            height={100}
            alt="ai-tool-banner"
            className="rounded w-20 aspect-video object-cover "
          />
          <p>{item.name}</p>
        </div>
      ),
    },
    {
      title: "Status",
      renderer: (item) => (
        <Select
          className="w-fit"
          value={item.status}
          onChange={(e) => handleStatusChange(e, item.slug)}
          options={[
            { label: "Draft", value: "DRAFT" },
            { label: "Published", value: "ACTIVE" },
          ]}
        />
      ),
    },
    {
      title: "Features",
      renderer: (item) => item.feature.map((f) => f.title).join(", "),
    },
    { title: "Category", renderer: (item) => item.category?.title },
    {
      title: "Sub-categories",
      renderer: (item) => item.sub_category.map((sc) => sc.title).join(", "),
    },
    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`tools/${item.slug}`}
          className="hover:underline text-dsuccess font-semibold"
        >
          Details/Edit
        </Link>
      ),
    },
  ];

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="AI Tools" />
        <Link href="tools/create">
          <Button className="gap-2" variant="dynamic">
            <AiOutlinePlus className="w-5 h-5" /> Create
          </Button>
        </Link>
      </div>
      <Input
        type="text"
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
        label="Search Tools"
      />
      {isLoading ? (
        <p className="text-center font-semibold">isLoading....</p>
      ) : (
        <Table cols={cols} data={data.results} />
      )}
    </div>
  );
}
