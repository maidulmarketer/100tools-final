"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import {
  getRequestedTools,
  updateRequestedToolStatus,
} from "@/services/admin/toolService";

import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";
import Image from "next/image";
import Select from "@/components/forms/Select";
import { toast } from "sonner";

export default function AdminToolsPage() {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["requested-tools"],
    queryFn: () => getRequestedTools().then((res) => res.data),
  });

  function handleStatusChange(e, slug) {
    const { value } = e.target;
    updateRequestedToolStatus(slug, value)
      .then(refetch)
      .catch(() => toast.error("Something Went Wrong..."));
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
      title: "Change Status",
      renderer: (item) => (
        <Select
          value={item.status}
          onChange={(e) => handleStatusChange(e, item.slug)}
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Approved", value: "APPROVED" },
            { label: "Rejected", value: "REJECTED" },
          ]}
        />
      ),
    },
    {
      title: "Features",
      renderer: (item) => item.feature.map((f) => f.title).join(", "),
    },
    { 
      title: "Category", renderer: (item) => item.category?.title 
    },
    {
      title: "Sub-categories",
      renderer: (item) => item.sub_category.map((sc) => sc.title).join(", "),
    },
    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`/admin/${item.slug}`}
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
      <PageTitle title="Requested AI Tools" />

      <Table cols={cols} data={data.results} />
    </div>
  );
}
