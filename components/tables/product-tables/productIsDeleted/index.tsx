'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { getProductIsDeleted, restoreData } from '@/service/product';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const ProductIsDeleted: React.FC = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [restoreId, setRestoreId] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getProductIsDeleted();

    setData(res);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProductList = data.filter((item: Product) =>
    [item.productName, item.productNumber].some((prop) =>
      prop.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const showNoDataMessage =
    filteredProductList.length === 0 && searchTerm !== '';

  const handleRestore = async () => {
    const response = await restoreData(restoreId);
    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: 'Successfully restored',
        className: 'bg-green-500',
      });
      window.location.href = '/dashboard/product';
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleRestore}
      />
      <div className='container mx-auto'>
        <Input
          placeholder='Search by product name and product number...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <div className='flex items-center justify-center mt-10'>
            <Loader2 className='animate-spin' size={50} />
          </div>
        ) : (
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
                  filteredProductList.map((item: Product) => (
                    <TableRow key={item._id}>
                      <TableCell className='font-medium'>
                        {item.productNumber}
                      </TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.productCategory.categoryName}</TableCell>
                      <TableCell className='flex items-center'>
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setRestoreId(item._id);
                          }}
                          className='bg-orange-500'>
                          Restore
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </div>
    </>
  );
};

export default ProductIsDeleted;
