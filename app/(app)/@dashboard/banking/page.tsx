import { BankingTemplate } from "@/modules/banking/templates/banking-template";
import { dummyAccounts } from "@/modules/banking/components/bank-account-table/index";

export default function BankingPage() {
   return (
      <BankingTemplate
         data={dummyAccounts}
         venues={[
            { value: "Sky Arena", label: "Sky Arena" },
            { value: "Ocean View", label: "Ocean View" },
            { value: "Green Park", label: "Green Park" }
         ]}
      />
   );
}