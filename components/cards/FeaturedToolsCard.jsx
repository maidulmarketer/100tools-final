"use client";
import { getFeaturedTools } from "@/services/user/toolsService";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";

export default function FeaturedToolsCard() {
  const pathName = usePathname();

  const reNamePath = pathName === "/" ? "Home Page" : "Categories Page";

  const { data: tools } = useQuery({
    queryKey: ["featureTools"],
    queryFn: () => getFeaturedTools().then(({ data }) => data),
  });

  if (!tools?.results.length) {
    return null;
  } else {
    return (
      <div className="p-1 bg-gradient-to-b from-primary-400 to-primary-500 rounded-2xl">
        <div className="p-4 rounded-2xl bg-dtheme h-full">
          <div className="mx-auto rounded-full bg-odtheme/5 w-fit px-4 py-3">
            <span className="text-xl font-bold">
              Featured tools
            </span>
          </div>

          <ul className="mt-6 divide-y-2 divide-odtheme/10">
            {tools?.results?.map((tool) => {
              // Check if pathName is in the in_pages array
              const shouldRender = tool.in_pages.includes(reNamePath);

              // If not, skip rendering this list item
              if (!shouldRender) {
                return null;
              }

              return (
                <ul key={tool.slug} className="divide-y-2 divide-odtheme/10">
                  <li className="flex items-center justify-between gap-4 py-5">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">
                        {tool.feature_tool.name}
                      </h4>
                      <p className="font-medium text-odtheme/40">
                        {tool.custom_field}
                      </p>
                    </div>

                    <Link href={`/tools/${tool.feature_tool.slug}`}>
                      <MdArrowOutward className="w-3 h-3 text-primary-400" />
                    </Link>
                  </li>
                </ul>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}