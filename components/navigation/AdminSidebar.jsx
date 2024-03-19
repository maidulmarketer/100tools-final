import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { LuBrainCircuit } from "react-icons/lu";
import { VscFeedback } from "react-icons/vsc";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { PiCardsLight } from "react-icons/pi";
import { MdOutlineFeaturedVideo, MdOutlineFindInPage, MdOutlineVerified } from "react-icons/md";
import { TbUserShield } from "react-icons/tb";

import Brand from "@/components/navigation/Brand";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const iconsClass = "w-5 h-5";

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-60 flex-col overflow-y-hidden bg-dtheme border-r border-odtheme/10 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-4">
        <Brand />

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-odtheme hover:text-odtheme/80"
        >
          <BsFillArrowLeftSquareFill className="w-8 h-8" />
        </button>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="p-4 mt-10">
          <h3 className="mb-4 ml-4 text-sm font-semibold">MENU</h3>

          <ul className="mb-6 flex flex-col gap-1.5">
            <li>
              <Link
                href="/admin"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname === "/admin" && "bg-odtheme/10"
                }`}
              >
                <RxDashboard className={iconsClass} />
                Requested Tools
              </Link>
            </li>
            <li>
              <Link
                href="/admin/verification-request"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname === "/admin/verification-request" && "bg-odtheme/10"
                }`}
              >
                <MdOutlineVerified className={iconsClass} />
                Verification Tools
              </Link>
            </li>

            <li>
              <Link
                href="/admin/tools"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/tools") && "bg-odtheme/10"
                }`}
              >
                <LuBrainCircuit className={iconsClass} />
                AI Tools
              </Link>
            </li>

            <li>
              <Link
                href="/admin/featured-tools"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/featured-tools") && "bg-odtheme/10"
                }`}
              >
                <LuBrainCircuit className={iconsClass} />
                Featured Tools
              </Link>
            </li>

            <li>
              <Link
                href="/admin/categories"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/categories") && "bg-odtheme/10"
                }`}
              >
                <PiCardsLight className={iconsClass} />
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/admin/sub-categories"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/sub-categories") && "bg-odtheme/10"
                }`}
              >
                <BiCategoryAlt className={iconsClass} />
                Sub Categories
              </Link>
            </li>
            <li>
              <Link
                href="/admin/features"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/features") && "bg-odtheme/10"
                }`}
              >
                <MdOutlineFeaturedVideo className={iconsClass} />
                Features
              </Link>
            </li>

            <li>
              <Link
                href="/admin/users"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/users") && "bg-odtheme/10"
                }`}
              >
                <HiOutlineUsers />
                Users
              </Link>
            </li>

            <li>
              <Link
                href="/admin/staffs"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/staffs") && "bg-odtheme/10"
                }`}
              >
                <TbUserShield />
                Staffs
              </Link>
            </li>

            <li>
              <Link
                href="/admin/blogs"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/blogs") && "bg-odtheme/10"
                }`}
              >
                <VscFeedback />
                Blogs
              </Link>
            </li>

            <li>
              <Link
                href="/admin/seo-settings"
                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium duration-300 ease-in-out hover:bg-odtheme/5 ${
                  pathname.includes("/admin/seo-settings") && "bg-odtheme/10"
                }`}
              >
                <MdOutlineFindInPage />
                SEO Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}