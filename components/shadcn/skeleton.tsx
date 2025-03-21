import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-primary/10",
  {
    variants: {
      variant: {
        default: "bg-[var(--border-input)] w-1/2 h-6",
        ring: "bg-[var(--border-input)]"
      }
    }
  }
)

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
  outerSize?: number
  thickness?: number
}

function Skeleton({
  className,
  variant,
  outerSize = 140,
  thickness = 24,
  ...props
}: SkeletonProps) {
  if (variant !== "ring") {
    return (
      <div
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    )
  }

  const innerSize: number = outerSize - thickness * 2

  return (
    <div
      className={cn("relative", className)}
      style={{
        width: outerSize,
        height: outerSize,
      }}
      {...props}
    >
      <div
        className={cn(skeletonVariants({ variant }), "absolute rounded-full animate-pulse")}
        style={{
          width: outerSize,
          height: outerSize,
        }}
      />
      <div
        className="absolute rounded-full bg-background"
        style={{
          width: innerSize,
          height: innerSize,
          top: thickness,
          left: thickness,
        }}
      />
    </div>
  )
}

export { Skeleton }
