"use client";

import { UserIcon } from "lucide-react";
import { AddBankAccount } from "../components/add-bank-account";
import { Suspense, useState } from "react";
import { BankAccountTableTemplate } from "../components/bank-account-table/template";
import { dummyAccounts } from "../components/bank-account-table/index";

const bankLogos: Record<string, string> = {
  "HDFC Bank": "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg",
  "ICICI Bank": "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg",
  "SBI": "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg",
};
const defaultLogo = "https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png";

interface BankingTemplateProps {
  data: any[];
  venues?: { value: string; label: string }[];
}

export function BankingTemplate(props: BankingTemplateProps) {
  const { data, venues = [] } = props;
  const [accounts, setAccounts] = useState(data);

  const handleAddAccount = (newAccount: any) => {
    if (!newAccount.logo_url) {
      newAccount.logo_url = bankLogos[newAccount.bank_name] || defaultLogo;
    }
    setAccounts(prev => [...prev, newAccount]);
    dummyAccounts.push(newAccount);
  };

  const handleUpdateAccount = (updatedAccount: any) => {
    setAccounts(prev => prev.map(account => 
      account.id === updatedAccount.id ? updatedAccount : account
    ));
  };

  const handleDeleteAccount = (accountId: string | number) => {
    setAccounts(prev => prev.filter(account => account.id !== accountId));
  };

  return (
    <div className="py-4 md:py-8 px-2 md:px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6">
        <div className="flex items-center gap-2">
          <UserIcon size={24} />
          <p className="text-lg font-bold">Manage Bank Accounts</p>
        </div>
        <div className="flex gap-3 md:gap-5 mt-2 md:mt-0">
          <AddBankAccount venues={venues} onAddAccount={handleAddAccount} />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <BankAccountTableTemplate 
          data={accounts}
          venues={venues}
          onDeleteAccount={handleDeleteAccount}
          onUpdateAccount={handleUpdateAccount}
        />
      </Suspense>
    </div>
  );
}
