import { Skeleton } from "@/components/shadcn/skeleton";
import { PropsWithChildren } from "react";

interface LoadingCellProps extends PropsWithChildren {
  isLoading: boolean
  loadingClassname?: string
}

export function LoadingCell({ isLoading, loadingClassname, children }: LoadingCellProps) {
  if (isLoading) {
    return <Skeleton variant="default" className={loadingClassname} />
  }
  return children
}