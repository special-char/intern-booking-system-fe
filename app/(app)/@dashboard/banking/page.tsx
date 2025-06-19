"use client"
import { BankingTemplate } from "@/modules/banking/templates/banking-template";
import { getUser } from '@/lib/data/admin';
import { getPayloadAuthHeaders } from '@/lib/data/cookies';
import { Tenant } from '@/payload-types';
import { useEffect, useState } from "react";

export default function BankingPage() {
   const [venues, setVenues] = useState([]);
   const [accounts, setAccounts] = useState([]);
   
   useEffect(() => {
    async function getVans() {
      try {
        const { user } = await getUser();
        const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
        const authHeaders = await getPayloadAuthHeaders();

        if (!tenantId) {
          console.warn("No tenant ID found.");
          return;
        }

        const response = await fetch(
          `http://tech.localhost:3000/api/venues?tenant=${tenantId}`,
          {
            method: "GET",
            headers: {
              ...authHeaders,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch venues: ${response.statusText}`);
        }

        const data = await response.json();

        const formattedVans = data.docs.map((venue: any) => ({
          id: venue.id.toString(),
          name: venue.name,
        }));
        console.log(formattedVans);
        setVenues(formattedVans);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    }

    getVans();
  }, []);

  useEffect(() => {
    async function getAccounts() {
      try {
        const { user } = await getUser();
        const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
        const authHeaders = await getPayloadAuthHeaders();

        if (!tenantId) {
          console.warn("No tenant ID found.");
          return;
        }

        const response = await fetch(
          `http://tech.localhost:3000/api/banking?tenant=${tenantId}`,
          {
            method: "GET",
            headers: {
              ...authHeaders,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch accounts: ${response.statusText}`);
        }

        const data = await response.json();

        const formattedAccounts = data.docs.map((account: any) => ({
          id: account.id.toString(),
          account_holder: account.accountHolderName,
          bank_name: account.bankName,
          account_number: account.accountNumber,
          ifsc_code: account.ifscCode,
          isActive: account.isActive,
          venue: account.venues && account.venues.length > 0 
            ? account.venues.map((v: any) => {
                return typeof v === 'object' ? v.name || v.id : v;
              }).join(", ")
            : "",
        }));
        console.log('Formatted accounts:', formattedAccounts);
        setAccounts(formattedAccounts);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    }

    getAccounts();
  }, []);

   return (
      <BankingTemplate
         data={accounts}
         venues={venues}
      />
   );
}