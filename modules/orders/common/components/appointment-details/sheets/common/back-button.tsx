import { ScreenCarouselTrigger } from "@/components/common/screen-carousel/trigger"
import { Button } from "@/components/shadcn/button";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  goToScreen: number
}

export function BackButton({ goToScreen }: BackButtonProps) {
  return (
    <ScreenCarouselTrigger goToScreen={goToScreen} className="absolute -left-2.5">
      <Button variant="ghost" size="icon">
        <ChevronLeft className="min-h-6 min-w-6 text-secondary" />
      </Button>
    </ScreenCarouselTrigger>
  );
}