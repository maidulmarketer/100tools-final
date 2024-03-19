"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { BsSun } from "react-icons/bs";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? (
        <WiMoonAltFirstQuarter className="w-4" />
      ) : (
        <BsSun className="w-4" />
      )}
    </button>
  );
}
