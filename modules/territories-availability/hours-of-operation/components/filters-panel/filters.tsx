import { CheckboxFilter } from "@/components/common/filters/checkbox-filter";
import { CheckboxFilterAccordion } from "@/components/common/filters/checkbox-filter-accordion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import { useBooleanUrlFilters } from "@/hooks/route-filters/use-boolean-route-filters";
import { useExpanded } from "@/hooks/use-expanded";
import { useEffect, useState } from "react";


export function Filters() {
  const { isInitialized, getIsChecked, onFiltersChange, onFiltersReset } = useBooleanUrlFilters()

  const [defaultExpandedCategories, setDefaultExpandedCategories] = useState<string[]>([])
  const { isExpanded: isExpandedLocations, onExpandedChange: onExpandedChangeLocations } = useExpanded()
  const { isExpanded: isExpandedSkills, onExpandedChange: onExpandedChangeSkills } = useExpanded()

  const shouldExpandLocations = getIsChecked(["label"]) || getIsChecked(["southwest"]) || getIsChecked(["northeast"])
  const shouldExpandSkills = getIsChecked(["label2"]) || getIsChecked(["1st"]) || getIsChecked(["2nd"])


  useEffect(() => {
    if (isInitialized) {
      setDefaultExpandedCategories(getAccordionExpandedValues())
    }
  }, [isInitialized])

  useEffect(() => {
    onExpandedChangeLocations(shouldExpandLocations)
    onExpandedChangeSkills(shouldExpandSkills)
  }, [shouldExpandLocations, shouldExpandSkills])

  function getAccordionExpandedValues(): string[] {
    const availableValues = [
      {
        label: "locations",
        values: ["label", "southwest", "northeast", "san-fransisco", "new-york"]
      },
      {
        label: "skills",
        values: ["label2", "1st", "2nd", "3rd", "4th"]
      }
    ]

    const expanded = availableValues.filter(({ values }) => values.some(value => getIsChecked([value])))
    if (!expanded.length) {
      return ["locations"]
    }
    return expanded.map(({ label }) => label)
  }

  if (!defaultExpandedCategories.length) {
    return <></>
  }

  return (
    <>
      <Card>
        <CardContent className="py-3">
          <Accordion defaultValue={defaultExpandedCategories} type="multiple">
            <AccordionItem value="locations" variant="filter">
              <AccordionTrigger variant="filter">
                Locations
              </AccordionTrigger>
              <AccordionContent variant="filter">
                <Accordion type="single" collapsible value={isExpandedLocations ? "label" : ""}>
                  <AccordionItem value="label" variant="filter">
                    <CheckboxFilterAccordion
                      checked={getIsChecked(["label", "southwest", "northeast"])}
                      id="label"
                      label="Label"
                      onCheckedChange={(value) => {
                        onFiltersChange([{ "southwest": value }, { "northeast": value }])
                        onExpandedChangeLocations(value)
                      }}
                      onTriggerClick={() => onExpandedChangeLocations(!isExpandedLocations)}
                    />
                    <AccordionContent variant="filter">
                      <CheckboxFilter
                        checked={getIsChecked(["southwest"])}
                        id="southwest"
                        label="Southwest"
                        onCheckedChange={(value) => onFiltersChange([{ "southwest": value }])}
                      />
                      <CheckboxFilter
                        checked={getIsChecked(["northeast"])}
                        id="northeast"
                        label="Northeast"
                        onCheckedChange={(value) => onFiltersChange([{ "northeast": value }])}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="san-fransisco" variant="filter">
                    <CheckboxFilterAccordion
                      checked={getIsChecked(["san-fransisco"])}
                      id="san-fransisco"
                      label="San Fransisco"
                      onCheckedChange={(value) => onFiltersChange([{ "san-fransisco": value }])}
                    />
                  </AccordionItem>
                  <AccordionItem value="new-york" variant="filter">
                    <CheckboxFilterAccordion
                      checked={getIsChecked(["new-york"])}
                      id="new-york"
                      label="New York"
                      onCheckedChange={(value) => onFiltersChange([{ "new-york": value }])}
                    />
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skills">
              <AccordionTrigger variant="filter">
                Skills
              </AccordionTrigger>
              <AccordionContent variant="filter">
                <Accordion type="single" collapsible value={isExpandedSkills ? "label2" : ""}>
                  <AccordionItem value="label2" variant="filter">
                    <CheckboxFilterAccordion
                      checked={getIsChecked(["label2", "1st", "2nd"])}
                      id="label2"
                      label="Label"
                      onCheckedChange={(value) => {
                        onFiltersChange([{ "1st": value }, { "2nd": value }])
                        onExpandedChangeSkills(value)
                      }}
                      onTriggerClick={() => onExpandedChangeSkills(!isExpandedSkills)}
                    />
                    <AccordionContent variant="filter">
                      <CheckboxFilter
                        checked={getIsChecked(["1st"])}
                        id="1st"
                        label="1st skill"
                        onCheckedChange={(value) => onFiltersChange([{ "1st": value }])}
                      />
                      <CheckboxFilter
                        checked={getIsChecked(["2nd"])}
                        id="2nd"
                        label="2nd skill"
                        onCheckedChange={(value) => onFiltersChange([{ "2nd": value }])}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="3rd" variant="filter">
                    <CheckboxFilterAccordion
                      checked={getIsChecked(["3rd"])}
                      id="3rd"
                      label="3rd skill"
                      onCheckedChange={(value) => onFiltersChange([{ "3rd": value }])}
                    />
                  </AccordionItem>
                  <AccordionItem value="new-york" variant="filter">
                    <CheckboxFilterAccordion
                      checked={getIsChecked(["4th"])}
                      id="4th"
                      label="4th skill"
                      onCheckedChange={(value) => onFiltersChange([{ "4th": value }])}
                    />
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {onFiltersReset && (
        <Button className="mt-2" onClick={onFiltersReset}>
          Reset filters
        </Button>
      )}
    </>
  );
}