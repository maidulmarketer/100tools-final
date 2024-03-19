import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { getPostList } from "@/services/user/postService";
import imagePlaceHolder from "@/public/images/image-placeholder.webp";

export default function PopularPost({ slug }) {
  const {
    isLoading,
    data: postList,
    isError,
  } = useQuery({
    queryKey: [`posts/popular/${slug}`, slug],
    queryFn: () => getPostList({ popular: "True" }).then((res) => res.data),
  });

  if (isLoading) return "Loading....";

  return (
    <div className="flex flex-col gap-6">
      {postList.results.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <div className="w-1/3 h-14">
            <Image
              width={300}
              height={600}
              src={item.avatar || imagePlaceHolder}
              alt="card-banner"
              className="w-full h-full object-cover transform transition-transform duration-300"
            />
          </div>
          <div className="font-semibold">{item.title}</div>
        </div>
      ))}
    </div>
  );
}
