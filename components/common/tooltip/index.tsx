import { TooltipProvider, Tooltip as TooltipComponent, TooltipContent, TooltipTrigger } from "@/components/shadcn/tooltip";
import { InfoIcon } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";

interface TooltipProps extends PropsWithChildren {
  icon?: ReactNode
}

export function Tooltip({ children, icon = <InfoIcon className="w-4 h-4 text-text-secondary cursor-pointer" /> }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipComponent>
        <TooltipTrigger>
          {icon}
        </TooltipTrigger>
        <TooltipContent>
          {children}
        </TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  );
}