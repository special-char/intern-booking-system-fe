import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { Skeleton } from '@/components/shadcn/skeleton';
import { Lock } from 'lucide-react';

export function TireSupplierConnectionKeySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/4" />
      </CardHeader>
      <CardContent className='mt-5'>
        <Input
          disabled
          loading
          rightIcon={<Lock size={16} className="text-text-placeholder" />}
        />
        <Skeleton variant="default" className="mt-2 h-4 w-2/5" />
      </CardContent>
    </Card>
  );
}