import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-primary/10",
  {
    variants: {
      variant: {
        input: "bg-[var(--border-input)] w-1/2 h-8",
      }
    }
  }
)

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> { }

function Skeleton({
  className,
  variant,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Skeleton }
