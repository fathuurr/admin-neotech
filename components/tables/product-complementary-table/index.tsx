/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { deleteSerialNumber, getDataComplementary } from "@/service/product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modal/alert-modal";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComplementaryData {
  _id: string;
  product: {
    _id: string;
    productNumber: string;
    productName: string;
    productCategory: {
      categoryName: string;
    };
  };
  serialNumber: string;
  macAddress: string;
}

const ProductComplementaryTable = () => {
  const [complementaryData, setComplementaryData] = useState<
    ComplementaryData[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);

  const getComplementaryList = useCallback(async () => {
    const res = await getDataComplementary();
    setComplementaryData(res);
  }, []);

  useEffect(() => {
    getComplementaryList();
  }, [getComplementaryList]);

  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const removeSerialNumber = async (serialNumber: string) => {
    try {
      const productId = complementaryData.find(
        (item) => item.serialNumber === serialNumber,
      )?.product?._id;

      if (!productId) {
        toast({
          title: "Invalid ID",
        });
        return;
      }

      const requestBody = { serialNumber };

      const res = await deleteSerialNumber(productId, requestBody);

      if (res) {
        toast({
          title: res.message,
          className: "bg-green-500",
        });
      } else {
        toast({
          title: "Error deleting serial number",
        });
      }

      getComplementaryList();
    } catch (error: any) {
      toast({
        title: error,
      });
    }
  };

  const filteredData = complementaryData.filter(
    (item: any) =>
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.macAddress.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showNoDataMessage = filteredData.length === 0 && searchTerm !== "";
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          removeSerialNumber(deleteId);
          setOpen(false);
        }}
      />
      <div className="container mx-auto pt-8">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputSearch}
        />

        <ScrollArea className="rounded-md border h-[calc(80vh-220px)] mt-7">
          <Table>
            <TableHeader className="sticky top-0 bg-secondary">
              <TableRow>
                <TableHead>Product Number</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Product Category</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Mac Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {showNoDataMessage ? (
                <TableRow>
                  <TableCell>No Data</TableCell>
                </TableRow>
              ) : (
                filteredData.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item.product.productNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.product.productName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.product.productCategory.categoryName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.serialNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.macAddress}
                    </TableCell>
                    <TableCell>
                      <div className="has-tooltip">
                        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-12">
                          Delete
                        </span>
                        <Trash
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setDeleteId(item.serialNumber);
                            setOpen(true);
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </>
  );
};

export default ProductComplementaryTable;
