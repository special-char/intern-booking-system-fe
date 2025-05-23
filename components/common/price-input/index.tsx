import { Input, InputProps } from "@/components/shadcn/input";
import { Textarea, TextareaProps } from "@/components/shadcn/textarea";
import { Lock } from "lucide-react";
import { useState } from "react";

interface PriceInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void;
  isTextarea?: boolean;
  icon?: boolean;
}

export function PriceInput(props: PriceInputProps) {
  const { isTextarea, onChange, value, icon, ...rest } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/\$/g, "").trim();
    onChange(cleanValue);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (isTextarea) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block w-full"
      >
        <Textarea
          size="small"
          {...(rest as unknown as Omit<TextareaProps, "onChange" | "value">)}
          value={`$${value}`}
          onChange={handleChange}
          leftIcon={
            icon && isHovered ? <Lock className="w-3 h-3" /> : undefined
          }
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Input
        {...rest}
        value={`$${value}`}
        onChange={handleChange}
        leftIcon={icon && isHovered ? <Lock className="w-3 h-3" /> : undefined}
      />
    </div>
  );
}
