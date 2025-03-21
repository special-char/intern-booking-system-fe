import { Checkbox } from "@/components/shadcn/checkbox";
import { Skeleton } from "@/components/shadcn/skeleton";
import { ChevronRightIcon } from "lucide-react";

interface TireCardSkeletonProps {
  isAddMode: boolean
}

export function TireCardSkeleton({ isAddMode }: TireCardSkeletonProps) {
  return (
    <div className="flex items-center">
      {isAddMode && (
        <Checkbox
          className="mr-3"
          checked={false}
        />
      )}
      <div className="flex items-center bg-gray-50 p-2 rounded-lg grow">
        <Skeleton variant="default" className="rounded-xl h-13 w-13 mr-2" />
        <div className="flex flex-col grow">
          <div className="flex justify-between mt-1">
            <Skeleton variant="default" className="h-[14px] w-2/3" />
            <ChevronRightIcon className="w-9 h-4 text-text-secondary" />
          </div>
          <Skeleton variant="default" className="h-[14px] w-1/2 mt-2" />
        </div>
      </div>
    </div>
  );
}
