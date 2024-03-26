"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
import SearchModal from "@/components/modal/SearchModal";
import { useQuery } from "@tanstack/react-query";
import { getPoweredBy } from "@/services/user/toolsService";
import arrow from "../../../public/images/icons/arrow.svg";
import { LuArrowUpRight } from "react-icons/lu";

export default function Banner() {
  const theme = useTheme();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [formWidth, setFormWidth] = useState(0);
  const [formPosition, setFormPosition] = useState(0);
  const [formTopPosition, setFormTomPosition] = useState(0);

  const formRef = useRef(null);

  const { data: sponsor, refetch } = useQuery({
    queryKey: ["sponsor"],
    queryFn: () => getPoweredBy().then((res) => res.data),
  });

  useEffect(() => {
    const updateFormDimensions = () => {
      if (formRef.current) {
        const { width, left, top } = formRef.current.getBoundingClientRect();
        setFormWidth(width);
        setFormPosition(left);
        setFormTomPosition(top);
      }
    };

    updateFormDimensions();

    const handleResize = () => {
      updateFormDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4 md:py-14">
      <section className="text-center text-2xl md:text-[40px] text-odtheme/80">
        {headerText}
      </section>

      <section>
        <p className="flex gap-2">
          {sponsor?.results[0].name || "Powered by"}
          <Link
            className="flex gap-1 items-center font-semibold leading-5"
            href={sponsor?.results[0].link || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="border-b-2 border-gradient text-gradient">
              {sponsor?.results[0].description || ""}
            </span>
            {/* <Image
                  width={20}
                  height={20}
                  src={arrow}
                  alt="dot"
                  className="w-5 h-5 object-cover"
                /> */}
            <LuArrowUpRight className="w-4 h-4"/>
          </Link>
        </p>
      </section>

      <section className="flex justify-center gap-2 w-full">
        <div
          ref={formRef}
          className="relative w-11/12 md:w-2/5 flex justify-start items-center gap-3 md:gap-0 rounded-full shadow-md shadow-odtheme/10 border border-odtheme/10 pl-6 pr-[6px] py-[6px]"
        >
          <div className="w-fit">
            <Search className="text-odtheme w-4 h-4" />
          </div>
          <Input
            placeholder="Search Ai tools"
            mainDiv="hidden md:flex"
            className="w-full text-sm font-medium bg-transparent border-0 focus:outline-0 md:text-base p-0 pl-2"
            onClick={() => setIsDesktopModalOpen(true)}
          />
          <div
            className="block md:hidden w-full font-medium md:text-base text-odtheme/50"
            onClick={() => setIsSearchModalOpen(true)}
          >
            Search Ai tools
          </div>
          <Button
            variant="dynamic"
            className={`rounded-full py-2 md:py-4 px-4 md:px-6 ${
              theme.theme === "dark" && "bg-[#3F3A50] text-odtheme"
            }`}
          >
            Search
          </Button>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          variant="secondaryOutlined"
          className={`gap-1 rounded-full border font-semibold ${
            pathname === "/" ? "md:flex hidden" : "hidden"
          }`}
        >
          <Category className="w-[18px] h-[18px]" /> Categories
        </Button>
      </section>

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

      <SearchModal
        show={isDesktopModalOpen}
        onClose={() => setIsDesktopModalOpen(false)}
        width={formWidth}
        positionFromLeft={formPosition}
        formTopPosition={formTopPosition}
      >
        <GlobalSearch
          onClose={() => setIsDesktopModalOpen(false)}
          setIsSearchModalOpen={setIsDesktopModalOpen}
        />
      </SearchModal>
    </div>
  );
}