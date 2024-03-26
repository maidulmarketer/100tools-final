import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Input from "@/components/forms/Input";
import { getCounts, getUserTools } from "@/services/user/toolsService";
import { FiSearch } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "@/components/svg/icons";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

export function GlobalSearch({ onClose, setIsSearchModalOpen }) {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search");

  const [searchValue, setSearchValue] = useState(search);
  const [recentlyViewTools, setRecentlyViewTools] = useState([]);

  const { data: searchCount, refetch } = useQuery({
    queryKey: ["tools-filters-count"],
    queryFn: () => getCounts().then((res) => res.data),
  });

  const { data: tools, refetch: toolRefetch } = useQuery({
    queryKey: ["user-tools", searchValue],
    queryFn: () =>
      getUserTools(searchValue ? { search: searchValue } : "").then(
        (res) => res.data
      ),
  });

  function performSearch(e) {
    e.preventDefault();

    // Update the URL with the search query as a query parameter
    router.push(`/?search=${searchValue.split(" ").join("+")}`);
    setIsSearchModalOpen(false);
  }

  useEffect(() => {
    const storedTools = JSON.parse(localStorage.getItem("storedTools")) || [];
    setRecentlyViewTools(storedTools);
  }, []); 

  return (
    <div className="space-y-3 h-full overflow-y-auto relative" style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}>
      <form
        onSubmit={performSearch}
        className="flex gap-2 items-center border-b pb-4 sticky top-0 bg-dtheme"
      >
        <IoArrowBack
          onClick={onClose}
          className="w-5 h-5 block md:hidden cursor-pointer"
        />

        {searchValue ? (
          <IoArrowBack
            onClick={onClose}
            className="w-5 h-5 hidden md:block cursor-pointer"
          />
        ) : (
          <FiSearch className="w-5 h-5 hidden md:block" />
        )}

        <Input
          placeholder={`Search ${searchCount?.today_search_count}+ Ai Tools`}
          className="w-full p-0 text-sm font-medium bg-transparent border-1 h-11 focus:outline-0 md:text-base"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {searchValue && (
          <div className="flex gap-2 items-center">
            <MdOutlineClear
              onClick={() => setSearchValue("")}
              className="w-5 h-5 cursor-pointer"
            />
            <FiSearch
              onClick={() => performSearch()}
              className="w-5 h-5 hidden md:block cursor-pointer"
            />
          </div>
        )}

        <FiSearch className="w-5 h-5 block md:hidden cursor-pointer" />
      </form>

      <div className="">
        <section className="space-y-3">
          {searchValue && (
            <div onClick={performSearch} className="flex justify-start items-center gap-2 border-b border-odtheme/65 pb-3 cursor-pointer">
              <p className="rounded-full border-2 border-odtheme/70 p-2">
                <Search className="w-3 h-3" />
              </p>
              <p>See all results for {searchValue} </p>
            </div>
          )}
          <div className="flex flex-col">
            {searchValue &&
              (tools?.count
                ? tools.results.map((item) => (
                    <Link onClick={()=>setIsSearchModalOpen(false)} key={item.slug} href={`/tool/${item.slug}`} className="flex justify-between gap-3 items-center cursor-pointer border-b border-odtheme/65 py-3">
                      <div className="flex gap-3 items-center">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          height={40}
                          width={40}
                          className="w-10 h-10 object-cover rounded-md "
                        />
                        <p>{item.name}</p>
                      </div>

                      <GoArrowUpRight className="w-5 h5" />
                    </Link>
                  ))
                : null)}
          </div>
        </section>
        <section className="space-y-3 pt-3">
          <p className="uppercase font-semibold text-xs leading-4">
            Recently Viewed
          </p>

          <div>
          {
            recentlyViewTools ?
            
              recentlyViewTools?.map((item) => (
                <Link onClick={()=>setIsSearchModalOpen(false)} key={item.slug} href={`/tool/${item.slug}`} className="flex justify-between gap-3 items-center cursor-pointer border-b border-odtheme/65 py-3">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      height={40}
                      width={40}
                      className="w-10 h-10 object-cover rounded-md "
                    />
                    <p>{item.name}</p>
                  </div>

                  <GoArrowUpRight className="w-5 h5" />
                </Link>
              )
            ) :
            <p>N/A</p>
          }
          </div>
        </section>
      </div>
    </div>
  );
}
