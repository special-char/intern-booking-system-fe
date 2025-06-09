import { Switch } from "@/components/shadcn/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BankAccountToggleProps {
  accountId: string | number;
  isEnabled: boolean;
  isOnlyAccount: boolean;
  onToggle: (accountId: string | number, newStatus: boolean) => Promise<void>;
}

export function BankAccountToggle({ accountId, isEnabled, isOnlyAccount, onToggle }: BankAccountToggleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleToggle = async () => {
    if (isOnlyAccount && isEnabled) {
      toast({
        title: "Cannot disable account",
        description: "This is the only account for this venue. At least one account must remain active.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await onToggle(accountId, !isEnabled);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update account status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Switch
      checked={isEnabled}
      onCheckedChange={handleToggle}
      disabled={isLoading || (isOnlyAccount && isEnabled)}
      className="data-[state=checked]:bg-indigo-600"
    />
  );
} 