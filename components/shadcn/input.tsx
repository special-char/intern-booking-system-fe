import * as React from "react";
import { cn } from "@/lib/utils";

// Usuwamy natywny "size" z propsów inputa
export type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: "small" | "default" | "large";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
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
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      small: "h-8",
      default: "h-9",
      large: "h-10",
    };

    return (
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
    );
  }
);

Input.displayName = "Input";

export { Input };
