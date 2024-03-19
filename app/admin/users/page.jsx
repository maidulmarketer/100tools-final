"use client";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";
import { AiOutlinePlus } from "react-icons/ai";
import { getUsers } from "@/services/admin/userService";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function AdminUsersPage() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers().then((res) => res.data),
  });

  const cols = [
    {
      title: "User",
      renderer: (item) => (
        <div className="flex items-center gap-2">
          <Image
            src={item.picture || "/images/google.png"}
            alt="User avatar"
            width={40}
            height={40}
            className="object-cover w-10 h-10 rounded-full"
          />
          <p>{item.first_name || "Not set"}</p>
        </div>
      ),
    },
    { title: "Email", dataField: "email" },
    { title: "Username", dataField: "username" },
    // { title: "Slug", dataField: "slug" },

    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`users/${item.slug}`}
          className="font-semibold hover:underline text-dsuccess"
        >
          Details
        </Link>
      ),
    },
  ];

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    console.log(error);
    return <span>Error: {error.response.data?.detail}</span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Users" />
        <Link href="users/create">
          <Button className="gap-2" variant="dynamic">
            <AiOutlinePlus className="w-5 h-5" /> Create
          </Button>
        </Link>
      </div>
      <Table cols={cols} data={data.results} />
    </div>
  );
}
