import { cn } from "@/lib/utils";

export default function Container({ children, className }) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 pb-6 md:pb-10", className)}>
      {children}
    </div>
  );
}
