import { Card } from "@/components/shadcn/card";
import Image from "next/image";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Pencil, Info, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BankAccountToggle } from "./bank-account-toggle";
import { useState } from "react";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { AddBankAccountForm } from "../add-bank-account-form";

interface BankAccountCardProps {
  account: {
    id: string | number;
    bank_name: string;
    logo_url?: string;
    account_holder: string;
    account_number: string;
    ifsc_code: string;
    venue: string;
    isEnabled: boolean;
  };
  isOnlyAccount: boolean;
  isEnabled: boolean;
  onToggle: (accountId: string | number, newStatus: boolean) => Promise<void>;
  venues: { value: string; label: string }[];
  onUpdateAccount: (account: any) => void;
  onDeleteAccount: (accountId: string | number) => void;
}

export function BankAccountCard({ 
  account, 
  isOnlyAccount, 
  isEnabled,
  onToggle, 
  venues,
  onUpdateAccount,
  onDeleteAccount
}: BankAccountCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Map account fields to form fields
  const mappedAccount = {
    accountHolderName: account.account_holder,
    bankName: account.bank_name,
    accountNumber: account.account_number,
    ifscCode: account.ifsc_code,
    venue: account.venue,
    id: account.id,
    logo_url: account.logo_url,
  };

  const handleUpdate = (updatedAccount: any) => {
    onUpdateAccount(updatedAccount);
    setIsEditOpen(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDeleteAccount(account.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-5">
        {/* Toggle in top-right */}
        <div className="absolute top-4 right-4 z-10">
          <BankAccountToggle
            accountId={account.id}
            isEnabled={isEnabled}
            isOnlyAccount={isOnlyAccount}
            onToggle={onToggle}
          />
        </div>
        <div className="flex items-start gap-4">
          {/* Left: Bank Logo/Icon */}
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
            {account.logo_url ? (
              <Image
                src={account.logo_url}
                alt={account.bank_name}
                width={56}
                height={56}
                className="object-contain p-2"
              />
            ) : (
              <span className="text-2xl">🏦</span>
            )}
          </div>

          {/* Center: Bank Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-base truncate">{account.account_holder}</h3>
            </div>

            <div className="mt-0.5 text-sm font-medium text-gray-600 dark:text-gray-300">
              {account.bank_name}
            </div>

            <div className="mt-2 space-y-0.5">
              <div className="flex items-center gap-2 text-sm font-mono text-gray-500 dark:text-gray-400">
                <span className="transition-opacity duration-200">
                  {showAccountNumber 
                    ? account.account_number 
                    : '*'.repeat(account.account_number.length - 4) + account.account_number.slice(-4)
                  }
                </span>
                <button
                  type="button"
                  aria-label={showAccountNumber ? 'Hide account number' : 'Show account number'}
                  onClick={() => setShowAccountNumber((v) => !v)}
                  className="ml-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Info className={`w-4 h-4 transition-colors duration-200 ${showAccountNumber ? 'text-blue-600' : 'text-blue-500'}`} />
                </button>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                IFSC: {account.ifsc_code}
              </div>
              {account.venue && (
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  Venue: {account.venue}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Right: Edit */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
            <SheetTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-md px-3 py-1 text-sm hover:bg-primary/20 hover:scale-105 transition-transform"
              >
                <Pencil className="w-3.5 h-3.5 mr-1.5" />
                Edit
              </Button>
            </SheetTrigger>
            <AddBankAccountForm
              account={mappedAccount}
              isEdit
              setIsOpen={setIsEditOpen}
              venues={venues}
              onUpdateAccount={handleUpdate}
            />
          </Sheet>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 