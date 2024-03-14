/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getDataComplementary } from "@/service/product";
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

const ProductComplementaryTable = () => {
  const [complementaryData, setComplementaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredData = complementaryData.filter(
    (item: any) =>
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.macAddress.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showNoDataMessage = filteredData.length === 0 && searchTerm !== "";
  return (
    <>
      <div className="container mx-auto pt-8">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputSearch}
        />

        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Product Number</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Product Category</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Mac Address</TableHead>
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductComplementaryTable;
