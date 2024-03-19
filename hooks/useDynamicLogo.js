"use client";
import { useTheme } from "next-themes";
import logo from "@/public/logo.png";
import logoDark from "@/public/logo-dark.png";

export default function useDynamicLogo() {
  const { theme } = useTheme();
  if (!theme) return logo;
  return theme === "light" ? logo : logoDark;
}
