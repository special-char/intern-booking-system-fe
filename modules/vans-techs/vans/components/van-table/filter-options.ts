import { FilterGroup } from "@/components/common/table/filter-options-button";

export const filters: FilterGroup[] = [
  {
    id: "name",
    label: "Name",
    options: [
      { label: "Dwayne Johnson", value: "Dwayne Johnson" },
      { label: "John Doe", value: "John Doe" },
      { label: "Jane Doe", value: "Jane Doe" },
    ],
  },
  {
    id: "email",
    label: "Email",
    options: [
      {
        label: "dwayne.johnson@example.com",
        value: "dwayne.johnson@example.com",
      },
      { label: "john.doe@example.com", value: "john.doe@example.com" },
      { label: "jane.doe@example.com", value: "jane.doe@example.com" },
    ],
  },
  {
    id: "mobilePhone",
    label: "Mobile Phone",
    options: [
      { label: "+1234567890", value: "+1234567890" },
      { label: "+1234567891", value: "+1234567891" },
      { label: "+1234567892", value: "+1234567892" },
    ],
  },
];
