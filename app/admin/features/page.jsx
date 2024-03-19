"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AiOutlinePlus } from "react-icons/ai";

import { getFeatures } from "@/services/admin/featureService";

import Button from "@/components/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";

export default function AdminFeaturesPage() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["admin-features"],
    queryFn: () => getFeatures().then((res) => res.data),
  });

  const cols = [
    { title: "Name", dataField: "title" },
    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`features/${item.slug}`}
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
        <PageTitle title="Features" />
        <Link href="features/create">
          <Button className="gap-2" variant="dynamic">
            <AiOutlinePlus className="w-5 h-5" /> Create
          </Button>
        </Link>
      </div>
      <Table cols={cols} data={data.results} />
    </div>
  );
}
