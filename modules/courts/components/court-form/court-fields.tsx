"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { ImagesInput } from "@/components/common/images-input";
import { Button } from "@/components/shadcn/button";
import { SheetFooter } from "@/components/shadcn/sheet";
import { CourtPricingFields } from "./court-pricing-fields";

interface CourtFieldsProps {
  form: UseFormReturn<any>;
  setPreview: (preview: string) => void;
  preview: string;
}

export function CourtFields({
  form,
  setPreview,
  preview,
}: CourtFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 shadow-sm">
            <FormLabel>Court Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter court name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 shadow-sm">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter court description"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxPlayers"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem className="rounded-lg border p-4 shadow-sm">
            <FormLabel>Maximum Players</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter maximum number of players" 
                {...rest}
                onChange={(e) => onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="length"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem className="rounded-lg border p-4 shadow-sm flex-1">
              <FormLabel>Length (m)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="L"
                  {...rest}
                  onChange={(e) => onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breadth"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem className="rounded-lg border p-4 shadow-sm flex-1">
              <FormLabel>Breadth (m)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="B"
                  {...rest}
                  onChange={(e) => onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem className="rounded-lg border p-4 shadow-sm flex-1">
              <FormLabel>Height (m)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="H"
                  {...rest}
                  onChange={(e) => onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <CourtPricingFields form={form} />

      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 shadow-sm">
            <FormLabel>Images</FormLabel>
            <FormControl>
              <ImagesInput
                value={field.value || []}
                onChange={field.onChange}
              />
            </FormControl>
            {form.formState.errors.images?.message && <FormMessage />}
          </FormItem>
        )}
      />
      <FormField
        name="form-actions"
        render={() => (
          <SheetFooter className="border-t mt-auto pt-4 flex gap-2 flex-row px-4">
            <Button
              variant="secondary"
              type="button"
              className="w-full"
              // onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full"
              // disabled={isSubmitting}
            >
              {/* {isSubmitting ? "Saving..." : isEdit ? "Update" : "Save"} */}
              Save
            </Button>
          </SheetFooter>
        )}
      />
    </div>
  );
}
