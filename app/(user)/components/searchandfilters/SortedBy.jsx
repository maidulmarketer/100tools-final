import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { Fragment } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortingOptions = [
  { label: "Newest", value: "created_at" },
  { label: "Verified", value: "verified" },
  { label: "Most Rated", value: "average_ratings" },
  { label: "Most Popular", value: "most_loved" },
];

export default function SortedBy() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderingParams = searchParams.get("ordering");

  let selectedOption = sortingOptions.find(item =>item.value === orderingParams)

  function sortingSetUrl(sorting) {
    let sortingParam = sorting ? `ordering=${sorting}` : "";
    // Construct the final URL
    let url = pathName;
    if (sorting) {
      url += `?${sortingParam}`;
    }
    router.replace(url);
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as="button"
        className="flex items-center justify-center gap-3 w-full"
      >
        <div className="hidden md:block">
          <span className="text-odthem/40">Sort By:</span>
          <span className="font-bold pl-1">
            {
              orderingParams ? selectedOption.label : "Newest"
            }
          </span>
        </div>

        <IoIosArrowDown className="hidden md:block w-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-90"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 border-2 divide-y-2 shadow-none lg:shadow-2xl w-full bottom-14 lg:bottom-auto lg:top-8 bg-dtheme rounded-lg border-odtheme/10 divide-odtheme/5 z-10">
          {sortingOptions.map((item) => (
            <Menu.Item key={item.value} className="p-3 hover:bg-odtheme/5">
              <div
                onClick={() => sortingSetUrl(item.value)}
                className={`flex items-center gap-2 w-full cursor-pointer ${selectedOption && selectedOption.value === item.value && "bg-odtheme/10"}`}
              >
                {item.label}
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
