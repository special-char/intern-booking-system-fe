import { memo, useCallback, useMemo } from 'react';
import { Button } from '@/components/shadcn/button';
import { FormProvider } from 'react-hook-form';
import { BrandFormProps } from "../types";
import ColorField from './ColorField';
import FontField from './FontField';
import ImageField from './ImageField';
import { X } from 'lucide-react';

interface BrandFormWithResetProps extends BrandFormProps {
  onResetToDefault: () => void;
}

const BrandForm = memo(({ form, onSubmit, onCancel, onResetToDefault }: BrandFormWithResetProps) => {
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  }, [form, onSubmit]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const formContent = useMemo(() => (
    <div className="px-4 flex flex-col gap-3">
      <ColorField />
      <FontField />
      <ImageField 
        name="brandLogo"
        label="Brand Logo"
        aspectRatio="square"
      />
      <ImageField 
        name="coverImage"
        label="Cover Image"
        aspectRatio="wide"
      />
    </div>
  ), []);

  const formActions = useMemo(() => (
    <div className="px-4 border-t pt-4 flex gap-2 flex-row">
      <Button 
        variant="outline" 
        type="button" 
        className="w-full" 
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="w-full" 
      >
        Save
      </Button>
    </div>
  ), [handleCancel]);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-4 py-4 relative">
        {/* X icon for reset */}
        <button
          type="button"
          aria-label="Reset to default"
          className="absolute top-2 right-2 p-1 rounded hover:bg-muted"
          onClick={onResetToDefault}
        >
          <X className="w-5 h-5" />
        </button>
        {formContent}
        {formActions}
      </form>
    </FormProvider>
  );
});

BrandForm.displayName = 'BrandForm';

export default BrandForm; 