import { useState } from "react";

interface UseExpandedReturnInterface {
  isExpanded: boolean
  onExpandedChange: (isExpanded: boolean) => void
}

export function useExpanded(): UseExpandedReturnInterface {
  const [isExpanded, setIsExpanded] = useState(false)

  return {
    isExpanded,
    onExpandedChange: (isExpanded: boolean) => setIsExpanded(isExpanded)
  }
}