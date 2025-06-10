"use client";

import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { CourtForm } from "@/modules/courts/components/court-form";
import { AddCourtFormType } from "@/modules/courts/components/court-form/add-court-form.consts";

export interface CourtFormModalProps {
  onCourtAdded: (newCourt: AddCourtFormType) => void;
  onCourtUpdated: (updatedCourt: AddCourtFormType & { id: string }) => void;
  initialValues?: AddCourtFormType & { id: string };
  isEdit?: boolean;
  isView?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CourtFormModal({ onCourtAdded, onCourtUpdated, initialValues, isEdit, isView, isOpen, setIsOpen }: CourtFormModalProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <CourtForm 
        setIsOpen={setIsOpen} 
        onCourtAdded={onCourtAdded} 
        onCourtUpdated={onCourtUpdated}
        initialValues={initialValues}
        isEdit={isEdit}
        isView={isView}
      />
    </Sheet>
  );
}