import { RadioButton } from "@/components/common/radio-button";
import { TimeRange } from "@/components/common/time/time-range";
import { Tooltip } from "@/components/common/tooltip";
import { Card, CardHeader, CardContent } from "@/components/shadcn/card";
import { RadioGroup } from "@/components/shadcn/radio-group";
import { TireSupplier } from "@/types/tire-supplier";
import { TIME_MARKER_EVERY } from "../../templates/tire-supplier-template";
import { SAVE_DEBOUNCE } from "@/lib/constants";
import { TimeInput } from "@/components/common/time/time-input";
import { NotebookText } from "lucide-react";

interface TireSupplierReceivingProps {
  data: {
    from: TireSupplier['receivingFrom']
    min: TireSupplier['receivingMin']
    max: TireSupplier['receivingMax']
    notes: TireSupplier['notes']
    receiving: TireSupplier['receiving']
    to: TireSupplier['receivingTo']
  }
  onRangeChange: (range: [number, number]) => void
  onReceivingChange: (receiving: TireSupplier['receiving']) => void
}

export default function TireSupplierReceiving({ data: { from, max, min, notes, receiving, to }, onRangeChange, onReceivingChange }: TireSupplierReceivingProps) {
  function handleRangeChange(range: [number, number]): void {
    onRangeChange(range);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 justify-between">
          <h2 className="text-sm font-medium text-text-primary">
            Tire receiving
          </h2>
          <Tooltip>
            <p>lorem ipsum</p>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup
          defaultValue={receiving}
          className="flex mt-5 flex-wrap"
          onValueChange={onReceivingChange}
        >
          {["routeDelivery", "willCall"].map((value) => (
            <RadioButton
              key={value}
              id={value}
              value={value}
              variant="primary"
              label={value === "routeDelivery" ? "Route Delivery" : "Will Call"}
            />
          ))}
        </RadioGroup>
        {receiving === "routeDelivery" && (
          <>
            <div className="flex justify-between gap-x-4 mt-5 flex-wrap">
              <div className="grow">
                <TimeInput
                  min={min}
                  max={max}
                  onChange={(time) => handleRangeChange([time, to])}
                  value={from}
                />
              </div>
              <div className="grow">
                <TimeInput
                  min={min}
                  max={max}
                  onChange={(time) => handleRangeChange([from, time])}
                  value={to}
                />
              </div>
            </div>
            <div className="py-5 px-1">
              <TimeRange
                markerEverySecond={TIME_MARKER_EVERY}
                maxSeconds={max}
                minSeconds={min}
                onChange={handleRangeChange}
                onChangeDebounce={SAVE_DEBOUNCE}
                value={[from, to]}
              />
            </div>
            <div className="mt-3 text-sm">
              <div className="flex gap-x-1  items-center">
                <NotebookText />
                <p>Notes</p>
              </div>
              <p className="mt-2">{notes}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}