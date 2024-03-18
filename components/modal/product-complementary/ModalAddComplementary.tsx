"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ComplementaryProduct } from "@/types/product";
import { getProduct, postDataComplementary } from "@/service/product";

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
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Select from "react-select";

export function ModalAddComplementary() {
  const [productList, setProductList] = useState([]);

  const [addComplementary, setAddComplementary] =
    useState<ComplementaryProduct>({
      productID: "",
      complementaryData: [],
    });

  const getProductList = useCallback(async () => {
    const data = await getProduct();

    setProductList(data);
  }, []);

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedProductList = productList.map((product: any) => ({
    value: product._id,
    label: product.productName,
  }));

  const [inputFields, setInputFields] = useState([
    { serialNumber: "", macAddress: "" },
  ]);

  const handleChangeInput = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
    name: "serialNumber" | "macAddress",
  ) => {
    const { value } = event.target;
    const values = [...inputFields];
    values[index][name] = value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { serialNumber: "", macAddress: "" }]);
  };

  const handleRemoveFields = (index: any) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onSubmit = async () => {
    const data = {
      ...addComplementary,
      complementaryData: inputFields,
    };

    if (!addComplementary) {
      toast({
        title: "Silahkan isi complementary product terlebih dahulu",
        className: "bg-red-500",
      });
    } else {
      const response = await postDataComplementary(data);
      if (response.error) {
        toast({
          title: response.message,
          className: "bg-red-500",
        });
      } else {
        toast({
          title: "Successfully added complementary product ",
          className: "bg-success-500",
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
          <DialogTitle>Add your product complementary</DialogTitle>
          <DialogDescription>
            Add your product complementary here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select
            className="my-react-select-container rounded-lg"
            classNamePrefix={"my-react-select"}
            value={formattedProductList.find(
              (product) => product.value === addComplementary?.productID,
            )}
            onChange={(selectedOption: any) =>
              setAddComplementary((prevState) => ({
                ...prevState,
                productID: selectedOption ? selectedOption.value : null,
              }))
            }
            options={formattedProductList}
            isSearchable={true}
            isClearable={true}
          />

          {inputFields.map((inputField, index) => (
            <div className="flex items-center" key={index}>
              <Input
                type="text"
                value={inputField.serialNumber}
                onChange={(e) => handleChangeInput(index, e, "serialNumber")}
                name="serialNumber"
                className="w-1/3"
                placeholder="Serial Number"
              />

              <Input
                type="text"
                value={inputField.macAddress}
                onChange={(e) => handleChangeInput(index, e, "macAddress")}
                name="macAddress"
                className="w-1/3 ml-5"
                placeholder="Mac Address"
              />

              {inputFields.length > 1 && (
                <Trash2
                  className="cursor-pointer ml-2 text-red-500"
                  onClick={() => handleRemoveFields(index)}
                />
              )}

              {index === inputFields.length - 1 && (
                <Plus
                  className="cursor-pointer ml-2"
                  onClick={() => handleAddFields()}
                />
              )}
            </div>
          ))}
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
