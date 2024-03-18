"use client";

import { useEffect, useState } from "react";
import { updateCategory } from "@/service/product";

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
import { useToast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";

export function ModalUpdateCategory({ category }: any) {
  const { toast } = useToast();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName);
    }
  }, [category]);

  const onSubmit = async () => {
    const data = {
      categoryName,
    };

    const response = await updateCategory(data, category._id);
    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: "Successfully updated category",
      });
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Pencil className="cursor-pointer mr-2 text-orange-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Update category</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your product</DialogTitle>
          <DialogDescription>
            Update your product here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category"
          />
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
