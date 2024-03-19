import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { BiLogOut } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data } = useSession();

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block font-medium text-odtheme">
            {data.user.name || "Anonymous"}
          </span>
          <span className="block text-xs uppercase">{data.user.role}</span>
        </span>

        <IoIosArrowDown className="w-5 h-5" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-40 flex-col rounded-sm border border-odtheme/10 bg-dtheme shadow-default ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          onClick={signOut}
          className="flex items-center gap-4 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:bg-odtheme/10 lg:text-base"
        >
          <BiLogOut className="w-5 h-5 shrink-0" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
