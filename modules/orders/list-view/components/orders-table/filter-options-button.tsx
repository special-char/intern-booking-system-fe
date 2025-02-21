"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/shadcn/dropdown-menu";

import { Button } from "@/components/shadcn/button";
import { ListFilterIcon } from "lucide-react";
import { Table, ColumnFiltersState, FilterFn } from "@tanstack/react-table";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Order } from "./columns";

export const multiValueFilterFn: FilterFn<Order> = (
  row,
  columnId,
  filterValue
) => {
  if (!filterValue || filterValue.length === 0) {
    return true;
  }
  const rowValue = row.getValue(columnId);
  return filterValue.includes(rowValue);
};

interface FilterOptionsButtonProps<TData> {
  table: Table<TData>;
}

export function FilterOptionsButton<TData>({
  table,
}: FilterOptionsButtonProps<TData>) {
  const columnFilters = table.getState().columnFilters as ColumnFiltersState;

  const getFilterValue = React.useCallback(
    (id: string): string[] => {
      const filter = columnFilters.find((f) => f.id === id);
      return (filter?.value as string[]) || [];
    },
    [columnFilters]
  );

  const setFilterValue = React.useCallback(
    (id: string, newValue: string[]) => {
      table.setColumnFilters((old) => {
        const existingFilter = old?.find((f) => f.id === id);
        if (!existingFilter) {
          return [...(old || []), { id, value: newValue }];
        }
        return old.map((f) => {
          if (f.id === id) {
            return { ...f, value: newValue };
          }
          return f;
        });
      });
    },
    [table]
  );

  const handleCheckboxChange = React.useCallback(
    (columnId: string, option: string) => {
      const oldValues = getFilterValue(columnId);
      let newValues: string[] = [];

      if (oldValues.includes(option)) {
        newValues = oldValues.filter((val) => val !== option);
      } else {
        newValues = [...oldValues, option];
      }
      setFilterValue(columnId, newValues);
    },
    [getFilterValue, setFilterValue]
  );

  const handleParentToggle = React.useCallback(
    (columnId: string, options: string[], checked: boolean) => {
      if (checked) {
        setFilterValue(columnId, options);
      } else {
        setFilterValue(columnId, []);
      }
    },
    [setFilterValue]
  );

  const paymentOptions = [
    { label: "Paid", value: "Paid" },
    { label: "Not Paid", value: "Not Paid" },
  ];
  const orderStatusOptions = ["Delivered", "Pending", "Shipped", "Cancelled"];
  const qboStatusOptions = ["Synced", "Pending", "Failed"];

  const isPaymentChecked = getFilterValue("payment").length > 0;
  const isOrderStatusChecked = getFilterValue("orderStatus").length > 0;
  const isQboStatusChecked = getFilterValue("qboStatus").length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-8 w-8" size="icon">
          <ListFilterIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            onClick={() => {
              handleParentToggle(
                "payment",
                paymentOptions.map((o) => o.value),
                !isPaymentChecked
              );
            }}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                size="sm"
                checked={isPaymentChecked}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={(checked) =>
                  handleParentToggle(
                    "payment",
                    paymentOptions.map((o) => o.value),
                    checked === true
                  )
                }
              />
              <span>Payment</span>
            </div>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
            {paymentOptions.map((option) => {
              const currentValues = getFilterValue("payment");
              const checked = currentValues.includes(option.value);
              return (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={checked}
                  onCheckedChange={() =>
                    handleCheckboxChange("payment", option.value)
                  }
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            onClick={() => {
              handleParentToggle(
                "orderStatus",
                orderStatusOptions,
                !isOrderStatusChecked
              );
            }}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                size="sm"
                checked={isOrderStatusChecked}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={(checked) =>
                  handleParentToggle(
                    "orderStatus",
                    orderStatusOptions,
                    checked === true
                  )
                }
              />
              <span>Order Status</span>
            </div>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
            {orderStatusOptions.map((status) => {
              const currentValues = getFilterValue("orderStatus");
              const checked = currentValues.includes(status);
              return (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={checked}
                  onCheckedChange={() =>
                    handleCheckboxChange("orderStatus", status)
                  }
                >
                  {status}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            onClick={() => {
              handleParentToggle(
                "qboStatus",
                qboStatusOptions,
                !isQboStatusChecked
              );
            }}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                size="sm"
                checked={isQboStatusChecked}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={(checked) =>
                  handleParentToggle(
                    "qboStatus",
                    qboStatusOptions,
                    checked === true
                  )
                }
              />
              <span>QBO Status</span>
            </div>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
            {qboStatusOptions.map((status) => {
              const currentValues = getFilterValue("qboStatus");
              const checked = currentValues.includes(status);
              return (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={checked}
                  onCheckedChange={() =>
                    handleCheckboxChange("qboStatus", status)
                  }
                >
                  {status}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
