"use client";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import { categoryHeaderText, categorySubHeader } from "@/const";
import { getCounts } from "@/services/user/toolsService";
import { useQuery } from "@tanstack/react-query";
import { BiCategory, BiSolidDashboard } from "react-icons/bi";

export default function CategoryHeader() {
  const { data: allCount, refetch } = useQuery({
    queryKey: ["tools-filters-count"],
    queryFn: () => getCounts().then((res) => res.data),
  });

  return (
    <div className="pb-7">
      <div className="pt-10 pl-4">
        <Breadcrumb />
      </div>
      <div className="pt-14 px-4">
        <div className="flex justify-start items-center gap-1 font-semibold pb-7">
          <BiCategory className="w-8 h-8 text-odtheme" />
          {categoryHeaderText}
        </div>

        <div className="max-w-3xl pb-12">{categorySubHeader}</div>

        {/* <div>
          <p>40 Categories, {allCount?.total_tools} AI Tools</p>
        </div> */}
      </div>
    </div>
  );
}
