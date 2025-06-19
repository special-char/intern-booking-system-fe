import { Card } from "@/components/shadcn/card";
import Image from "next/image";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Pencil, Info, TrashIcon } from "lucide-react";
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
  totalAccounts: number;
}

export function BankAccountCard({ 
  account, 
  isOnlyAccount, 
  isEnabled,
  onToggle, 
  venues,
  onUpdateAccount,
  onDeleteAccount,
  totalAccounts
}: BankAccountCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const mappedAccount = {
    accountHolderName: account.account_holder,
    bankName: account.bank_name,
    accountNumber: account.account_number,
    ifscCode: account.ifsc_code,
    venue: account.venue,
    id: account.id,
    logo_url: account.logo_url,
    isActive: account.isEnabled,
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

  const venueLabel = (() => {
    if (account.venue && account.venue.includes(',')) return account.venue;
    const foundVenue = venues.find(v => v.value === account.venue);
    return foundVenue?.label || account.venue || 'No venue assigned';
  })();

  const canDelete = totalAccounts > 1 || (totalAccounts === 1 && !isEnabled);

  return (
    <Card className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="p-5 pb-4 flex-1 flex flex-col justify-between">
        {/* Toggle/Badge */}
        <div className="flex justify-end mb-2">
          {totalAccounts > 1 && (
            <BankAccountToggle
              accountId={account.id}
              isEnabled={isEnabled}
              isOnlyAccount={isOnlyAccount}
              onToggle={onToggle}
            />
          )}
          {totalAccounts === 1 && isEnabled && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              Active
            </Badge>
          )}
        </div>

        {/* Main Content */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
            {account.logo_url ? (
              <Image
                src={account.logo_url}
                alt={account.bank_name}
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-2xl">🏦</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate">{account.account_holder}</h3>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {account.bank_name}
            </div>

            <div className="mt-2 space-y-0.5">
              <div className="flex items-center gap-2 text-sm font-mono text-gray-500 dark:text-gray-400">
                <span>
                  {showAccountNumber 
                    ? account.account_number 
                    : '*'.repeat(account.account_number.length - 4) + account.account_number.slice(-4)}
                </span>
                <button
                  type="button"
                  aria-label={showAccountNumber ? 'Hide account number' : 'Show account number'}
                  onClick={() => setShowAccountNumber((v) => !v)}
                  className="ml-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Info className={`w-4 h-4 ${showAccountNumber ? 'text-blue-600' : 'text-blue-500'}`} />
                </button>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                IFSC: {account.ifsc_code}
              </div>
              {account.venue && (
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  Venue: {venueLabel}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Delete Buttons */}
      <div className="px-5 pb-5 flex justify-end items-center gap-2">
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
            isOnlyAccount={!canDelete}
          />
        </Sheet>

        {canDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
