import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";

export default function AlgoliaSearch({
  searchCount,
  searchValue,
  setSearchValue,
  checkedCategory,
  checkedFeatures,
  checkedPrices,
}) {
  const pathName = usePathname();
  const { replace } = useRouter();

  function generateURL() {
    let categoryParam =
      checkedCategory.length > 0 ? `categories=${checkedCategory.join()}` : "";
    let featureParam =
      checkedFeatures.length > 0 ? `features=${checkedFeatures.join()}` : "";
    let priceParam =
      checkedPrices.length > 0 ? `pricing=${checkedPrices.join()}` : "";
    let searchParam = searchValue
      ? `search=${searchValue.split(" ").join("+")}`
      : "";

    // Combine all parameters
    let queryParams = [
      categoryParam,
      featureParam,
      priceParam,
      searchParam,
    ].filter(Boolean);

    // Construct the final URL
    let url = "/";
    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }
    replace (url);
  }

  function performSearch(e) {
    e.preventDefault();
    generateURL();
  }

  return (
    <form
      onSubmit={performSearch}
      className="relative flex items-stretch flex-1 p-2 border-2 rounded-lg gap-x-2 md:gap-x-3 border-odtheme/10"
    >
      <p className="absolute left-2 flex items-center p-2 text-[10px] font-medium border rounded-md gap-x-2 bg-dtheme border-odtheme/10 -top-6 md:text-xs">
        {searchCount?.today_search_count} Searches today
      </p>

      <Input
        placeholder="Search 820 Ai tools"
        className="w-full p-0 text-sm font-medium text-center bg-transparent border-0 h-11 focus:outline-0 md:text-base"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Button
        type="submit"
        className="h-full p-0 px-3 rounded-md aspect-square md:aspect-auto"
      >
        <p className="hidden md:block">Search</p>
        <FiSearch className="w-5 h-5 md:hidden" />
      </Button>
    </form>
  );
}
