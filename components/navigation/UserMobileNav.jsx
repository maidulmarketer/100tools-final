"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { MdOutlineAccountCircle } from "react-icons/md";
import { Deal, Home, MobCategory, TopStar, User } from "../svg/icons";
import { useTheme } from "next-themes";

export default function UserMobileNav() {
  const theme = useTheme();
  const { data, status } = useSession();

  const isAuthenticated = status === "authenticated";

  function handleAuth() {}

  const mobileNav = [
    {
      id: "0",
      href: "#",
      icon: <TopStar className="w-6 h-6" />,
      label: "Top 100",
    },
    {
      id: "1",
      href: "/ai-tools",
      icon: <MobCategory className="w-6 h-6" />,
      label: "Categories",
    },
    {
      id: "2",
      href: "/",
      icon: <Home className="w-[18px] h-[18px] text-odtheme" />,
      label: "",
    },
    {
      id: "3",
      href: "#",
      icon: <Deal className="w-6 h-6" />,
      label: "Details",
    },
    {
      id: "4",
      clickAction: () => (isAuthenticated ? signOut() : signIn("google")),
      icon: isAuthenticated ? (
        <div>
          {data.user.picture ? (
            <Image
              src={data.user.picture}
              width={24}
              height={24}
              alt="user avatar"
              className="object-cover w-6 h-6 rounded-full"
            />
          ) : (
            <MdOutlineAccountCircle className="w-6 h-6" />
          )}
        </div>
      ) : (
        <User className="w-6 h-6" />
      ),
      label: isAuthenticated ? "Account" : "Login",
    },
  ];

  return (
    <nav>
      <section className={`block md:hidden fixed bottom-0 w-full z-20 border-odtheme/10 px-4 py-2 border-t ${theme.theme=== 'dark' ? "bg-[#282A39]" : "bg-dtheme"}`}>
        <div className="flex justify-center gap-4 items-end relative">
          {mobileNav.map((item) => (
            <div
              key={item.id}
              onClick={item.clickAction ? item.clickAction : null}
              className={`flex flex-col gap-1 items-center flex-1 ${
                item.id == 2 && "bg-odtheme/10 rounded-full flex-none px-4 py-3"
              }`}
            >
              {item.href ? (
                <Link
                  className="flex flex-col gap-1 items-center"
                  href={item.href}
                >
                  {item.icon} <span className="text-[10px]  text-odtheme/50 font-bold leading-3">{item.label}</span>
                </Link>
              ) : (
                <div >
                  {item.icon} <p className="text-[10px] font-bold text-odtheme/50 leading-3">{item.label}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </nav>
  );
}
