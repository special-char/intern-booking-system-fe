import { Tooltip } from "@/components/common/tooltip";

export function InstallFormHeader() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-1 font-semibold">
      <p></p>
      <p className="text-xs text-text-secondary flex items-center justify-between">
        Job Duration (min){" "}
        <Tooltip>
          This is a tooltip. It will display additional information
          about the item.
        </Tooltip>
      </p>
      <p className="text-xs text-text-secondary flex items-center justify-between">
        Price{" "}
        <Tooltip>
          This is a tooltip. It will display additional information
          about the item.
        </Tooltip>
      </p>
      <p className="text-xs text-text-secondary flex items-center justify-between">
        Flex Discount{" "}
        <Tooltip>
          This is a tooltip. It will display additional information
          about the item.
        </Tooltip>
      </p>
    </div>
  );
}