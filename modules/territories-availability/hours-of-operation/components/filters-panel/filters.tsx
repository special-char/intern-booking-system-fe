import { CheckboxFilter } from "@/components/common/filters/checkbox-filter";
import { CheckboxFilterAccordion } from "@/components/common/filters/checkbox-filter-accordion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import { useBooleanUrlFilters } from "@/hooks/route-filters/use-boolean-route-filters";
import { useExpanded } from "@/hooks/use-expanded";
import { Territory } from "@/payload-types";
import { useEffect, useState } from "react";

export function Filters({ territories }: { territories: Territory[] }) {
  const { isInitialized, getIsChecked, onFiltersChange, onFiltersReset } = useBooleanUrlFilters()

  const [defaultExpandedCategories, setDefaultExpandedCategories] = useState<string[]>([])
  const { isExpanded: isExpandedLocations, onExpandedChange: onExpandedChangeLocations } = useExpanded()

  const shouldExpandLocations = territories.some(territory => getIsChecked([String(territory.id)]))

  useEffect(() => {
    if (isInitialized) {
      setDefaultExpandedCategories(getAccordionExpandedValues())
    }
  }, [isInitialized])

  useEffect(() => {
    onExpandedChangeLocations(shouldExpandLocations)
  }, [shouldExpandLocations])

  function getAccordionExpandedValues(): string[] {
    const hasSelectedTerritories = territories.some(territory => getIsChecked([String(territory.id)]))
    if (!hasSelectedTerritories) {
      return ["territories"]
    }
    return ["territories"]
  }

  if (!defaultExpandedCategories.length) {
    return <></>
  }

  return (
    <>
      <Card>
        <CardContent className="py-3">
          <div className="text-sm font-semibold mb-2 text-gray-500">Filters</div>
          <Accordion defaultValue={defaultExpandedCategories} type="multiple">
            <AccordionItem value="territories" variant="filter">
              <AccordionTrigger variant="filter">
                Territories
              </AccordionTrigger>
              <AccordionContent variant="filter">
                {territories.map((territory) => (
                  <CheckboxFilter
                    key={territory.id}
                    checked={getIsChecked([String(territory.id)])}
                    id={String(territory.id)}
                    label={territory.name ? territory.name.charAt(0).toUpperCase() + territory.name.slice(1) : `Territory ${territory.id}`}
                    onCheckedChange={(value) => onFiltersChange([{ [String(territory.id)]: value }])}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {onFiltersReset && (
        <Button className="mt-2" onClick={onFiltersReset}>
          Reset filters
        </Button>
      )}</>
  );
}