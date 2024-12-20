import { cn } from "@/lib/utils/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: JSX.Element | string;
  endAdornment?: JSX.Element | string;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startAdornment,
      wrapperClassName,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const hasAdornment = Boolean(startAdornment) || Boolean(endAdornment);
    return (
      <>
        {hasAdornment ? (
          <div
            className={cn(
              "ring-offset-background flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-transparent px-3 transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-1 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
              wrapperClassName
            )}
            data-disabled={props.disabled}
          >
            {startAdornment && (
              <div
                className={cn(
                  "!text-muted-foreground",
                  typeof startAdornment === "string" &&
                    "bg-muted/70 border-input border-r pr-3 text-sm"
                )}
              >
                {startAdornment}
              </div>
            )}
            <input
              type={type}
              className={cn(
                "flex h-full w-full rounded-md border-none bg-transparent py-2 text-sm shadow-none outline-none file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none",
                className
              )}
              ref={ref}
              {...props}
            />
            {endAdornment && (
              <div className={cn("text-muted-foreground")}>{endAdornment}</div>
            )}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border outline-none border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
