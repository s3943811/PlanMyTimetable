"use client";
import { buttonVariants, Tooltip, Button, RetainLink } from "~/components";
import { HiInbox, HiXMark, HiChevronDown, HiTrash } from "react-icons/hi2";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import BlockedForm from "~/app/classes/add/blocked/BlockedForm";
import { usePreview } from "~/contexts/PreviewContext";
import { useUrlState } from "~/hooks/useUrlState";
import toast from "react-hot-toast";
import { cn } from "~/lib/utils";

export default function BlockedDialog() {
  const { blockedEvents } = usePreview();
  const { replaceState } = useUrlState();

  const visible = blockedEvents.length !== 0;

  const handleDelete = (name: string, index: number) => {
    const newBlocked = blockedEvents.toSpliced(index, 1);
    replaceState(newBlocked, "blocked");
    toast.success(`${name} deleted`);
  };

  return (
    <Dialog>
      <DialogTrigger className="">
        <Tooltip
          message={"Managed blocked times"}
          position="bottom"
          className="-left-[7rem] md:left-0"
        >
          <span className={buttonVariants.normalIcon}>
            <HiInbox />
          </span>
        </Tooltip>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[999] h-[200dvh] backdrop-brightness-[.65]" />
        <DialogContent className="fixed inset-y-0 right-0 z-[999] h-full w-full max-w-xs gap-4 space-y-3 rounded border bg-white p-6 shadow-lg duration-200 dark:border-neutral-600 dark:bg-neutral-800 sm:max-w-sm">
          <div className="flex flex-col space-y-1.5 border-b pb-1 dark:border-neutral-700">
            <DialogTitle className="text-lg font-medium leading-none tracking-tight">
              Blocked times
            </DialogTitle>
            <DialogDescription className="whitespace-pre-line text-sm text-neutral-500 dark:text-neutral-400">
              Edit details of and remove blocked times.{"\n"}
              {visible && (
                <RetainLink
                  href="/classes/add/blocked"
                  className="inline-flex items-center underline underline-offset-4 hover:font-medium hover:decoration-2"
                >
                  Block out another time
                </RetainLink>
              )}
            </DialogDescription>
          </div>
          {visible ? (
            <Accordion type="single" collapsible className="space-y-2">
              {blockedEvents.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-b-neutral-200 pb-2 last:border-b-0 dark:border-neutral-600"
                >
                  <AccordionHeader className="flex items-center gap-2 rounded-md border bg-neutral-50/20 pl-2 pr-1 dark:border-neutral-700 dark:bg-neutral-900/80">
                    <AccordionTrigger className="flex flex-1 items-center justify-between py-2 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                      <span>
                        {item.name}
                        &nbsp;
                        <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                          &#x2022;&nbsp;{item.day} ({item.start})
                        </span>
                      </span>
                      <HiChevronDown className="h-4 w-4 shrink-0 text-neutral-600 transition-transform duration-200 dark:text-neutral-300" />
                    </AccordionTrigger>
                    <Tooltip
                      position="top"
                      className="-left-[5rem]"
                      message={`Delete ${item.name} - ${item.day}`}
                    >
                      <Button
                        variant="normalIcon"
                        onClick={() => handleDelete(item.name, index)}
                      >
                        <HiTrash />
                      </Button>
                    </Tooltip>
                  </AccordionHeader>
                  <AccordionContent className=" overflow-hidden px-1 py-2 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <BlockedForm
                      defaultValues={{
                        id: item.id,
                        name: item.name,
                        start_time: item.start,
                        duration: item.duration,
                        day: item.day,
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="h-full space-y-2">
              <p className="">You haven&apos;t blocked out any times.</p>
              <p className="">
                Block out a time to hide preferences that overlap with that time
                and work around fixed events.
              </p>
              <RetainLink
                href="/classes/add/blocked"
                className={cn(buttonVariants.normal, "absolute right-8")}
              >
                Block out a time
              </RetainLink>
            </div>
          )}

          <DialogClose asChild>
            <button className="absolute right-2 top-2 rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <HiXMark />
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
