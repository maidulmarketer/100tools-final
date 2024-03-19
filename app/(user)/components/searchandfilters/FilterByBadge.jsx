import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import Button from "@/components/buttons/Button";
import { MdUpdate } from "react-icons/md";

export default function FilterByBadge({
  allCount,
  searchParams,
  trendingRange,
  setTrendingRange,
  trendingParams,
  pathName,
  categoryCount,
  timeRange,
  categorySlug,
}) {
  const theme = useTheme();
  const router = useRouter();
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const filtersSetUrl = useCallback(
    (param) => {
      let filterParam =
        param === "trending"
          ? `trending=${trendingRange}`
          : param === "added-today"
          ? `time_range=today`
          : "";

      // Construct the final URL
      let url = pathName;
      if (param) {
        url += `?${filterParam}`;
      }

      router.replace(url);
    },
    [pathName, router, trendingRange]
  );

  useEffect(() => {
    if (trendingRange) {
      filtersSetUrl("trending");
    }
  }, [trendingRange, filtersSetUrl]);

  return (
    <div className="flex items-center w-full gap-3 md:w-fit">
      {/* <BiSolidChevronLeft
        onClick={() => scroll(-30)}
        className="block w-6 lg:hidden"
      /> */}
      <div
        className="flex w-full gap-3 overflow-x-auto scroll-container hide-scrollbar pt-2 pb-1"
        ref={ref}
      >
        <Button
          onClick={() => router.replace(pathName)}
          variant={searchParams.size ? "badgeType" : "bgPrimary"}
          className={`flex gap-1 px-3 py-2 ${(!searchParams.size && (theme.theme === "dark")) && "bg-[#3F3A50]"}`}
        >
          <HiMiniBars3CenterLeft className="w-5 h-5" /> All
        </Button>
        <Button
          onClick={() => filtersSetUrl("added-today")}
          variant={timeRange ? "bgPrimary" : "badgeType"}
          className={`flex gap-1 px-3 py-2 ${(searchParams.size && (theme.theme === "dark")) && "bg-[#3F3A50]"}`}
        >
          <MdUpdate className="w-5 h-5" /> Added Today (
          {categoryCount
            ? categoryCount.today_created_tools
            : allCount?.today_created_tools}
          )
        </Button>
        {/* <Button
            onClick={() => filtersSetUrl("deals")}
            variant={searchParams.size ? "badgeType" : "bgPrimary"}
            className="flex gap-1 px-3 py-2"
          >
            <AiFillTag className="w-5 h-5" /> Deals (44)
          </Button> */}
        <Button
          onClick={() => {
            filtersSetUrl("trending");
            setTrendingRange("today");
          }}
          variant={trendingParams ? "bgPrimary" : "badgeType"}
          className={`flex gap-1 px-3 py-2 ${(searchParams.size && (theme.theme === "dark")) && "bg-[#3F3A50]"}`}
        >
          <HiOutlineTrendingUp className="w-5 h-5" /> Trending (
          {categoryCount
            ? categoryCount.trending_tools
            : allCount?.trending_tools}
          )
        </Button>
      </div>
      {/* <BiChevronRight
        onClick={() => scroll(30)}
        className="block w-6 lg:hidden"
      /> */}
    </div>
  );
}
