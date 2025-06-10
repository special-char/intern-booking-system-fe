import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip"

interface TooltipProps {
  children: React.ReactNode
  content?: string
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">?</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content || children}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  )
} 