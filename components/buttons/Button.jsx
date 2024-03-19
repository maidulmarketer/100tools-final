import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary-400 text-white",
  text: "bg-transparent text-odtheme",
  secondary: "bg-odtheme/5 border-2 border-odtheme/5 text-odtheme",
  secondaryOutlined: "bg-transparent border-2 border-odtheme/10 text-odtheme",
  dynamic: "bg-odtheme text-dtheme",
  dynamicOutlined: "bg-transparent border border-odtheme text-odtheme",
  light: "bg-white text-dark",
  dark: "bg-black text-white",
  success: "bg-dsuccess text-dtheme",
  danger: "bg-ddanger text-dtheme",
  darkGray: "bg-transparent border border-odtheme/10 text-odtheme/40",
  badgeType: "bg-transparent border border-odtheme/20 text-odtheme/60",
  bgPrimary: "bg-primary text-white"
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        "flex justify-center items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold whitespace-nowrap hover:opacity-80 transition-opacity disabled:opacity-25",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
