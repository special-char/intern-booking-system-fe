import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParams = (newParams: Record<string, string>) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const updatedParams = { ...currentParams, ...newParams };
    const queryString = new URLSearchParams(updatedParams).toString();
    router.push(`?${queryString}`);
  };

  return { updateQueryParams };
}
