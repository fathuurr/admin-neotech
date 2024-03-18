/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { deleteCategoryProduct, getCategoryProduct } from "@/service/product";
import { CategoryProduct } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { AlertModal } from "@/components/modal/alert-modal";
import { toast } from "@/components/ui/use-toast";
import { ModalUpdateCategory } from "@/components/modal/product-category/ModalUpdateCategory";

const ProductCategoryTable = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryList = useCallback(async () => {
    const data = await getCategoryProduct();

    setCategoryList(data);
  }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleDelete = async () => {
    const response = await deleteCategoryProduct(deleteId);
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

  const filteredProductList = categoryList.filter((item: CategoryProduct) =>
    item.categoryName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showNoDataMessage =
    filteredProductList.length === 0 && searchTerm !== "";
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="container mx-auto pt-8">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showNoDataMessage ? (
              <TableRow>
                <TableCell>No Data</TableCell>
              </TableRow>
            ) : (
              filteredProductList.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    {item.categoryName}
                  </TableCell>

                  <TableCell className="flex items-center">
                    <ModalUpdateCategory category={item} />

                    <div className="has-tooltip">
                      <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-12">
                        Delete
                      </span>
                      <Trash2
                        className="cursor-pointer text-red-500"
                        onClick={() => {
                          setOpen(true);
                          setDeleteId(item._id);
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductCategoryTable;
