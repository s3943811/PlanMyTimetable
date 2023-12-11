"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { DialogProps as DialogPrimitiveProps } from "@radix-ui/react-dialog";
import React from "react";

const SheetTrigger = DialogPrimitive.Trigger;
const SheetPortal = DialogPrimitive.Portal;
const SheetClose = DialogPrimitive.Close;
const SheetOverlay = DialogPrimitive.Overlay;
const SheetTitle = DialogPrimitive.Title;
const SheetDescription = DialogPrimitive.Description;
const SheetContent = DialogPrimitive.Content;

interface SheetProps extends DialogPrimitiveProps {
  closeWidth: number;
}
const Sheet = ({
  children,
  onOpenChange,
  closeWidth,
  ...props
}: SheetProps) => {
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= closeWidth) {
        onOpenChange?.(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onOpenChange, closeWidth]);

  return (
    <DialogPrimitive.Root onOpenChange={onOpenChange} {...props}>
      {children}
    </DialogPrimitive.Root>
  );
};

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetClose,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
};
