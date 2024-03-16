"use client";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { updateWarranty } from "@/service/warranty";
import { UpdateWarranty } from "@/types/warranty";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Pencil } from "lucide-react";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn, formattedDate } from "@/lib/utils";

const ModalUpdateWarranty = ({ warrantyId }: any) => {
  const [data, setData] = useState<UpdateWarranty>({
    serialNumber: "",
    receiptDate: "",
  });
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (warrantyId) {
      setData(warrantyId);
    }
  }, [warrantyId]);

  const onSubmit = async () => {
    const response = await updateWarranty(data, warrantyId._id);

    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: "Successfully updated warranty",
      });
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="cursor-pointer text-orange-500" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your warranty</DialogTitle>
          <DialogDescription>Click save when youre done</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span> {formattedDate(data.receiptDate)} </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateWarranty;
