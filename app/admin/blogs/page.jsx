"use client";
import Link from "next/link";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { AiOutlinePlus } from "react-icons/ai";

import { getBlogs, updateBlog } from "@/services/admin/blogService";

import Button from "@/components/buttons/Button";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/tables/Table";
import Image from "next/image";
import Select from "@/components/forms/Select";

export default function AdminBlogsPage() {
  const { isLoading, data, refetch, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs().then((res) => res.data),
  });

  function handleStatusChange(e, slug) {
    const { value } = e.target;
    const promise = updateBlog(slug, { status: value })
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
      title: "Blog",
      renderer: (item) => (
        <div className="flex items-center gap-2">
          <Image
            src={item.avatar || "/images/image-placeholder.webp"}
            width={100}
            height={100}
            alt="blog image"
            className="object-cover w-20 rounded aspect-video "
          />
          <p>{item.title}</p>
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
      title: "Content",
      renderer: (item) => (
        <div
          className="max-w-lg overflow-auto max-h-10 custom-scrollbar"
          dangerouslySetInnerHTML={{
            __html: item.description,
          }}
        />
      ),
    },
    {
      title: "Action",
      renderer: (item) => (
        <Link
          href={`blogs/${item.slug}`}
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
        <PageTitle title="Blogs" />
        <Link href="blogs/create">
          <Button className="gap-2" variant="dynamic">
            <AiOutlinePlus className="w-5 h-5" /> Create
          </Button>
        </Link>
      </div>
      <Table cols={cols} data={data.results} />
    </div>
  );
}
