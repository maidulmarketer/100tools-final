"use client";
import { cn } from "@/lib/utils";

export default function Input({
  label,
  name,
  register,
  error,
  backendError,
  className,
  mainDiv,
  ...restProps
}) {
  return (
    <div className={cn("flex flex-col w-full form-group", mainDiv)}>
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        id={label}
        {...register}
        {...restProps}
        className={cn(
          "w-full px-4 py-2 rounded bg-odtheme/5 border border-odtheme/10 focus:outline-odtheme/50 read-only:opacity-75 read-only:cursor-not-allowed",
          error &&
            "bg-ddanger/10 text-ddanger border-ddanger focus:outline-ddanger",
          className
        )}
      />
      {error && <p className="text-sm text-ddanger">{error.message}</p>}
      {backendError && (
        <p className="text-sm text-ddanger first-letter:uppercase">
          {backendError}
        </p>
      )}
    </div>
  );
}
