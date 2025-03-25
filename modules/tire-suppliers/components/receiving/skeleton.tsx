import { TimeRange } from '@/components/common/time/time-range';
import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { Skeleton } from '@/components/shadcn/skeleton';
import { TIME_MARKER_EVERY } from '../../templates/tire-supplier-template';

export function TireSupplierReceivingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/12" />
      </CardHeader>
      <CardContent>
        <div className="flex mt-5 gap-x-3 flex-wrap">
          <Skeleton variant="default" className="h-10 max-w-30 grow" />
          <Skeleton variant="default" className="h-10 max-w-30 grow" />
        </div>
        <>
          <div className="flex justify-between gap-x-4 mt-5 flex-wrap">
            <div className="grow">
              <Input
                disabled
                loading
                type='time'
              />
            </div>
            <div className="grow">
              <Input
                disabled
                loading
                type='time'
              />
            </div>
          </div>
          <div className="py-5 px-1">
            <TimeRange
              disabled
              isLoading
              markerEverySecond={TIME_MARKER_EVERY}
              value={[43200, 64800]} // 12:00 PM to 6:00 PM
            />
          </div>
          <div className="mt-3 text-sm">
            <Skeleton variant="default" className="h-4 w-1/4" />
            <Skeleton variant="default" className="h-20 w-full mt-3" />
          </div>
        </>
      </CardContent>
    </Card>
  );
}