"use client";

import { useState, useEffect } from "react";
import { X, SquarePen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import RevenueGoalForm from "./revenue-goal-form";
import { Tooltip } from "@/components/common/tooltip";

interface RevenueGoalCardProps {
  initialCurrent?: number;
  initialTarget?: number;
  tooltip?: string;
}

export default function RevenueGoalCard({
  initialCurrent = 27120.56,
  initialTarget = 48520.0,
  tooltip = "This is the revenue goal for all orders. It is the sum of all orders.",
}: RevenueGoalCardProps) {
  const [open, setOpen] = useState(false);
  const [current] = useState(initialCurrent);
  const [isLoaded, setIsLoaded] = useState(false);

  const percentage = Math.round((current / initialTarget) * 100);

  const progressValue = useMotionValue(0);
  const currentValue = useMotionValue(0);
  const targetValue = useMotionValue(0);

  const roundedPercentage = useTransform(
    progressValue,
    (latest) => `${Math.round(latest)}%`
  );
  const formattedCurrent = useTransform(currentValue, (latest) =>
    latest.toFixed(2)
  );
  const formattedTarget = useTransform(targetValue, (latest) =>
    latest.toFixed(2)
  );

  useEffect(() => {
    if (isLoaded) {
      animate(progressValue, percentage, { duration: 2 });
      animate(currentValue, current, { duration: 2 });
      animate(targetValue, initialTarget, { duration: 2 });
    }
  }, [
    isLoaded,
    percentage,
    current,
    initialTarget,
    progressValue,
    currentValue,
    targetValue,
  ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1">
              <h2 className="text-sm text-text-secondary font-medium">
                Revenue goal for all orders
              </h2>
              <Tooltip>
                <p>{tooltip}</p>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative w-[140px] h-[140px] my-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 -4 100 110">
                <circle
                  className="stroke-[16] fill-none text-[#D9F5E9]"
                  cx="50"
                  cy="50"
                  r="46"
                  pathLength="100"
                  stroke="currentColor"
                />

                {isLoaded && (
                  <motion.circle
                    className="stroke-[16] fill-none text-[#2AD590]"
                    cx="50"
                    cy="50"
                    r="46"
                    pathLength="100"
                    stroke="currentColor"
                    strokeDasharray="100"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 100 - percentage }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    strokeLinecap="round"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span className="text-2xl font-bold">
                  {roundedPercentage}
                </motion.span>
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-muted-foreground text-xs">
                You&apos;ve reached
              </p>
              <div className="flex items-center justify-between gap-1">
                <p className="text-muted-foreground text-sm font-semibold font-mono tabular-nums">
                  $<motion.span>{formattedCurrent}</motion.span> / $
                  <motion.span>{formattedTarget}</motion.span>
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(true)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <SquarePen className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs rounded-2xl">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="font-semibold">Set goal</DialogTitle>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors py-1 px-2"
            >
              <X className="w-4 h-4 text-icon-fg" />
            </Button>
          </DialogHeader>
          <RevenueGoalForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
