import { PreviewProps } from "../types";
import { fontFamilies } from "../schema";

export function FontPreview({ form }: PreviewProps) {
  return (
    <div className="col-span-full space-y-2">
      <h3 className="text-sm font-medium text-gray-500">Font Style</h3>
      <div 
        className="p-6 bg-gray-50 rounded-lg space-y-4"
        style={{ 
          fontFamily: form.getValues().fontFamily || 'system-ui'
        }}
      >
        <div className="space-y-1">
          <p className="text-2xl">The quick brown fox jumps over the lazy dog</p>
          <p className="text-sm text-gray-500">Preview text - 24px</p>
        </div>
        <div className="space-y-1">
          <p className="text-base">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="text-sm text-gray-500">Uppercase - 16px</p>
        </div>
        <div className="space-y-1">
          <p className="text-base">abcdefghijklmnopqrstuvwxyz</p>
          <p className="text-sm text-gray-500">Lowercase - 16px</p>
        </div>
        <div className="space-y-1">
          <p className="text-base">0123456789</p>
          <p className="text-sm text-gray-500">Numerals - 16px</p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <span>Selected Font:</span>
          <span className="font-medium text-gray-900">
            {fontFamilies.find(f => f.value === form.getValues().fontFamily)?.label || 'System Default'}
          </span>
        </div>
      </div>
    </div>
  );
} 