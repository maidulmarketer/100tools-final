import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Input from "@/components/forms/Input";
import { getCounts } from "@/services/user/toolsService";
import { FiSearch } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

export function GlobalSearch({ onClose, setIsSearchModalOpen }) {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search");

  const [searchValue, setSearchValue] = useState(search);

  const { data: searchCount, refetch } = useQuery({
    queryKey: ["tools-filters-count"],
    queryFn: () => getCounts().then((res) => res.data),
  });

  function performSearch(e) {
    e.preventDefault();

    // Update the URL with the search query as a query parameter
    router.push(`/?search=${searchValue.split(" ").join("+")}`);
    setIsSearchModalOpen(false);
  }

  return (
    <form onSubmit={performSearch} className="flex gap-2 items-center border-b">
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
          <FiSearch onClick={()=>performSearch()} className="w-5 h-5 hidden md:block cursor-pointer" />
        </div>
      )}

      <FiSearch className="w-5 h-5 block md:hidden cursor-pointer" />
    </form>
  );
}
