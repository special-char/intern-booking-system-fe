import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import { Skeleton } from '@/components/shadcn/skeleton';
import { Switch } from '@/components/shadcn/switch';

export function TireSupplierAutoPaySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mt-5 items-center">
          <Skeleton variant="default" className="h-4 w-1/4" />
          <Switch
            disabled
            checked={false}
            size="large"
          />
        </div>
      </CardContent>
    </Card>
  );
}