import { memo } from 'react';
import { Button } from '@/components/shadcn/button';
import { Form } from '@/components/shadcn/form';
import { BrandFormProps } from "../types";
import ColorField from './ColorField';
import FontField from './FontField';
import ImageField from './ImageField';

const BrandForm = memo(({ form, onSubmit, onCancel }: BrandFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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

        <div className="px-4 border-t pt-4 flex gap-2 flex-row">
          <Button 
            variant="secondary" 
            type="button" 
            className="w-full" 
            onClick={onCancel}
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
      </form>
    </Form>
  );
});

BrandForm.displayName = 'BrandForm';

export default BrandForm; 