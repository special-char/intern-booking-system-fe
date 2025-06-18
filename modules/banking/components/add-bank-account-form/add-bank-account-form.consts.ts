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
  venue: z.array(z.string()).min(1, "Please select at least one venue"),
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
  venue: [],
};

export const addBankAccountFormInitialValues = (account?: any, venues?: { value: string; label: string }[]): AddBankAccountFormType => {
  // Handle multiple venues for edit mode
  let venueValues: string[] = [];

  if (account?.venues && venues) {
    // If account has venues array (from API response)
    if (Array.isArray(account.venues)) {
      venueValues = account.venues.map((v: any) => {
        // Handle both object and primitive venue formats
        const venueId = typeof v === 'object' ? v.id : v;
        return venueId.toString();
      });
    }
  } else if (account?.venue && venues) {
    // Handle single venue from formatted display data
    if (typeof account.venue === 'string') {
      // If venue is a comma-separated string of names, split and find IDs
      const venueNames = account.venue.split(", ");
      venueValues = venueNames.map((name: string) => {
        const venueObj = venues.find(v => v.label === name.trim());
        return venueObj ? venueObj.value : '';
      }).filter(Boolean);
    } else {
      // Single venue ID
      venueValues = [account.venue.toString()];
    }
  }

  return {
    accountHolderName: account?.account_holder || account?.accountHolderName || "",
    bankName: account?.bank_name || account?.bankName || "",
    accountNumber: account?.account_number || account?.accountNumber || "",
    confirmAccountNumber: account?.account_number || account?.accountNumber || "",
    ifscCode: account?.ifsc_code || account?.ifscCode || "",
    venue: venueValues,
  };
};