"use client";

import { cn } from "@/lib/utils";

export default function Select({
  label,
  options,
  register,
  error,
  backendError,
  className,
  optionClass,
  ...restProps
}) {
  return (
    <div className="flex flex-col w-full form-group gap-y-1">
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <select
        id={label}
        {...register}
        {...restProps}
        className={cn(
          "w-full px-4 py-2 rounded bg-odtheme/5 border border-odtheme/10 focus:outline-odtheme/50",
          error &&
            "bg-ddanger/10 text-ddanger border-ddanger focus:outline-ddanger",
          className
        )}
      >
        {options?.map((option, i) => (
          <option
            key={i}
            value={option.value}
            className={cn("bg-dtheme", optionClass)}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-ddanger">{error.message}</p>}
      {backendError && (
        <p className="text-sm text-ddanger first-letter:uppercase">
          {backendError}
        </p>
      )}
    </div>
  );
}
