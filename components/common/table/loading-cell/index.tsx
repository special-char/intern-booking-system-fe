import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface LoadingCellProps extends PropsWithChildren {
  isLoading: boolean
  loadingClassname?: string
}

export function LoadingCell({ isLoading, loadingClassname, children }: LoadingCellProps) {
  if (isLoading) {
    return (
      <Skeleton
        variant="default"
        className={cn(loadingClassname, "min-w-10")}
      />
    )
  }
  return children
}