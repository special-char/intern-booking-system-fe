import { PropsWithChildren } from "react";

interface LoadingHeaderProps extends PropsWithChildren {
  isLoading: boolean
}

export function LoadingHeader({ isLoading, children }: LoadingHeaderProps) {
  if (isLoading) {
    return ""
  }
  return children
}