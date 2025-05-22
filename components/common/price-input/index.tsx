import { Input, InputProps } from "@/components/shadcn/input";
import { Textarea, TextareaProps } from "@/components/shadcn/textarea";
import { Lock } from "lucide-react";

interface PriceInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void;
  isTextarea?: boolean;
  icon?: boolean;
}

export function PriceInput(props: PriceInputProps) {
  const { isTextarea, onChange, value, icon, ...rest } = props;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/\$/g, "").trim();
    onChange(cleanValue);
  };

  if (isTextarea) {
    return (
      <Textarea
        size="small"
        {...(rest as unknown as Omit<TextareaProps, "onChange" | "value">)}
        value={`$${value}`}
        onChange={handleChange}
        leftIcon={icon ? <Lock className="w-3 h-3" /> : undefined}
      />
    );
  }

  return (
    <Input
      {...rest}
      value={`$${value}`}
      onChange={handleChange}
      leftIcon={icon ? <Lock className="w-3 h-3" /> : undefined}
    />
  );
}
