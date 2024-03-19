"use client";

import { cn } from "@/lib/utils";

export default function CheckboxWithoutBg({
  label,
  register,
  isChecked,
  error,
  backendError,
  className,
  ...restProps
}) {
  return (
    <label
      className={cn(
        "flex items-center p-4 gap-x-4 border border-odtheme/10 rounded cursor-pointer font-semibold", className,
      )}
    >
      <input type="checkbox" {...register} {...restProps} className="w-4 h-4" />
      {label}
    </label>
  );
}
