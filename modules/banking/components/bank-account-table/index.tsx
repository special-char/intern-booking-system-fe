"use client";

import { Card } from "@/components/shadcn/card";
import { TableProps } from "@/types/table";
import { BankAccountCard } from "./bank-account-card";

// Temporary dummy data for development/demo
let dummyAccounts = [
  {
    id: 1,
    bank_name: "HDFC Bank",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg", account_holder: "John Doe",
    account_number: "234566789",
    ifsc_code: "HDFC0001234",
    venue: "Sky Arena",
  },
  {
    id: 2,
    bank_name: "ICICI Bank",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg",
    account_holder: "Jane Smith",
    account_number: "1234564210",
    ifsc_code: "ICIC0005678",
    venue: "Ocean View",
  },
  {
    id: 3,
    bank_name: "SBI",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg",
    account_holder: "Alice Brown",
    account_number: "2345671234",
    ifsc_code: "SBIN0004321",
    venue: "Green Park",
  },
];

interface Venue {
  value: string;
  label: string;
}

interface BankAccount {
  id: string | number;
  bank_name: string;
  logo_url?: string;
  account_holder: string;
  account_number: string;
  ifsc_code: string;
  venue: string;
}

interface BankAccountTableProps {
  data: BankAccount[];
  venues: Venue[];
  onUpdateAccount: (account: BankAccount) => void;
  onDeleteAccount: (accountId: string | number) => void;
}

export function BankAccountTable({ data, venues, onUpdateAccount, onDeleteAccount }: BankAccountTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((account) => (
        <BankAccountCard
          key={account.id}
          account={account}
          venues={venues}
          onUpdateAccount={onUpdateAccount}
          onDeleteAccount={onDeleteAccount}
          isOnlyAccount={data.length === 1}
          onToggle={async () => {}}
        />
      ))}
    </div>
  );
}

export { dummyAccounts };
