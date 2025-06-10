import { BankAccountTable } from ".";
import { useMemo } from "react";

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

interface BankAccountTableTemplateProps {
  data: BankAccount[];
  venues: Venue[];
  onUpdateAccount: (account: BankAccount) => void;
  onDeleteAccount: (accountId: string | number) => void;
}

export function BankAccountTableTemplate(props: BankAccountTableTemplateProps) {
  const { data, venues, onUpdateAccount, onDeleteAccount } = props;

  return (
    <div className="mt-8">
      <BankAccountTable 
        data={data} 
        venues={venues}
        onUpdateAccount={onUpdateAccount}
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  );
}
