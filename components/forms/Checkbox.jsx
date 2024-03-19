"use client";

import { cn } from "@/lib/utils";

export default function Checkbox({
  label,
  register,
  isChecked,
  error,
  backendError,
  className,
  ...restProps
}) {
  return (
    <div>
      <label
        className={cn(
          "flex items-center p-4 gap-x-4 border border-odtheme/10 rounded cursor-pointer font-semibold",
          isChecked && "bg-primary-500/25",
          className
        )}
      >
        <input
          type="checkbox"
          {...register}
          {...restProps}
          className="w-4 h-4"
        />
        {label}
      </label>
      {error && <p className="text-sm text-ddanger">{error.message}</p>}
      {backendError && (
        <p className="text-sm text-ddanger first-letter:uppercase">
          {backendError}
        </p>
      )}
    </div>
  );
}
