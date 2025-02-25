import { Input } from "@/components/shadcn/input";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-sm">
      <Input
        leftIcon={<Search size={16} className="text-text-placeholder" />}
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
