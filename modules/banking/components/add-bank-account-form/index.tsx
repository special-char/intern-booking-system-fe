"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/form";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/shadcn/sheet";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/shadcn/select";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  addBankAccountFormSchema,
  addBankAccountFormDefaultValues,
  addBankAccountFormInitialValues,
  commonBanks,
} from "./add-bank-account-form.consts";
import { Trash2 } from "lucide-react";
import MultipleSelector, { Option } from "@/components/shadcn/multiselect";

// TODO: Replace with your actual type for a bank account
export type AddBankAccountFormType = z.infer<typeof addBankAccountFormSchema>;

export function AddBankAccountForm({
  account,
  isEdit,
  setIsOpen,
  venues = [],
  onDelete,
  isOnlyAccount,
  onAddAccount,
  onUpdateAccount,
}: {
  account?: any;
  isEdit?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  venues?: { value: string; label: string }[];
  onDelete?: (accountId: string | number) => Promise<void>;
  isOnlyAccount?: boolean;
  onAddAccount?: (account: any) => void;
  onUpdateAccount?: (account: any) => void;
}) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const form = useForm<AddBankAccountFormType>({
    resolver: zodResolver(addBankAccountFormSchema),
    defaultValues: account
      ? addBankAccountFormInitialValues(account, venues)
      : addBankAccountFormDefaultValues,
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: AddBankAccountFormType) => {
    try {
      // Create a bank account object
      const bankAccount = {
        bankName: values.bankName,
        accountHolderName: values.accountHolderName,
        accountNumber: values.accountNumber,
        ifscCode: values.ifscCode,
        venue: values.venue, // This is now an array of venue IDs
        logo_url: account?.logo_url || "",
        // IMPORTANT: Include the ID when editing
        ...(isEdit && account?.id && { id: account.id }),
        // Also include isActive status for updates
        ...(isEdit && { isActive: account?.isActive !== false }),
      };

      console.log('Submitting bank account:', bankAccount);

      if (isEdit && onUpdateAccount) {
        onUpdateAccount(bankAccount);
      } else if (onAddAccount) {
        onAddAccount(bankAccount);
      }

      setIsSuccess(true);
      toast({
        title: isEdit ? "Bank account updated successfully" : "Bank account created successfully",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save bank account",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!account?.id || !onDelete) {
      console.error('Missing account ID or delete handler:', { accountId: account?.id, hasDeleteHandler: !!onDelete });
      return;
    }

    if (isOnlyAccount) {
      toast({
        title: "Cannot delete account",
        description: "This is the only account for this venue. At least one account must remain.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDeleting(true);
      console.log('Attempting to delete account with ID:', account.id);

      await onDelete(account.id);

      toast({
        title: "Bank account deleted successfully",
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Delete operation failed:', error);
      toast({
        title: "Error",
        description: "Failed to delete bank account",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setIsSuccess(false);
      setIsOpen(false);
    }
  }, [form, isSuccess, setIsOpen]);

  return (
    <SheetContent className="sm:max-w-[500px]">
      <SheetHeader>
        <SheetTitle>{isEdit ? "Edit Bank Account" : "Add Bank Account"}</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-4 h-full"
        >
          <div className="px-4 flex flex-col gap-3 h-full">
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter bank name"
                        {...field}
                        list="bank-list"
                        className="pr-8"
                        autoComplete="off"
                        onFocus={(e) => {
                          // Only show suggestions if there's input
                          if (!e.target.value) {
                            e.target.setAttribute('list', '');
                          } else {
                            e.target.setAttribute('list', 'bank-list');
                          }
                        }}
                        onChange={(e) => {
                          field.onChange(e);
                          // Show/hide datalist based on input
                          if (e.target.value) {
                            e.target.setAttribute('list', 'bank-list');
                          } else {
                            e.target.setAttribute('list', '');
                          }
                        }}
                      />
                      <datalist
                        id="bank-list"
                        className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1"
                      >
                        {commonBanks.map((bank) => (
                          <option key={bank} value={bank} />
                        ))}
                      </datalist>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter account number"
                      {...field}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Account Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-enter account number"
                      {...field}
                      type="password"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ifscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter IFSC code"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        // Convert to uppercase immediately as user types
                        const value = e.target.value.toUpperCase();
                        field.onChange(value);
                      }}
                      maxLength={11}
                      onKeyPress={(e) => {
                        // Allow only letters and numbers
                        const char = String.fromCharCode(e.which);
                        if (!/[A-Za-z0-9]/.test(char)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venues</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      defaultOptions={venues}
                      placeholder="Select venues"
                      emptyIndicator={<p className="text-center text-sm">No results found</p>}
                      value={venues.filter((opt) => field.value?.includes(opt.value))}
                      onChange={(selected) => {
                        field.onChange(selected.map((opt) => opt.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <SheetFooter className="flex flex-row gap-2 px-4">
            {isEdit && onDelete && (
              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={handleDelete}
                disabled={isDeleting || isOnlyAccount}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            )}
            <Button variant="outline" type="button" className="w-full" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update" : "Save"}
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
