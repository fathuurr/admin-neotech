import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Loader2, ScrollText, Trash2 } from 'lucide-react';
import { AlertModal } from '@/components/modal/alert-modal';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProduct, deleteProduct } from '@/service/product';
import { Product } from '@/types/product';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ModalUpdateProduct } from '@/components/modal/product/ModalUpdateProduct';

const PAGE_SIZE = 10; // Adjust the number of items per page here

const ProductTable = () => {
  const { toast } = useToast();
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const getProductList = useCallback(async () => {
    setIsLoading(true);
    const data = await getProduct();
    setProductList(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  const filteredProductList = productList.filter((item: Product) =>
    new RegExp(searchTerm, 'i').test(
      item.productName + item.productNumber + item.serialNumber
    )
  );

  const handleDelete = async () => {
    const response = await deleteProduct(deleteId);
    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: 'Berhasil delete product',
      });
      window.location.reload();
    }
  };

  const pageCount = Math.ceil(filteredProductList.length / PAGE_SIZE);

  const paginatedProductList = filteredProductList.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const showNoDataMessage =
    filteredProductList.length === 0 && searchTerm !== '';

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
      <div className='container mx-auto pt-8'>
        <Input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {showNoDataMessage ? (
                    <TableRow>
                      <TableCell>No Data</TableCell>
                    </TableRow>
                  ) : (
                    paginatedProductList.map((item: Product) => (
                      <TableRow key={item._id}>
                        <TableCell className='font-medium'>
                          {item.productNumber}
                        </TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>
                          {item.productCategory.categoryName}
                        </TableCell>
                        <TableCell className='flex items-center'>
                          <div className='has-tooltip'>
                            <ScrollText
                              className='cursor-pointer mr-2 text-emerald-500'
                              onClick={() =>
                                push(`/dashboard/product/${item._id}`)
                              }
                            />
                            <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-18'>
                              Detail
                            </span>
                          </div>

                          {/* <ModalUploadPhoto product={item} /> */}
                          <ModalUpdateProduct product={item} />

                          <div className='has-tooltip'>
                            <Trash2
                              className='cursor-pointer text-red-500'
                              onClick={() => {
                                setOpen(true);
                                setDeleteId(item._id);
                              }}
                            />
                            <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-18'>
                              Delete
                            </span>
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

export default ProductTable;
