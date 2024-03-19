"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AiOutlinePlus } from "react-icons/ai";

import { getStaffs } from "@/services/admin/staffService";

import Button from "@/components/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";

export default function AdminStaffsPage() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["staffs"],
    queryFn: () => getStaffs().then((res) => res.data),
  });

  const cols = [
    {
      title: "Name",
      renderer: (item) => (
        <div className="flex items-center gap-2">
          {/* <Image
            src={item.image || "/images/image-placeholder.webp"}
            width={100}
            height={100}
            alt="ai-tool-banner"
            className="object-cover w-20 rounded aspect-video "
          /> */}
          <p>{item.first_name + " " + item.last_name}</p>
        </div>
      ),
    },
    { title: "Email", dataField: "email" },
    { title: "Phone", dataField: "phone" },
    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`staffs/${item.slug}`}
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
        <PageTitle title="Staffs" />
        <Link href="staffs/create">
          <Button className="gap-2" variant="dynamic">
            <AiOutlinePlus className="w-5 h-5" /> Create
          </Button>
        </Link>
      </div>
      <Table cols={cols} data={data.results} />
    </div>
  );
}
