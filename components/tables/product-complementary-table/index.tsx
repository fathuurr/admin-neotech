/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { deleteSerialNumber, getDataComplementary } from '@/service/product';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Loader2, Trash } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/modal/alert-modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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

const PAGE_SIZE = 10;

const ProductComplementaryTable = () => {
  const [complementaryData, setComplementaryData] = useState<
    ComplementaryData[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getComplementaryList = useCallback(async () => {
    setIsLoading(true);
    const res = await getDataComplementary();
    setComplementaryData(res);
    setIsLoading(false);
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
        (item) => item.serialNumber === serialNumber
      )?.product?._id;

      if (!productId) {
        toast({
          title: 'Invalid ID',
        });
        return;
      }

      const requestBody = { serialNumber };

      const res = await deleteSerialNumber(productId, requestBody);

      if (res) {
        toast({
          title: res.message,
          className: 'bg-green-500',
        });
      } else {
        toast({
          title: 'Error deleting serial number',
        });
      }

      getComplementaryList();
    } catch (error: any) {
      toast({
        title: error,
      });
    }
  };
  const filteredData = complementaryData.filter((item: any) =>
    new RegExp(searchTerm, 'i').test(item.serialNumber + item.macAddress)
  );

  const pageCount = Math.ceil(filteredData.length / PAGE_SIZE);

  const paginatedComplementaryList = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const showNoDataMessage = filteredData.length === 0 && searchTerm !== '';
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
      <div className='container mx-auto pt-8'>
        <Input
          type='text'
          placeholder='Search by serial number and mac address...'
          value={searchTerm}
          onChange={handleInputSearch}
        />

        {isLoading ? (
          <div className='flex items-center justify-center mt-10'>
            <Loader2 className='animate-spin' size={50} />
          </div>
        ) : (
          <>
            <ScrollArea className='rounded-md border h-[calc(80vh-220px)] mt-7'>
              <Table>
                <TableHeader className='sticky top-0 bg-secondary'>
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
                    paginatedComplementaryList.map((item: any) => (
                      <TableRow key={item._id}>
                        <TableCell className='font-medium'>
                          {item.product.productNumber}
                        </TableCell>
                        <TableCell className='font-medium'>
                          {item.product.productName}
                        </TableCell>
                        <TableCell className='font-medium'>
                          {item.product.productCategory.categoryName}
                        </TableCell>
                        <TableCell className='font-medium'>
                          {item.serialNumber}
                        </TableCell>
                        <TableCell className='font-medium'>
                          {item.macAddress}
                        </TableCell>
                        <TableCell>
                          <div className='has-tooltip'>
                            <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-12'>
                              Delete
                            </span>
                            <Trash
                              className='text-red-500 cursor-pointer'
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

            <Pagination className='flex justify-end mt-4'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`${
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />
                </PaginationItem>
                <PaginationItem>
                  {Array.from({ length: pageCount }, (_, i) => (
                    <>
                      {(i === 0 ||
                        i === pageCount - 1 ||
                        (i >= currentPage - 2 && i <= currentPage + 1)) && (
                        <PaginationLink
                          key={i}
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </PaginationLink>
                      )}

                      {i === currentPage - 3 &&
                        i !== 0 &&
                        i !== pageCount - 3 && (
                          <span className='mx-1'>...</span>
                        )}
                    </>
                  ))}
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    className={`${
                      currentPage === pageCount
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </>
  );
};

export default ProductComplementaryTable;
