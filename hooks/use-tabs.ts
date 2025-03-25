import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface UseTabsInterface {
  initValue?: string
  path?: string
  value?: string
}

interface UseTabsReturnInterface {
  activeTab: string
  onTabChange: (value: string) => void
}

export function useTabs({ initValue, path, value }: UseTabsInterface): UseTabsReturnInterface {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState((value ?? initValue) as string)

  useEffect(() => {
    if (initValue && !value) {
      return handleTabChange(initValue, "replace")
    }
    setActiveTab(value as string)
  }, [value])

  function handleTabChange(value: string, type: "replace" | "push"): void {
    setActiveTab(value)
    router[type](path ? `${path}/${value}` : value)
  }

  function onTabChange(value: string): void {
    handleTabChange(value, "push")
  }

  return {
    activeTab,
    onTabChange
  }
}