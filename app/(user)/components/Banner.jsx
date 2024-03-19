"use client";
import { useState } from "react";
import Image from "next/image";
import { headerText } from "@/const";
import Button from "@/components/buttons/Button";
import Modal from "@/components/modal/Modal";
import Input from "@/components/forms/Input";
import FullScreenModal from "@/components/modal/FullScreenModal";
import CategoryModal from "./searchandfilters/CategoryModal";
import { GlobalSearch } from "./searchandfilters/GlobalSearch";
import { usePathname } from "next/navigation";

import { Category, Search } from "@/components/svg/icons";
import { useTheme } from "next-themes";

export default function Banner() {
  const theme = useTheme();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4 md:py-14">
      <div className="text-center text-2xl md:text-[40px] text-odtheme/80">
        {headerText}
      </div>

      <div className="flex justify-center gap-2 w-full">
        <form
          // onSubmit={performSearch}
          className="w-11/12 md:w-1/2 flex items-center rounded-full shadow-md shadow-odtheme/10 border border-odtheme/10 pl-6 pr-[6px] py-[6px]"
        >
          <Search className="text-odtheme w-4 h-4"/>
          <Input
            placeholder="Search Ai tools"
            className="w-full text-sm font-medium bg-transparent border-0 focus:outline-0 md:text-base p-0 pl-2"
            value={""}
            onClick={() => setIsSearchModalOpen(true)}
          />

          <Button
            variant="dynamic"
            type="submit"
            className={`rounded-full py-2 md:py-4 px-4 md:px-6 ${theme.theme === "dark" && "bg-[#3F3A50] text-odtheme"}`}
          >
            Search
          </Button>
        </form>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="secondaryOutlined"
          className={`gap-1 rounded-full border font-semibold ${
            pathname === "/" ? "md:flex hidden" : "hidden"
          }`}
        >
          <Category className="w-[18px] h-[18px]" /> Categories
        </Button>
      </div>
      <div>
        <p>Powered by </p>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>

      <FullScreenModal
        show={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      >
        <GlobalSearch
          onClose={() => setIsSearchModalOpen(false)}
          setIsSearchModalOpen={setIsSearchModalOpen}
        />
      </FullScreenModal>
    </div>
  );
}
