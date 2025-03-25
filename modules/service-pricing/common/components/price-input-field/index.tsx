import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import {
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/shadcn/form";
import { useFormContext } from "react-hook-form";
import { getObjectValueByPath } from "@/utils/get-object-value-by-path";
import { PriceInput } from "@/components/common/price-input";

type PriceInputFieldProps = {
  name: string;
};

const PriceInputField = ({ name }: PriceInputFieldProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const defaultPrice = getObjectValueByPath<number>(form.formState.defaultValues ?? {}, field.name) || 0;
        const currentPrice = Number(field.value) || 0;
        const isPriceUp = field.value > defaultPrice;
        const isPriceDown = field.value < defaultPrice;
        const isPriceChanged = isPriceUp || isPriceDown;

        const profitPercentage =
          defaultPrice !== 0
            ? Math.round(((currentPrice - defaultPrice) / defaultPrice) * 100)
            : 0;
        const profitMargin =
          currentPrice !== 0
            ? Math.round(((currentPrice - defaultPrice) / currentPrice) * 100)
            : 0;

        const showProfitPercentage =
          field.value != 0 &&
          profitPercentage < 1000 &&
          profitPercentage > -1000 &&
          isPriceChanged;

        return (
          <FormItem>
            <FormControl>
              <motion.div className="flex flex-col gap-2 relative">
                <PriceInput
                  {...field}
                  wrapperClassName="z-10"
                  leftIcon={
                    isPriceUp ? (
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    ) : isPriceDown ? (
                      <ArrowDown className="w-4 h-4 text-red-600" />
                    ) : null
                  }
                  rightIcon={
                    showProfitPercentage && (
                      <span className="text-xs px-1.5 py-0.5 text-green-600 font-medium bg-green-100 rounded-full">
                        {profitPercentage}%
                      </span>
                    )
                  }
                  className={cn(
                    "text-right font-medium",
                    showProfitPercentage && "border-brand-primary-300 pr-15"
                  )}
                  placeholder="Price"
                />
                <AnimatePresence>
                  {isPriceChanged && field.value && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -25 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-500 border -mt-4.5 border-brand-primary-300 rounded-lg flex items-center justify-between"
                    >
                      <Button
                        variant="outline"
                        className="bg-brand-primary-100 hover:bg-brand-100 shadow-none pt-1"
                        size="icon"
                        type="button"
                        onClick={() => {
                          form.resetField(field.name);
                        }}
                      >
                        <Undo2 className="w-4 h-4 text-icon-fg-brand" />
                      </Button>
                      <div className="flex items-center gap-1 mt-2 pr-2">
                        <span className="text-sm font-medium">
                          ${defaultPrice}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 text-text-secondary font-medium bg-gray-200 rounded-full">
                          {profitMargin}%
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default PriceInputField;
