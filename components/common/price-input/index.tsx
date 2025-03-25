import { Input, InputProps } from "@/components/shadcn/input";

interface PriceInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void
}

export function PriceInput(props: PriceInputProps) {
  return (
    <Input
      {...props}
      value={`$${props.value}`}
      onChange={(e) => {
        const inputValue = e.target.value;
        const cleanValue = inputValue
          .replace(/\$/g, "")
          .trim();
        props.onChange(cleanValue);
      }}
    />
  )

}