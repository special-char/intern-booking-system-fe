import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import { Button } from "@/components/shadcn/button";
import { Loader2Icon, Undo2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Tooltip } from "@/components/common/tooltip";
import TerritoryToggle from "../territory-toggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn/alert-dialog";
import { useState } from "react";
import { useTerritory } from "@/contexts/territory-context";

interface PricingCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isLoading?: boolean;
  stateEnvironment?: boolean;
  onConfirmApplyToAll?: () => Promise<void>;
}

export default function PricingCard({
  children,
  title,
  description,
  isLoading,
  stateEnvironment,
  onConfirmApplyToAll,
}: PricingCardProps) {
  const { reset } = useFormContext();
  const { applyToAllTerritories } = useTerritory();
  const [alertOpen, setAlertOpen] = useState(false);
  const [isAlertSubmitting, setIsAlertSubmitting] = useState(false);

  const handleSaveClick = (event: React.MouseEvent) => {
    if (applyToAllTerritories && onConfirmApplyToAll) {
      event.preventDefault();
      setAlertOpen(true);
    }
  };

  const handleConfirm = async () => {
    if (onConfirmApplyToAll) {
      setIsAlertSubmitting(true);
      try {
        await onConfirmApplyToAll();
      } catch (error) {
        // Error handling is done in the parent component
      } finally {
        setIsAlertSubmitting(false);
        setAlertOpen(false);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-text-primary font-semibold">
            {title}
            <Tooltip>
              <p>{description}</p>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="px-2 py-3 bg-bg-secondary rounded-lg">{children}</div>
        </CardContent>
        <CardFooter className="flex items-center justify-between pb-5 px-5">
          <Button
            onClick={() => reset()}
            variant="ghost"
            type="reset"
            className="px-0 hover:bg-transparent"
          >
            <Undo2Icon className="w-4 h-4" />
            Reset all changes
          </Button>
          <div className="flex items-center gap-5">
            {!stateEnvironment && <TerritoryToggle />}
            <Button
              type="submit"
              disabled={isLoading && !applyToAllTerritories}
              onClick={handleSaveClick}
            >
              {isLoading && !applyToAllTerritories ? (
                <Loader2Icon className="w-4 h-4" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apply changes to all territories?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will apply your setting to ALL territories so you don&apos;t
              have to manually repeat the process. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isAlertSubmitting}
            >
              {isAlertSubmitting ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
