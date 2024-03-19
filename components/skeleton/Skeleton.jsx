import { cn } from "@/lib/utils";

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={cn("w-full h-4 bg-odtheme/10 rounded animate-pulse", className)}
    />
  );
}