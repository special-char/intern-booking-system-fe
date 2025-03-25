import { usePathname } from "next/navigation";

interface UseNestedPathnameInterface {
  nestingLevel?: number
}

interface UseNestedPathnameReturnInterface {
  path: string
}

export function useNestedPathname({ nestingLevel = 2 }: UseNestedPathnameInterface): UseNestedPathnameReturnInterface {
  const pathname: string = usePathname();
  const segments: string[] = pathname.split("/");

  return {
    path: segments[nestingLevel]
  }
}