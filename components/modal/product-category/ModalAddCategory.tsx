"use client";
import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";

import { categoryProduct } from "@/service/product";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export function ModalAddCategory() {
  const [categoryName, setCategoryName] = useState("");

  const onSubmit = async () => {
    const data = {
      categoryName,
    };

    if (!categoryName) {
      toast({
        title: "Please fill your form",
      });
    } else {
      const response = await categoryProduct(data);
      if (response.error) {
        toast({
          title: response.message,
        });
      } else {
        toast({
          title: "Sucessfully add category",
          className: "bg-green-500",
        });

        window.location.reload();
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 " />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50%]">
        <DialogHeader>
          <DialogTitle>Add your product category</DialogTitle>
          <DialogDescription>
            Add your product category here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="text"
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Product Category"
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
