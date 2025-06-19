"use client";

import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { AddBankAccountForm } from "../add-bank-account-form";
import { useState } from "react";

export function AddBankAccount({
  venues = [],
  onAddAccount,
  onUpdateAccount
}: {
  venues?: { value: string; label: string }[];
  onAddAccount?: (account: any) => void;
  onUpdateAccount?: (account: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Add Bank Account
        </Button>
      </SheetTrigger>
      <AddBankAccountForm
        setIsOpen={setIsOpen}
        venues={venues}
        onAddAccount={onAddAccount}
        onUpdateAccount={onUpdateAccount}
        isEdit={false}
      />
    </Sheet>
  );
}
