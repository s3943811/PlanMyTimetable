"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { DialogProps as DialogPrimitiveProps } from "@radix-ui/react-dialog";
import React from "react";

const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = DialogPrimitive.Overlay;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;
const DialogContent = DialogPrimitive.Content;

interface DialogProps extends DialogPrimitiveProps {
  width: number;
}
const Dialog = ({ children, onOpenChange, width, ...props }: DialogProps) => {
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= width) {
        onOpenChange?.(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onOpenChange, width]);

  return (
    <DialogPrimitive.Root onOpenChange={onOpenChange} {...props}>
      {children}
    </DialogPrimitive.Root>
  );
};

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
