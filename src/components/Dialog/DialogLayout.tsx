"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";

const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = DialogPrimitive.Overlay;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;
const DialogContent = DialogPrimitive.Content;

interface DialogProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  width: number;
}
const Dialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Root>,
  DialogProps
>(({ children, onOpenChange, width, ...props }, ref) => {
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
  }, [onOpenChange]);

  return (
    <DialogPrimitive.Root onOpenChange={onOpenChange} {...props}>
      {children}
    </DialogPrimitive.Root>
  );
});

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
