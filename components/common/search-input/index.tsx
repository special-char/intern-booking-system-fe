import { Input } from "@/components/shadcn/input";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-placeholder"
        size={20}
      />
      <Input type="text" placeholder="Search" className="pl-10" />
    </div>
  );
}
