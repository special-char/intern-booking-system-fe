"use client";

import { Input } from "@/components/shadcn/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchInput({
  className,
  defaultValue
}: {
  className?: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(defaultValue || '');

  // Use the debounced value
  const debouncedValue = useDebounce(searchValue, 300);

  // Handle the debounced value change
  const handleSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    // Reset to first page when searching
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  // Effect to handle the debounced value
  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue, handleSearch]);

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Input
        leftIcon={<Search size={16} className="text-text-placeholder" />}
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
