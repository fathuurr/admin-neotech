'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import ModalUpdateWarranty from '@/components/modal/warranty/Update';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { formattedDate } from '@/lib/utils';
import {
  approveWarranty,
  deleteWarranty,
  getWarranty,
  rejectWarranty,
} from '@/service/warranty';
import { Warranty } from '@/types/warranty';
import { Check, Loader2, Trash, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const PAGE_SIZE = 10;

const WarrantyTable = () => {
  const [warrantyList, setWarrantyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [approveId, setApproveId] = useState('');
  const [rejectId, setRejectId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getWarrantyList = useCallback(async () => {
    setIsLoading(true);
    const data = await getWarranty();

    setWarrantyList(data);
    setIsLoading(false);
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
        title: 'Berhasil delete product category',
      });
      window.location.reload();
    }
  };

  const handleApprove = async () => {
    const response = await approveWarranty(approveId);

    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: 'Berhasil approve',
        className: 'bg-green-500 text-white',
      });
      window.location.reload();
    }
  };

  const handleReject = async () => {
    const response = await rejectWarranty(rejectId);

    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: 'Berhasil Reject',
        className: 'bg-red-500 text-white',
      });
      window.location.reload();
    }
  };

  const filteredWarrantyList = warrantyList.filter((item: Warranty) =>
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNoDataMessage =
    filteredWarrantyList.length === 0 && searchTerm !== '';

  const pageCount = Math.ceil(filteredWarrantyList.length / PAGE_SIZE);

  const paginatedWarrantyList = filteredWarrantyList.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          handleApprove();
          handleDelete();
          handleReject();
        }}
      />
      <div className='container mx-auto'>
        <Input
          className='mb-4'
          placeholder='Search...'
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <div className='flex items-center justify-center mt-10'>
            <Loader2 className='animate-spin' size={50} />
          </div>
        ) : (
          <>
            <ScrollArea className='rounded-md border h-[calc(90vh-220px)] mt-7'>
              <Table>
                <TableHeader className='sticky top-0 bg-secondary'>
                  <TableRow>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Receipt Date</TableHead>
                    <TableHead>Warranty End</TableHead>
                    <TableHead> Status </TableHead>
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
                    paginatedWarrantyList.map((item: Warranty) => {
                      return (
                        <TableRow key={item._id}>
                          <TableCell> {item.serialNumber} </TableCell>
                          <TableCell> {item.product.productName} </TableCell>
                          <TableCell>
                            {formattedDate(item.receiptDate)}
                          </TableCell>

                          <TableCell>
                            {formattedDate(item.warrantyEnd)}
                          </TableCell>

                          <TableCell>
                            {item.isValid ? '🟢 Approve' : '🔴 Reject'}
                          </TableCell>

                          <TableCell>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.receipt}`}
                              alt='image receipt'
                              width={200}
                              height={200}
                              className='rounded-md'
                            />
                          </TableCell>
                          <TableCell className='flex items-center gap-1'>
                            <div className='has-tooltip'>
                              <Check
                                onClick={() => {
                                  setOpen(true);
                                  setApproveId(item._id);
                                }}
                                className={`${
                                  item.isValid === true
                                    ? 'cursor-not-allowed text-green-300 h-5'
                                    : 'text-green-500 cursor-pointer h-5'
                                }`}
                              />

                              <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-16'>
                                Approve
                              </span>
                            </div>

                            <div className='has-tooltip'>
                              <X
                                className={`${
                                  item.isValid === false
                                    ? 'cursor-not-allowed text-red-300 h-5'
                                    : 'text-red-500 cursor-pointer h-5'
                                }`}
                                onClick={() => {
                                  setOpen(true);
                                  setRejectId(item._id);
                                }}
                              />
                              <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-16'>
                                Reject
                              </span>
                            </div>

                            <ModalUpdateWarranty warrantyId={item} />

                            <div className='has-tooltip'>
                              <Trash
                                onClick={() => {
                                  setOpen(true);
                                  setDeleteId(item._id);
                                }}
                                className='text-red-500 cursor-pointer h-5'
                              />
                              <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-16'>
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

export default WarrantyTable;
