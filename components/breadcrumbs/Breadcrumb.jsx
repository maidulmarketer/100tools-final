// components/Breadcrumb.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronRight } from "react-icons/md";

const Breadcrumb = () => {
  const pathName = usePathname();
  const pathSegments = pathName.split("/").filter((segment) => segment !== "");

  return (
    <nav>
      <div className="flex gap-1 items-cente text-sm">
        <Link href="/">
          <>Home</>
        </Link>
        {pathSegments.map((segment, index) => (
          <div key={index} className="flex gap-1 items-center capitalize">
            <span>
              <MdChevronRight className="w-5" />
            </span>
            <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
              <>{segment === "about" ? "About Us" : segment.toLowerCase()}</>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
