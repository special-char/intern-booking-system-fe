import { Input } from "@/components/shadcn/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
export default function SearchInput({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Input
        leftIcon={<Search size={16} className="text-text-placeholder" />}
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
