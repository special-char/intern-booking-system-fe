import { z } from "zod";

export const addBankAccountFormSchema = z.object({
  accountHolderName: z.string().min(1, "Account holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(6, "Account number is required"),
  ifscCode: z.string().min(6, "IFSC code is required"),
  venue: z.string().min(1, "Venue is required"),
});

export const addBankAccountFormDefaultValues = {
  accountHolderName: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  venue: "",
};

export const addBankAccountFormInitialValues = (account?: any) => {
  return {
    accountHolderName: account?.accountHolderName || "",
    bankName: account?.bankName || "",
    accountNumber: account?.accountNumber || "",
    ifscCode: account?.ifscCode || "",
    venue: account?.venue || "",
  };
}; 