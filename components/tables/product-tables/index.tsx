"use client";
import { deleteProduct, getProduct } from "@/service/product";
import { Product } from "@/types/product";
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
import ModalUploadPhoto from "@/components/modal/product/ModalUploadPhoto";
import { ModalUpdateProduct } from "@/components/modal/product/ModalUpdateProduct";
import { Trash2 } from "lucide-react";
import ModalDetailProduct from "@/components/modal/product/ModalDetailProduct";
import { AlertModal } from "@/components/modal/alert-modal";
import { useToast } from "@/components/ui/use-toast";

const ProductTable = () => {
  const { toast } = useToast();
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const getProductList = useCallback(async () => {
    const data = await getProduct();
    setProductList(data);
  }, []);

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProductList = productList.filter(
    (item: Product) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showNoDataMessage =
    filteredProductList.length === 0 && searchTerm !== "";

  const handleDelete = async () => {
    const response = await deleteProduct(deleteId);
    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: "Berhasil delete product",
      });
      window.location.reload();
    }
  };

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
              <TableHead>Product Number</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Product Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showNoDataMessage ? (
              <TableRow>
                <TableCell>No Data</TableCell>
              </TableRow>
            ) : (
              filteredProductList.map((item: Product) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    {item.productNumber}
                  </TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.productCategory.categoryName}</TableCell>
                  <TableCell className="flex items-center">
                    <ModalDetailProduct product={item._id} />
                    <ModalUploadPhoto product={item} />
                    <ModalUpdateProduct product={item} />

                    <div className="has-tooltip">
                      <Trash2
                        className="cursor-pointer text-red-500"
                        onClick={() => {
                          setOpen(true);
                          setDeleteId(item._id);
                        }}
                      />
                      <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-12">
                        Delete
                      </span>
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

export default ProductTable;
