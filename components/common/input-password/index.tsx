import * as React from "react";
import { Input } from "@/components/shadcn/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function InputPassword(
  props: React.ComponentPropsWithoutRef<typeof Input>
) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <Input
        type={showPassword ? "text" : "password"}
        className="pr-10"
        {...props}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-500 focus:outline-none"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOffIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
