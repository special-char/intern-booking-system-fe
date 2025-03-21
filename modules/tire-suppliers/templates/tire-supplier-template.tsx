'use client'

import { useState } from "react";
import TireSupplierConnectionKey from "../components/connection-key";
import TireSupplierOrderCutoff from "../components/order-cutoff";
import TireSupplierAutoPay from "../components/auto-pay";
import TireSupplierConnectionStatus from "../components/connection-status";
import TireSupplierReceiving from "../components/receiving";
import { TireSupplier } from "@/types/tire-supplier";

interface TireSupplierTemplateProps {
  supplier: TireSupplier
}

//TODO: get rid of mocks, data state, and handlers (since they will be handled as server actions)

export const TIME_MARKER_EVERY: number = 60 * 60 * 3

export function TireSupplierTemplate({ supplier }: TireSupplierTemplateProps) {
  const [data, setData] = useState<TireSupplier>(supplier);

  function handleOrderCutoffChange(orderCutoff: TireSupplier['orderCutoff']): void {
    setData((prev) => ({
      ...prev,
      orderCutoff
    }))
  }

  function handleAutoPayChange(autoPay: TireSupplier['autoPay']): void {
    setData((prev) => ({
      ...prev,
      autoPay
    }))
  }

  function handleReceivingChange(receiving: TireSupplier['receiving']): void {
    setData((prev) => ({
      ...prev,
      receiving
    }))
  }

  function handleReceivingRangeChange(range: [number, number]): void {
    setData((prev) => ({
      ...prev,
      receivingFrom: range[0],
      receivingTo: range[1]
    }))
  }

  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-8 lg:col-span-3 space-y-5">
        <TireSupplierConnectionKey
          connectionKey={data.connectionKey}
          //TODO: obtain it from user
          isRevealed={false}
        />
        <TireSupplierOrderCutoff
          data={{
            value: data.orderCutoff,
            min: data.orderCutoffMin,
            max: data.orderCutoffMax
          }}
          onChange={handleOrderCutoffChange}
        />
        <TireSupplierAutoPay
          autoPay={data.autoPay}
          onChange={handleAutoPayChange}
        />
      </div>
      <div className="col-span-8 lg:col-span-5 space-y-5">
        <TireSupplierConnectionStatus
          functionalities={data.functionalities}
          isLoading={false}
        />
        <TireSupplierReceiving
          data={{
            from: data.receivingFrom,
            min: data.receivingMin,
            max: data.receivingMax,
            notes: data.notes,
            to: data.receivingTo,
            receiving: data.receiving,
          }}
          onRangeChange={handleReceivingRangeChange}
          onReceivingChange={handleReceivingChange}
        />
      </div>
    </div>
  );
}