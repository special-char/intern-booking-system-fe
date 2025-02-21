import * as React from "react";
import { cn } from "@/lib/utils";

// Usuwamy natywny "size" z propsów inputa
export type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: "small" | "default" | "large";
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "default", ...props }, ref) => {
    const sizeClasses = {
      small: "h-8",
      default: "h-9",
      large: "h-10",
    };

    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border border-input bg-white px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
