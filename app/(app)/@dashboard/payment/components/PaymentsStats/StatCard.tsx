import { Card, CardContent } from "@/components/shadcn/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
   title: string
   value: string | number
   icon: LucideIcon
   iconColor: string
   description: string
}

export function StatCard({ title, value, icon: Icon, iconColor, description }: StatCardProps) {
   return (
      <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow">
         <CardContent className="p-6">
            <div className="flex flex-col">
               <div className="text-sm font-medium text-gray-500">{title}</div>
               <div className="mt-3 flex items-baseline">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">{value}</span>
               </div>
               <div className="mt-3 flex items-center text-sm font-medium" style={{ color: iconColor }}>
                  <Icon className="w-4 h-4 mr-1" />
                  <span>{description}</span>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
