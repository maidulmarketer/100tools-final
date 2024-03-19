import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary-500",
  warning: "bg-dwarning",
  warningTransparent: "bg-dwarning/10 text-dwarning rounded",
  semiWarningTransparent: "bg-dsemiwarning/10 text-dsemiwarning rounded",
  success: "bg-success-500",
  successTransparent: "bg-dsuccess/10 text-dsuccess rounded",
  danger: "bg-ddanger",
  dangerTransparent: "bg-ddanger/10 text-ddanger rounded",
  dynamic: "bg-odtheme/5 text-odtheme",
  outline: "bg-transparent border border-odtheme/10 text-odtheme rounded-full"
};

export default function Badge({
  variant = "primary",
  children,
  className,
  ...restProps
}) {
  return (
    <div
      className={cn(
        "w-fit rounded-full p-2 text-white text-xs font-semibold whitespace-nowrap",
        variants[variant],
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
