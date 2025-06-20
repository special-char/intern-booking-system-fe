"use client";

import { UserIcon } from "lucide-react";
import { AddBankAccount } from "../components/add-bank-account";
import { Suspense, useState, useEffect } from "react";
import { BankAccountTableTemplate } from "../components/bank-account-table/template";
import { getUser } from '@/lib/data/admin';
import { getPayloadAuthHeaders } from '@/lib/data/cookies';
import { Tenant } from '@/payload-types';

// Constants
const LOGO_DEV_TOKEN = "pk_XUd4xSHITCi_6XHXU8rchw";
const DEFAULT_LOGO = "https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png";

// Utils
const formatBankName = (name: string): string => {
    return name.trim().toLowerCase().endsWith("bank") ? name.trim() : `${name.trim()} Bank`;
};

const toDomain = (bankName: string): string => {
    return bankName.replace(/\s+/g, "").toLowerCase() + ".com";
};

const getBankLogoUrl = (bankName: string): string => {
    const formattedName = formatBankName(bankName);
    const domain = toDomain(formattedName);
    return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}`;
};

interface BankingTemplateProps {
    data: any[];
    venues?: { id: string; name: string }[];
}

export function BankingTemplate(props: BankingTemplateProps) {
    const { data, venues = [] } = props;
    const [accounts, setAccounts] = useState<any[]>([]);
    const [formattedVenues, setFormattedVenues] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        if (venues.length > 0) {
            const updatedVenues = venues.map((venue) => ({
                value: venue.id.toString(),
                label: venue.name,
            }));
            setFormattedVenues(updatedVenues);
        }
    }, [venues]);

    useEffect(() => {
        if (data.length > 0) {
            const initializedAccounts = data.map(acc => {
                const formattedBankName = formatBankName(acc.bank_name);
                return {
                    ...acc,
                    isEnabled: acc.isActive !== false,
                    bank_name: formattedBankName,
                    logo_url: getBankLogoUrl(formattedBankName),
                };
            });
            setAccounts(initializedAccounts);
        }
    }, [data]);

    const handleAddAccount = async (newAccount: any) => {
        try {
            const { user } = await getUser();
            const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
            const authHeaders = await getPayloadAuthHeaders();

            if (!tenantId) throw new Error("Missing tenant ID");

            const venueIds = newAccount.venue.map((venueId: string) => parseInt(venueId, 10));
            const hasActiveAccounts = accounts.some(acc => acc.isEnabled);
            const shouldBeActive = !hasActiveAccounts;

            const formattedBankName = formatBankName(newAccount.bankName);

            const response = await fetch(`http://tech.localhost:3000/api/banking`, {
                method: "POST",
                headers: {
                    ...authHeaders,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accountHolderName: newAccount.accountHolderName,
                    bankName: formattedBankName,
                    accountNumber: newAccount.accountNumber,
                    ifscCode: newAccount.ifscCode,
                    tenant: tenantId,
                    venues: venueIds,
                    isActive: shouldBeActive,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server response:", errorText);
                throw new Error("Failed to create account");
            }

            const created = await response.json();
            const accountDoc = created.doc;

            const logo_url = getBankLogoUrl(accountDoc.bankName);

            const venueLabels = newAccount.venue.map((venueId: string) => {
                const venue = venues.find(v => v.id === venueId);
                return venue?.name || "";
            }).filter(Boolean).join(", ");

            const formattedAccount = {
                id: accountDoc.id.toString(),
                account_holder: accountDoc.accountHolderName,
                bank_name: accountDoc.bankName,
                account_number: accountDoc.accountNumber,
                ifsc_code: accountDoc.ifscCode,
                isActive: accountDoc.isActive,
                logo_url,
                isEnabled: accountDoc.isActive,
                venue: venueLabels,
            };

            setAccounts(prev => [...prev, formattedAccount]);
        } catch (err) {
            console.error("Error adding bank account:", err);
        }
    };

    const handleUpdateAccount = async (updatedAccount: any) => {
        try {
            if (!updatedAccount.id) throw new Error('Account ID is required for update');

            const authHeaders = await getPayloadAuthHeaders();
            let venueIds: number[] = [];

            if (Array.isArray(updatedAccount.venue)) {
                venueIds = updatedAccount.venue.map((venueId: string) => parseInt(venueId, 10));
            } else if (typeof updatedAccount.venue === 'string') {
                venueIds = [parseInt(updatedAccount.venue, 10)];
            }

            const formattedBankName = formatBankName(updatedAccount.bankName || updatedAccount.bank_name);

            const payload = {
                accountHolderName: updatedAccount.accountHolderName || updatedAccount.account_holder,
                bankName: formattedBankName,
                accountNumber: updatedAccount.accountNumber || updatedAccount.account_number,
                ifscCode: updatedAccount.ifscCode || updatedAccount.ifsc_code,
                isActive: updatedAccount.isActive,
                venues: venueIds,
            };

            const response = await fetch(`http://tech.localhost:3000/api/banking/${updatedAccount.id}`, {
                method: "PATCH",
                headers: {
                    ...authHeaders,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to update account");

            const updated = await response.json();
            const updatedDoc = updated.doc;

            const logo_url = getBankLogoUrl(updatedDoc.bankName);

            const venueLabels = venueIds.map(venueId => {
                const venue = venues.find(v => v.id === venueId.toString());
                return venue?.name || "";
            }).filter(Boolean).join(", ");

            const formattedAccount = {
                id: updatedDoc.id.toString(),
                account_holder: updatedDoc.accountHolderName,
                bank_name: updatedDoc.bankName,
                account_number: updatedDoc.accountNumber,
                ifsc_code: updatedDoc.ifscCode,
                isActive: updatedDoc.isActive,
                logo_url,
                isEnabled: updatedDoc.isActive !== false,
                venue: venueLabels,
            };

            setAccounts(prev =>
                prev.map(acc => (acc.id === updatedDoc.id.toString() ? formattedAccount : acc))
            );

        } catch (err) {
            console.error("Error updating bank account:", err);
        }
    };

    const handleToggleAccount = async (accountId: string | number, newStatus: boolean) => {
        try {
            const authHeaders = await getPayloadAuthHeaders();

            if (newStatus) {
                const otherActiveAccounts = accounts.filter(acc => acc.id !== accountId && acc.isEnabled);

                for (const account of otherActiveAccounts) {
                    await fetch(`http://tech.localhost:3000/api/banking/${account.id}`, {
                        method: "PATCH",
                        headers: {
                            ...authHeaders,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ isActive: false }),
                    });
                }
            }

            await fetch(`http://tech.localhost:3000/api/banking/${accountId}`, {
                method: "PATCH",
                headers: {
                    ...authHeaders,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: newStatus }),
            });

            setAccounts(prev =>
                prev.map(acc => {
                    if (acc.id === accountId) {
                        return { ...acc, isEnabled: newStatus, isActive: newStatus };
                    } else if (newStatus) {
                        return { ...acc, isEnabled: false, isActive: false };
                    }
                    return acc;
                })
            );

        } catch (err) {
            console.error("Error toggling account:", err);
        }
    };

    const handleDeleteAccount = async (accountId: string | number) => {
        try {
            if (!accountId) throw new Error('Account ID is required for delete');

            const authHeaders = await getPayloadAuthHeaders();

            const response = await fetch(`http://tech.localhost:3000/api/banking/${accountId}`, {
                method: "DELETE",
                headers: {
                    ...authHeaders,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to delete account");

            setAccounts(prev => {
                const remaining = prev.filter(account => account.id !== accountId.toString());
                const deletedAccount = prev.find(account => account.id === accountId.toString());

                if (deletedAccount?.isEnabled && remaining.length > 0) {
                    const hasActive = remaining.some(acc => acc.isEnabled);
                    if (!hasActive) {
                        remaining[0].isEnabled = true;
                        remaining[0].isActive = true;

                        fetch(`http://tech.localhost:3000/api/banking/${remaining[0].id}`, {
                            method: "PATCH",
                            headers: {
                                ...authHeaders,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ isActive: true }),
                        });
                    }
                }

                return remaining;
            });

        } catch (err) {
            console.error("Error deleting bank account:", err);
        }
    };

    return (
        <div className="py-4 md:py-8 px-2 md:px-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6">
                <div className="flex items-center gap-2">
                    <UserIcon size={24} />
                    <p className="text-lg font-bold">Manage Bank Accounts</p>
                </div>
                <div className="flex gap-3 md:gap-5 mt-2 md:mt-0">
                    <AddBankAccount venues={formattedVenues} onAddAccount={handleAddAccount} />
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <BankAccountTableTemplate
                    data={accounts}
                    venues={formattedVenues}
                    onDeleteAccount={handleDeleteAccount}
                    onUpdateAccount={handleUpdateAccount}
                    onToggleAccount={handleToggleAccount}
                />
            </Suspense>
        </div>
    );
}
