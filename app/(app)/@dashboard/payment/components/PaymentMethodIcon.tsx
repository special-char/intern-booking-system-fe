import { CreditCard, DollarSign, TrendingUp, FileText } from "lucide-react"

interface PaymentMethodIconProps {
   method: string
}

export function PaymentMethodIcon({ method }: PaymentMethodIconProps) {
   const iconMap = {
      card: CreditCard,
      netbanking: DollarSign,
      wallet: TrendingUp,
      upi: CreditCard,
      emi: CreditCard,
      order: FileText,
   }

   const Icon = iconMap[method as keyof typeof iconMap] || CreditCard
   return <Icon className="w-4.5 h-4.5 text-gray-500" />
}
