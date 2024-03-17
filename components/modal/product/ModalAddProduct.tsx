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

import { getCategoryProduct, postProduct } from "@/service/product";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { Textarea } from "../../ui/textarea";
import { toast } from "@/components/ui/use-toast";

export function ModalAddProduct() {
  const [categoryList, setCategoryList] = useState([]);
  const [addProduct, setAddProduct] = useState({
    productNumber: "",
    productCategory: "",
    productName: "",
    productDescription: "",
    productWarranty: "",
  });

  const getCategoryProductList = useCallback(async () => {
    const data = await getCategoryProduct();

    setCategoryList(data);
  }, []);

  useEffect(() => {
    getCategoryProductList();
  }, []);

  const formattedCategories = categoryList.map((category: any) => ({
    value: category._id,
    label: category.categoryName,
  }));

  const onSubmit = async () => {
    const data = {
      ...addProduct,
      productWarranty: parseInt(addProduct.productWarranty),
    };

    if (!addProduct) {
      toast({
        title: "Please complete the form",
        className: "bg-red-500",
      });
    } else {
      const response = await postProduct(data);
      if (response.error) {
        toast({
          title: response.message,
          className: "bg-red-500",
        });
      } else {
        toast({
          title: "Berhasil menambahkan product",
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
          <Plus className="mr-2" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50%]">
        <DialogHeader>
          <DialogTitle>Add your product</DialogTitle>
          <DialogDescription>
            Add your product here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="text"
            value={addProduct.productNumber}
            onChange={(e) =>
              setAddProduct((prevState) => ({
                ...prevState,
                productNumber: e.target.value,
              }))
            }
            placeholder="Product Number"
          />

          <Select
            className="my-react-select-container rounded-lg"
            classNamePrefix={"my-react-select"}
            value={formattedCategories.find(
              (category) => category.value === addProduct.productCategory,
            )}
            onChange={(selectedOption: any) =>
              setAddProduct((prevState) => ({
                ...prevState,
                productCategory: selectedOption ? selectedOption.value : "",
              }))
            }
            options={formattedCategories}
            isSearchable={true}
            isClearable={true}
          />

          <Input
            type="text"
            value={addProduct.productName}
            onChange={(e) =>
              setAddProduct((prevState) => ({
                ...prevState,
                productName: e.target.value,
              }))
            }
            placeholder="Product Name"
          />

          <Textarea
            onChange={(e) =>
              setAddProduct((prevState) => ({
                ...prevState,
                productDescription: e.target.value,
              }))
            }
            value={addProduct.productDescription}
            placeholder="Description"
            cols={30}
            rows={5}
          />

          <Input
            type="number"
            value={addProduct.productWarranty}
            onChange={(e) =>
              setAddProduct((prevState) => ({
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
