import { HiOutlineMenuAlt1 } from "react-icons/hi";

import Brand from "./Brand";
import DropdownUser from "./DropdownUser";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-[999] flex w-full bg-dtheme border-b border-odtheme/10">
      <div className="flex items-center justify-between flex-grow p-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-[99999] block lg:hidden"
          >
            <HiOutlineMenuAlt1 className="w-8 h-8" />
          </button>

          <Brand sponsor="ChatGPT" />
        </div>

        <h3 className="hidden text-xl font-semibold lg:block">
          Admin Dashboard
        </h3>

        <div className="flex items-center gap-10">
          <ThemeSwitcher />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
}
