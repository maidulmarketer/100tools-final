import { cn } from "@/lib/utils";

export default function PageTitle({ title, className }) {
  return (
    <h1 className={cn("text-lg md:text-2xl font-semibold", className)}>
      {title}
    </h1>
  );
}
