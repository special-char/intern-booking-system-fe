import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: "small" | "default" | "large";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
  caption?: string;
  loading?: boolean
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size = "default",
      leftIcon,
      rightIcon,
      wrapperClassName,
      loading,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      small: "h-8",
      default: "h-9",
      large: "h-10",
    };

    if (loading) {
      return (
        <div className="relative border rounded-md h-9 px-3 py-2 flex items-center bg-background">
          <Skeleton variant="input" className={cn("h-5 w-[70%] rounded-md absolute", leftIcon ? "right-3" : "left-3")} />
          {(rightIcon || leftIcon) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon || leftIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <>
        <div className={cn(wrapperClassName, "relative")}>
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex w-full rounded-lg border border-input bg-white px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              sizeClasses[size],
              leftIcon && "pl-8",
              rightIcon && "pr-8",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {props.caption && (
          <p className="mt-1 text-xs text-text-placeholder">
            {props.caption}
          </p>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
