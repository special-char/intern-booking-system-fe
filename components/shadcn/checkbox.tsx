"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    size?: "default" | "sm";
  }
>(({ className, size = "default", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "relative cursor-pointer inline-flex items-center justify-center shrink-0 rounded-sm border border-border-primary \
       focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring \
       disabled:cursor-not-allowed disabled:opacity-50 \
       data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      size === "sm" && "h-3.5 w-3.5",
      size === "default" && "h-4 w-4",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current leading-none"
      )}
    >
      <Check
        className={cn(
          size === "sm" && "h-3.5 w-3.5",
          size === "default" && "h-4 w-4"
        )}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
