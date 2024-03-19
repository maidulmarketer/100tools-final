"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import FullScreenModal from "@/components/modal/FullScreenModal";
import CategoryModal from "./searchandfilters/CategoryModal";
import SortingModal from "./searchandfilters/SortingModal";
import BottomModal from "@/components/modal/BottomModal";
import { Filter, Sort } from "@/components/svg/icons";

function Scroll({ children, searchParams }) {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, [searchParams]);

  return (
    <div>
      {scrollY > 400 && (
        <section className={`flex md:hidden justify-center items-center fixed bottom-[70px] border-odtheme/10 w-full z-20`}>
          <div className={`flex items-center gap-1 text-dtheme p-2 rounded-md text-sm ${theme.theme=== 'dark' ? "bg-[#282A39] text-odtheme" : "bg-dtheme"}`}>
            <p
              onClick={() => setIsModalOpen(true)}
              className="flex gap-1 items-center"
            >
              <Filter className="w-4 h-4"/>
              Filters
            </p>
            |
            <p 
              onClick={() => setIsSortModalOpen(true)}
              className="flex gap-1 items-center"
            > 
              <Sort className="w-6"/>
              Sorted by
            </p>
          </div>
        </section>
      )}

      {children}

      <FullScreenModal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </FullScreenModal>
      <BottomModal show={isSortModalOpen} onClose={() => setIsSortModalOpen(false)}>
        <SortingModal
          isModalOpen={isSortModalOpen}
          setIsModalOpen={setIsSortModalOpen}
        />
      </BottomModal>
    </div>
  );
}

export default Scroll;