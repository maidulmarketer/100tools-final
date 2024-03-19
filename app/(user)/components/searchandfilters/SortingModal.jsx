"use-client";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const sortingOptions = [
  { label: "Newest", value: "created_at" },
  { label: "Verified", value: "verified" },
  { label: "Most Rated", value: "average_ratings" },
  { label: "Most Popular", value: "most_loved" },
];

export default function SortingModal({ isModalOpen, setIsModalOpen }) {
  const { replace } = useRouter();
  const pathName = usePathname();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const orderingParams = searchParams.get("ordering");
  const [clickSelectedOption, setClickSelectedOption] = useState(orderingParams ||"created_at");

  const handleChange = (value) => {
    setClickSelectedOption(value);
    let sortingParam = value ? `ordering=${value}` : "";
    // Construct the final URL
    let url = pathName;
    if (value) {
      url += `?${sortingParam}`;
    }
    replace(url);
    setIsModalOpen(false)
  };

  let selectedOption = sortingOptions.find(
    (item) => item.value === orderingParams
  );

  return (
    <div className="relative h-full">
      <section className="flex items-center justify-between px-5 py-7 font-semibold leading-5">
        <h3>Sort By</h3>
        <FaXmark onClick={() => setIsModalOpen(false)} className="w-5" />
      </section>

      {/* main body  */}
      <section className="space-y-5 text-sm font-semibold leading-5 text-odtheme p-5 bg-odtheme/5">
        {sortingOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center justify-between mb-3 cursor-pointer"
          >
            <span
              className={
                clickSelectedOption === option.value
                  ? "font-bold"
                  : "text-odtheme/50"
              }
            >
              {option.label}
            </span>
            <input
              type="radio"
              value={option.value}
              checked={clickSelectedOption === option.value}
              onChange={() => handleChange(option.value)}
              class="w-4 h-4  bg-gray-100 border-gray-300"
            />
          </label>
        ))}
      </section>
    </div>
  );
}
