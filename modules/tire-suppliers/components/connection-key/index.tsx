import { Tooltip } from "@/components/common/tooltip";
import { Card, CardHeader, CardContent } from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { TireSupplier } from "@/types/tire-supplier";
import { getMaskedText } from "@/utils/get-masked-text";
import { Lock } from "lucide-react";

interface TireSupplierConnectionKeyProps {
  connectionKey: TireSupplier["connectionKey"];
  isRevealed: boolean;
}

export default function TireSupplierConnectionKey({
  connectionKey,
  isRevealed,
}: TireSupplierConnectionKeyProps) {
  function getConnectionKey(): string {
    if (isRevealed) {
      return connectionKey;
    }
    return getMaskedText(connectionKey);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 justify-between">
          <h2 className="text-sm font-medium text-text-primary">
            Connection Keys
          </h2>
          <Tooltip>
            <p>lorem ipsum</p>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <Input
          caption="Contact admin to know more"
          className="mt-5"
          disabled
          rightIcon={<Lock size={16} className="text-text-placeholder" />}
          type="text"
          value={getConnectionKey()}
        />
      </CardContent>
    </Card>
  );
}
