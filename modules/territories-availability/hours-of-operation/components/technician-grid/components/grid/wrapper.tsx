"use client"

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface TechnicianGridWrapperProps extends PropsWithChildren {
  className?: string
}

export function TechnicianGridWrapper({ className, children }: TechnicianGridWrapperProps) {
  return (
    <div className={cn("grid grid-cols-[repeat(8,_minmax(9rem,auto))] rounded-lg overflow-y-scroll", className)}>
      <div className="bg-white sticky left-0 z-10 border-r"></div>
      {children}
    </div>
  )
}