import { Tooltip } from "@/components/common/tooltip";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Switch } from "@/components/shadcn/switch";

import { TireSupplier } from "@/types/tire-supplier";

interface TireSupplierAutoPayProps {
  autoPay: TireSupplier['autoPay']
  onChange: (checked: boolean) => void
}

export default function TireSupplierAutoPay({ autoPay, onChange }: TireSupplierAutoPayProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-text-primary">
            Payment
          </h2>
          <Tooltip>
            <p>lorem ipsum</p>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mt-5 items-center">
          <h2 className="text-sm font-medium text-text-primary">AutoPay</h2>
          <Switch
            checked={autoPay}
            size="large"
            onCheckedChange={onChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}