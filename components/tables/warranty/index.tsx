"use client";

import { AlertModal } from "@/components/modal/alert-modal";
import ModalUpdateWarranty from "@/components/modal/warranty/Update";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { formattedDate } from "@/lib/utils";
import { deleteWarranty, getWarranty } from "@/service/warranty";
import { Warranty } from "@/types/warranty";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const WarrantyTable = () => {
  const [warrantyList, setWarrantyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);

  const getWarrantyList = useCallback(async () => {
    const data = await getWarranty();

    setWarrantyList(data);
  }, []);

  useEffect(() => {
    getWarrantyList();
  }, []);

  const handleDelete = async () => {
    const response = await deleteWarranty(deleteId);

    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: "Berhasil delete product category",
      });
      window.location.reload();
    }
  };

  const filteredWarrantyList = warrantyList.filter((item: Warranty) =>
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showNoDataMessage =
    filteredWarrantyList.length === 0 && searchTerm !== "";

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="container mx-auto">
        <Input
          className="mb-4"
          placeholder="Search..."
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ScrollArea className="h-[500px]">
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Serial Number</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Warranty</TableHead>
                <TableHead>Warranty End</TableHead>
                <TableHead>Receipt Date</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {showNoDataMessage ? (
                <TableRow>
                  <TableCell>No Data</TableCell>
                </TableRow>
              ) : (
                filteredWarrantyList.map((item: Warranty) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell> {item.serialNumber} </TableCell>
                      <TableCell> {item.product.productName} </TableCell>
                      <TableCell> {item.warranty} </TableCell>
                      <TableCell> {formattedDate(item.warrantyEnd)} </TableCell>
                      <TableCell> {formattedDate(item.receiptDate)} </TableCell>
                      <TableCell>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.receipt}`}
                          alt="image receipt"
                          width={200}
                          height={200}
                          className="rounded-md"
                        />
                      </TableCell>
                      <TableCell className="flex items-center gap-3">
                        <ModalUpdateWarranty warrantyId={item} />

                        <div className="has-tooltip">
                          <Trash
                            onClick={() => {
                              setOpen(true);
                              setDeleteId(item._id);
                            }}
                            className="text-red-500 cursor-pointer"
                          />
                          <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-12">
                            Delete warranty
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </>
  );
};

export default WarrantyTable;
