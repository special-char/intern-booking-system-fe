import { TimeSlider } from '@/components/common/time/time-slider';
import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { Skeleton } from '@/components/shadcn/skeleton';

export function TireSupplierOrderCutoffSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent>
        <div className="relative 2xl:w-1/3 mt-5">
          <Input
            disabled
            loading
            type='time'
          />
        </div>
        <div className="py-5 px-1">
          <TimeSlider
            disabled
            isLoading
            value={21600}
            markerEverySecond={60 * 60 * 3}
          />
        </div>
      </CardContent>
    </Card>
  );
}