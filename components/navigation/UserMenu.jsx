import Image from "next/image";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { IoIosArrowDown } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";

export default function UserMenu({ user }) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as="button"
        className="flex items-center justify-center gap-1 p-1 text-sm transition-opacity bg-transparent rounded-lg sm:p-2 sm:gap-2 sm:border-2 hover:opacity-80 disabled:opacity-25 sm:border-odtheme/10 text-odthem"
      >
        {user.picture ? (
          <Image
            src={user.picture}
            width={40}
            height={40}
            alt="user avatar"
            className="object-cover w-8 h-8 rounded-full sm:w-7 sm:h-7"
          />
        ) : null}

        <p className="hidden font-semibold sm:block">
          {user.name || "Anonymous"}
        </p>
        <IoIosArrowDown className="w-4" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 overflow-hidden border-2 divide-y-2 shadow-2xl w-44 top-14 bg-dtheme rounded-xl border-odtheme/10 divide-odtheme/5">
        {user.role === "OWNER" || user.role === "ADMIN" ? (
          <Menu.Item className="p-3 hover:bg-odtheme/5">
            <Link href="/admin" className="flex items-center gap-2">
              <RxDashboard className="w-5 h-5" />
              Dashboard
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item className="p-3 hover:bg-odtheme/5">
            <Link href="/favorites" className="flex items-center gap-2">
              <CiStar className="w-5 h-5" />
              Your Favorites
            </Link>
          </Menu.Item>
        )}

        <Menu.Item className="p-3 hover:bg-odtheme/5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            <CiLogout className="w-5 h-5" />
            Logout
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
