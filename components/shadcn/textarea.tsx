import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export type TextareaProps = Omit<React.ComponentProps<"textarea">, "size"> & {
  size?: "small" | "default" | "large";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  skeletonClassName?: string;
  wrapperClassName?: string;
  caption?: string;
  loading?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size = "default",
      leftIcon,
      rightIcon,
      wrapperClassName,
      loading,
      skeletonClassName,
      caption,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      small: "min-h-8",
      default: "min-h-16",
      large: "min-h-24",
    };

    if (loading) {
      return (
        <div
          className={cn(
            "relative border rounded-md min-h-16 px-3 py-2 flex items-start bg-background",
            wrapperClassName
          )}
        >
          <Skeleton
            variant="default"
            className={cn(
              "h-20 rounded-md absolute",
              leftIcon ? "left-10" : "left-3",
              leftIcon ? "w-[calc(70%-1rem)]" : "w-[70%]",
              skeletonClassName
            )}
          />
          {(rightIcon || leftIcon) && (
            <div
              className={cn(
                "absolute",
                leftIcon ? "left-3" : "right-3",
                "top-3"
              )}
            >
              {rightIcon || leftIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        <div className={cn(wrapperClassName, "relative")}>
          {leftIcon && <div className="absolute left-3 top-3">{leftIcon}</div>}
          <textarea
            className={cn(
              "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content w-full rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              sizeClasses[size],
              leftIcon && "pl-8",
              rightIcon && "pr-8",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-3">{rightIcon}</div>
          )}
        </div>
        {caption && (
          <p className="mt-1 text-xs text-text-placeholder">{caption}</p>
        )}
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
