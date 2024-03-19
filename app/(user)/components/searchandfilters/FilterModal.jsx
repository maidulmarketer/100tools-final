"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/buttons/Button";
import { BiSolidDashboard } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { getFeatures } from "@/services/admin/featureService";
import Badge from "@/components/badges/Badge";
import { getCategories } from "@/services/admin/categoryService";

const pricingOptions = [
  { title: "Free", slug: "free" },
  { title: "Free Trial", slug: "free_trial" },
  { title: "Freemium", slug: "freemium" },
  { title: "Premium", slug: "premium" },
];

export default function FilterModal({
  isModalOpen,
  setIsModalOpen,
  checkedCategory,
  setCategory,
  checkedFeatures,
  setFeatures,
  checkedPrices,
  setPrices,
  searchValue,
}) {
  const { replace } = useRouter();
  const pathName = usePathname();

  const [activeOption, setActiveOption] = useState(
    pathName === "/" ? "category" : "features"
  );

  const searchParams = useSearchParams();
  const queriedCategory = searchParams.get("categories");
  const queriedFeatures = searchParams.get("features");
  const queriedPrices = searchParams.get("pricing");

  useEffect(() => {
    if (queriedCategory) {
      setCategory(queriedCategory.split(","));
    }

    if (queriedFeatures) {
      setFeatures(queriedFeatures.split(","));
    }

    if (queriedPrices) {
      setPrices(queriedPrices.split(","));
    }
  }, [queriedFeatures, queriedPrices, queriedCategory]);

  const { data: features } = useQuery({
    queryKey: ["feature-filter"],
    queryFn: () => getFeatures().then((res) => res.data),
  });

  const { data: category } = useQuery({
    queryKey: ["category-filter"],
    queryFn: () => getCategories().then((res) => res.data),
  });

  const handleCategoryCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategory([...checkedCategory, value]);
    } else {
      setCategory(checkedCategory.filter((item) => item !== value));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFeatures([...checkedFeatures, value]);
    } else {
      setFeatures(checkedFeatures.filter((item) => item !== value));
    }
  };

  const handlePriceCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPrices([...checkedPrices, value]);
    } else {
      setPrices(checkedPrices.filter((item) => item !== value));
    }
  };

  function generateURL(
    checkedCategory,
    checkedFeatures,
    checkedPrices,
    searchValue
  ) {
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
    let url = pathName;
    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }
    return url;
  }

  return (
    <div className="space-y-2 relative h-full">
      {/* filter for large Screen */}
      <div className="hidden md:flex items-center justify-between pb-6 border-b border-odtheme/10">
        {checkedFeatures.length > 0 || checkedPrices.length > 0 ? (
          <div
            onClick={() => {
              setFeatures([]);
              setPrices([]);
            }}
            className="flex gap-1 items-center underline underline-offset-4 cursor-pointer"
          >
            <RxCross2 className="w-4 h-4" /> Clear All
          </div>
        ) : (
          <div className="flex items-center justify-start gap-1 font-semibold">
            <BiSolidDashboard className="w-5 h-5 text-primary-400" />
            <p>Filters</p>
          </div>
        )}

        <button
          className="self-end text-odtheme focus:outline-none"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <span className="sr-only">Close menu</span>
          <RxCross2 className="w-5 h-5" />
        </button>
      </div>
      {/* filter for small Screen */}
      <div className="flex md:hidden items-center justify-between pb-6 border-b border-odtheme/10">
        {checkedCategory.length > 0 ||
        checkedFeatures.length > 0 ||
        checkedPrices.length > 0 ? (
          <div
            onClick={() => {
              setCategory([]);
              setFeatures([]);
              setPrices([]);
            }}
            className="flex gap-1 items-center underline underline-offset-4 cursor-pointer"
          >
            <RxCross2 className="w-4 h-4" /> Clear All
          </div>
        ) : (
          <div className="flex items-center justify-start gap-1 font-semibold">
            <BiSolidDashboard className="w-5 h-5 text-primary-400" />
            <p>Filters</p>
          </div>
        )}

        <button
          className="self-end text-odtheme focus:outline-none"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <span className="sr-only">Close menu</span>
          <RxCross2 className="w-5 h-5" />
        </button>
      </div>

      <div className="sticky top-0">
        <div className="flex md:hidden justify-center gap-1 border-odtheme/5 w-full border-2 rounded-lg p-2 ">
          <Badge
            onClick={() => setActiveOption("category")}
            variant="outline"
            className={`${pathName === "/" ? "flex" : "hidden"} ${
              activeOption === "category" && "bg-odtheme/10 text-odtheme"
            } flex-col gap-2 cursor-pointer w-full rounded-md text-center`}
          >
            Category
          </Badge>
          <Badge
            onClick={() => setActiveOption("features")}
            variant="outline"
            className={`${
              activeOption === "features" && "bg-odtheme/10 text-odtheme"
            } flex-col gap-2 cursor-pointer w-full rounded-md text-center`}
          >
            Features
          </Badge>
          <Badge
            onClick={() => setActiveOption("pricing")}
            variant="outline"
            className={`${
              activeOption === "pricing" && "bg-odtheme/10 text-odtheme"
            } flex-col gap-2 cursor-pointer w-full rounded-md text-center`}
          >
            Price
          </Badge>
        </div>
      </div>

      {/* main body  */}
      <div className="space-y-5 overflow-y-auto text-odtheme h-3/4 lg:h-[360px]">
        <div className="flex flex-col md:flex-row items-start justify-start gap-4 sm:gap-36">
          {/* Features */}
          <div
            className={`${
              activeOption === "features" ? "flex" : "hidden md:flex"
            } flex-col gap-5`}
          >
            <p className="font-bold text-odtheme/40 text-base"> Features </p>
            {features?.results?.map((item) => (
              <div key={item.slug} className="flex flex-col gap-7">
                <label className="flex gap-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    value={item.slug}
                    onChange={handleCheckboxChange}
                    checked={checkedFeatures.includes(item.slug)}
                    className="accent-primary-400"
                  />
                  <span>{item.title}</span>
                </label>
              </div>
            ))}
          </div>
          {/* category */}
          <div
            className={`${
              activeOption === "category" ? "flex md:hidden" : "hidden"
            } flex-col gap-6`}
          >
            <p className="font-bold text-odtheme/40 text-base"> Category </p>
            {category?.results.map((item) => (
              <div key={item.slug} className="space-y-6">
                <p className="font-bold"> {item.title}</p>

                <div className="space-y-6">
                  {item.subcategory.length
                    ? item.subcategory.map((item) => (
                        <label
                          key={item.slug}
                          className="flex gap-x-2.5 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={item.slug}
                            onChange={handleCategoryCheckboxChange}
                            checked={checkedCategory.includes(item.slug)}
                            className="accent-primary-400"
                          />
                          <span>
                            {item.title}{" "}
                            <span className="text-odtheme/50">
                              ({item.total_tools})
                            </span>
                          </span>
                        </label>
                      ))
                    : "No Sub Category Added yet"}
                </div>
              </div>
            ))}
          </div>
          {/* price */}
          <div
            className={`${
              activeOption === "pricing" ? "flex" : "hidden md:flex"
            } flex-col gap-5`}
          >
            <p className="font-bold text-odtheme/40 text-base"> Pricing </p>
            {pricingOptions.map((item) => (
              <label key={item.slug} className="flex gap-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  value={item.slug}
                  onChange={handlePriceCheckboxChange}
                  checked={checkedPrices.includes(item.slug)}
                  className="accent-primary-400"
                />
                <span>{item.title}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2.5 absolute bottom-0 w-full bg-dtheme p-4">
        <Button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="hidden md:flex justify-center w-full"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            const url = generateURL(
              checkedCategory,
              checkedFeatures,
              checkedPrices,
              searchValue
            );
            replace(url), setIsModalOpen(!isModalOpen);
          }}
          className="justify-center w-full"
        >
          Show Results
        </Button>
      </div>
    </div>
  );
}
