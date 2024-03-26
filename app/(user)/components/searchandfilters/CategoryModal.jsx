"use client";
import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { getFeatures } from "@/services/admin/featureService";
import { getCategories } from "@/services/admin/categoryService";

import Button from "@/components/buttons/Button";
import { RxCross2 } from "react-icons/rx";
import Badge from "@/components/badges/Badge";
import { useTheme } from "next-themes";
import { Filter } from "@/components/svg/icons";


export default function CategoryModal({ isModalOpen, setIsModalOpen }) {
  const { replace } = useRouter();
  const pathName = usePathname();
  const theme = useTheme();


  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedFeatures, setCheckedFeatures] = useState([]);
  const [checkedPrices, setCheckedPrices] = useState([]);
  const [activeOption, setActiveOption] = useState(
    pathName === "/" ? "category" : "features"
  );

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
      setCheckedCategory([...checkedCategory, value]);
    } else {
      setCheckedCategory(checkedCategory.filter((item) => item !== value));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedFeatures([...checkedFeatures, value]);
    } else {
      setCheckedFeatures(checkedFeatures.filter((item) => item !== value));
    }
  };

  const handlePriceCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedPrices([...checkedPrices, value]);
    } else {
      setCheckedPrices(checkedPrices.filter((item) => item !== value));
    }
  };

  return (
    <div className="relative space-y-4">
      <section className="flex items-center justify-between px-5 py-4">
        {checkedCategory.length > 0 ? (
          <div
            onClick={() => setCheckedCategory([])}
            className="flex gap-1 items-center underline underline-offset-4 cursor-pointer"
          >
            <RxCross2 className="w-4 h-4" /> Clear All
          </div>
        ) : (
          <div className="flex items-end  justify-start gap-2 font-medium text-xl leading-6">
            <Filter className="w-6 h-6"/>
            <p className="block md:hidden">Filters</p>
            <p className="hidden md:block">Category</p>
          </div>
        )}
        <button
          className="self-end text-odtheme focus:outline-none"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <span className="sr-only">Close menu</span>
          <RxCross2 className="w-5 h-5" />
        </button>
      </section>

      {/* filter for small Screen */}
      <div className="block md:hidden sticky top-0 z-10 px-5">
        <div className="flex md:hidden justify-center gap-4 border-odtheme/5 w-full border-2 rounded-lg p-1">
          {["category", "features", "pricing"].map((option) => (
            <Badge
              key={option}
              onClick={() => setActiveOption(option)}
              variant="outline"
              className={`flex-col gap-2 cursor-pointer w-full border-0 text-center ${
                activeOption === option ? "bg-odtheme/5 text-odtheme rounded-md px-4 py-2 text-sm font-semibold leading-5" : "text-odtheme/50"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      {/* main body  */}
      <section className="space-y-5 overflow-y-auto text-odtheme h-3/4 lg:h-[360px] md:h-96 pb-24 px-5 py-3">
      <div
            className={`${
              activeOption === "category" ? "flex" : "hidden"
            } flex-col gap-6`}
          >
            {category?.results.map((item) => (
              <div key={item.slug} className="space-y-6">
                <p className="font-bold"> {item.title}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {item.subcategory.length ? (
                    item.subcategory.map((item) => (
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
                  ) : (
                    <p className="text-odtheme/40">No Sub Category</p>
                  )}
                </div>
              </div>
            ))}
          </div>
      </section>

      <section className="flex justify-center gap-2.5 absolute bottom-0 w-full p-4 bg-dtheme">
        <Button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="justify-center w-full"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            // const url = generateURL(
            //   checkedCategory,
            //   checkedFeatures,
            //   checkedPrices,
            //   searchValue
            // );
            replace(url), setIsModalOpen(!isModalOpen);
          }}
          className="justify-center w-full"
        >
          Show Results
        </Button>
      </section>
    </div>
  );
}
