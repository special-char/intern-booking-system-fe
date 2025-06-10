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
} from "./add-bank-account-form.consts";
import { Trash2 } from "lucide-react";

// TODO: Replace with your actual type for a bank account
export type AddBankAccountFormType = z.infer<typeof addBankAccountFormSchema>;

export function AddBankAccountForm({
  account,
  isEdit,
  setIsOpen,
  venues = [], // Pass available venues as a prop
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
      ? addBankAccountFormInitialValues(account)
      : addBankAccountFormDefaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: AddBankAccountFormType) => {
    try {
      // Create a bank account object
      const bankAccount = {
        id: account?.id || Date.now(), // Use existing ID for updates
        bank_name: values.bankName,
        account_holder: values.accountHolderName,
        account_number: values.accountNumber,
        ifsc_code: values.ifscCode,
        venue: values.venue,
        logo_url: account?.logo_url || "",
      };

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
    if (!account?.id || !onDelete) return;

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
      await onDelete(account.id);
      toast({
        title: "Bank account deleted successfully",
      });
      setIsOpen(false);
    } catch (error) {
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
                    <Input placeholder="Enter bank name" {...field} />
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
                      value={field.value}
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
                    <Input placeholder="Enter IFSC code" {...field} />
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
                  <FormLabel>Venue</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a venue" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue.value} value={venue.value}>
                          {venue.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SheetFooter className="flex flex-col gap-2 px-4">
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
            <Button variant="secondary" type="button" className="w-full" onClick={() => setIsOpen(false)}>
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
