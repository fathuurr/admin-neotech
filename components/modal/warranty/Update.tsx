"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { toast } from "@/components/ui/use-toast";
import { updateWarranty } from "@/service/warranty";
import { UpdateWarranty } from "@/types/warranty";
import { Pencil } from "lucide-react";

import { useEffect, useState } from "react";
import { formattedDate } from "@/lib/utils";

const ModalUpdateWarranty = ({ warrantyId }: any) => {
  const [data, setData] = useState<UpdateWarranty>({
    serialNumber: "",
    receiptDate: "",
  });

  useEffect(() => {
    if (warrantyId) {
      setData(warrantyId);
    }
  }, [warrantyId]);

  const onSubmit = async () => {
    const requestData = {
      serialNumber: data.serialNumber,
      receiptDate: data.receiptDate,
    };

    // const response = await updateWarranty(requestData, warrantyId._id);

    console.log(requestData);

    // if (response.error) {
    //   toast({
    //     title: response.message,
    //   });
    // } else {
    //   toast({
    //     title: "Successfully updated warranty",
    //   });
    //   window.location.reload();
    // }
  };

  function formatInputDate(dateString: string) {
    const date = new Date(dateString).toJSON()?.split("T")[0];

    return date;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Pencil className="cursor-pointer text-orange-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Update warranty</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your warranty</DialogTitle>
          <DialogDescription>Click save when youre done</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            type="text"
            defaultValue={warrantyId.serialNumber}
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                serialNumber: e.target.value,
              }))
            }
          />

          <Input
            type="date"
            className="w-1/2"
            value={formatInputDate(warrantyId.receiptDate)}
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                receiptDate: e.target.value,
              }))
            }
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateWarranty;
