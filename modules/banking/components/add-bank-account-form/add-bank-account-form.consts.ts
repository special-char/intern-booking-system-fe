import { z } from "zod";

export const commonBanks = [
  "HDFC Bank",
  "ICICI Bank",
  "State Bank of India",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Yes Bank",
  "IDFC First Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
  "Central Bank of India",
  "Indian Bank",
  "UCO Bank",
] as const;

export const addBankAccountFormSchema = z.object({
  accountHolderName: z.string().min(1, "Account holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z
    .string()
    .min(6, "Account number is required")
    .regex(/^\d+$/, "Account number must contain only digits"),
  confirmAccountNumber: z
    .string()
    .min(6, "Confirm account number is required")
    .regex(/^\d+$/, "Account number must contain only digits"),
  ifscCode: z
    .string()
    .min(1, "IFSC code is required")
    .length(11, "IFSC code must be exactly 11 characters")
    .regex(
      /^[A-Z]{4}0[A-Z0-9]{6}$/,
      "IFSC code must start with 4 uppercase letters, followed by 0, and end with 6 alphanumeric characters"
    ),
  venue: z.string().min(1, "Venue is required"),
}).refine((data) => data.accountNumber === data.confirmAccountNumber, {
  message: "Account numbers do not match",
  path: ["confirmAccountNumber"],
});

export type AddBankAccountFormType = z.infer<typeof addBankAccountFormSchema>;

export const addBankAccountFormDefaultValues: AddBankAccountFormType = {
  accountHolderName: "",
  bankName: "",
  accountNumber: "",
  confirmAccountNumber: "",
  ifscCode: "",
  venue: "",
};

export const addBankAccountFormInitialValues = (account?: any): AddBankAccountFormType => {
  return {
    accountHolderName: account?.accountHolderName || "",
    bankName: account?.bankName || "",
    accountNumber: account?.accountNumber || "",
    confirmAccountNumber: account?.accountNumber || "",
    ifscCode: account?.ifscCode || "",
    venue: account?.venue || "",
  };
}; 