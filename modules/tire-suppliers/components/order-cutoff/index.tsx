import { TimeSlider } from "@/components/common/time/time-slider";
import { Tooltip } from "@/components/common/tooltip";
import { Card, CardHeader, CardContent } from "@/components/shadcn/card";
import { TireSupplier } from "@/types/tire-supplier";
import { TIME_MARKER_EVERY } from "../../templates/tire-supplier-template";
import { SAVE_DEBOUNCE } from "@/lib/constants";
import { TimeInput } from "@/components/common/time/time-input";

interface TireSupplierOrderCutoffProps {
  data: {
    value: TireSupplier["orderCutoff"];
    min: TireSupplier["orderCutoffMin"];
    max: TireSupplier["orderCutoffMax"];
  }
  onChange: (orderCutoff: TireSupplier["orderCutoff"]) => void;
}

export default function TireSupplierOrderCutoff({ data: { max, min, value }, onChange }: TireSupplierOrderCutoffProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-text-primary">
            Order Cutoff
          </h2>
          <Tooltip>
            <p>lorem ipsum</p>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-5 2xl:w-1/3">
          <TimeInput
            min={min}
            max={max}
            onChange={onChange}
            value={value}
          />
        </div>
        <div className="py-5 px-1">
          <TimeSlider
            markerEverySecond={TIME_MARKER_EVERY}
            maxSeconds={max}
            minSeconds={min}
            onChange={onChange}
            onChangeDebounce={SAVE_DEBOUNCE}
            value={value}
          />
        </div>
      </CardContent>
    </Card>
  );
}