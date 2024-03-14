"use client";

import { useEffect, useState } from "react";
import { updateProduct } from "@/service/product";

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
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "../../ui/textarea";
import { Pencil } from "lucide-react";

export function ModalUpdateProduct({ product }: any) {
  const { toast } = useToast();

  const [updateData, setUpdateData] = useState({
    productNumber: "",
    productName: "",
    productDescription: "",
    productWarranty: "",
  });

  useEffect(() => {
    if (product) {
      setUpdateData(product);
    }
  }, [product]);

  const onSubmit = async () => {
    try {
      const response = await updateProduct(updateData, product._id);
      if (response.error) {
        toast({
          title: "Error updating product",
          description: response.message,
          className: "bg-red-500",
        });
      } else {
        toast({
          title: "Successfully updated",
          className: "bg-green-500",
        });
        window.location.reload();
      }
    } catch (error: any) {
      toast({
        title: error.message,
        className: "bg-red-500",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="cursor-pointer mr-2 text-orange-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your product</DialogTitle>
          <DialogDescription>
            Add your product here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="text"
            value={updateData.productNumber}
            onChange={(e) =>
              setUpdateData((prevState) => ({
                ...prevState,
                productNumber: e.target.value,
              }))
            }
            placeholder="Product Number"
          />

          <Input
            type="text"
            value={updateData.productName}
            onChange={(e) =>
              setUpdateData((prevState) => ({
                ...prevState,
                productName: e.target.value,
              }))
            }
            placeholder="Product Name"
          />

          <Textarea
            onChange={(e) =>
              setUpdateData((prevState) => ({
                ...prevState,
                productDescription: e.target.value,
              }))
            }
            value={updateData.productDescription}
            placeholder="Description"
            cols={30}
            rows={10}
          />

          <Input
            type="number"
            value={updateData.productWarranty}
            onChange={(e) =>
              setUpdateData((prevState) => ({
                ...prevState,
                productWarranty: e.target.value,
              }))
            }
            placeholder="Product Warranty"
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
