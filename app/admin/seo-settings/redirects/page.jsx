"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "@/components/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";
import { getRedirects } from "@/services/admin/redirectService";

export default function AdminBlogsPage() {
  const { isLoading, data, refetch, isError, error } = useQuery({
    queryKey: ["admin-redirects"],
    queryFn: () => getRedirects().then((res) => res.data),
  });

  const cols = [
    // {
    //   title: "Type",
    //   renderer: (item) => <p>{item.type}</p>,
    // },
    {
      title: "Old",
      dataField: "old",
    },
    {
      title: "New",
      dataField: "new",
    },

    {
      title: "Permanent",
      renderer: (item) => <p>{item.is_permanent ? "YES" : "NO"}</p>,
    },
    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`redirects/${item.uid}`}
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
        <PageTitle title="Redirects" />
        <Link href="redirects/create">
          <Button className="gap-2" variant="dynamic">
            <AiOutlinePlus className="w-5 h-5" /> Add New
          </Button>
        </Link>
      </div>
      <Table cols={cols} data={data} />
    </div>
  );
}
