"use client";

import { BankAccountCard } from "./bank-account-card";

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
  isEnabled: boolean;
}

interface BankAccountTableProps {
  data: BankAccount[];
  venues: Venue[];
  onUpdateAccount: (account: BankAccount) => void;
  onDeleteAccount: (accountId: string | number) => void;
  onToggleAccount: (accountId: string | number, newStatus: boolean) => void;
}

export function BankAccountTable({ data, venues, onUpdateAccount, onDeleteAccount, onToggleAccount }: BankAccountTableProps) {
  const enabledAccountsCount = data.filter(acc => acc.isEnabled).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((account) => (
        <BankAccountCard
          key={account.id}
          account={account}
          venues={venues}
          onUpdateAccount={onUpdateAccount}
          onDeleteAccount={onDeleteAccount}
          isOnlyAccount={enabledAccountsCount === 1 && account.isEnabled}
          isEnabled={account.isEnabled}
          onToggle={async (id, status) => { onToggleAccount(id, status); }}
          totalAccounts={data.length}
        />
      ))}
    </div>
  );
}