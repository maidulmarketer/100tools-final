"use client";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/admin/userService";
import Image from "next/image";

export default function AdminUserDetailsPage({ params: { slug } }) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["users", slug],
    queryFn: () => getUser(slug).then((res) => res.data),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="space-y-4">
      <Image
        src={data.picture || "/images/google.png"}
        alt="User Avatar"
        width={200}
        height={200}
        className="object-cover w-40 h-40 rounded-full"
      />

      <div>
        <h1 className="text-2xl font-semibold">{data.first_name}</h1>
        <p>{data.email}</p>
      </div>

      <div>
        <p>
          Status: <strong>{data.status}</strong>
        </p>
        <p>
          Saved tools: <strong>45</strong>
        </p>
        <p>
          Loved tools: <strong>78</strong>
        </p>
      </div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
