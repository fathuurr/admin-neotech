/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ModalAddProduct } from '@/components/modal/product/ModalAddProduct';
import ProductTable from '@/components/tables/product-tables';
import ProductIsDeleted from '@/components/tables/product-tables/productIsDeleted';
import { useSearchParams } from 'next/navigation';

const breadcrumbItems = [{ title: 'Product', link: '/dashboard/product' }];
const page = () => {
  const searchParams = useSearchParams();
  const myParam = searchParams.get('isDeleted');

  const isParamPresent = myParam !== null;

  return (
    <>
      {!isParamPresent && (
        <>
          <div className='flex-1 space-y-4  p-4 md:p-8 pt-6'>
            <BreadCrumb items={breadcrumbItems} />

            <div className='flex items-start justify-between'>
              <ModalAddProduct />
            </div>

            <ProductTable />
          </div>
        </>
      )}

      {isParamPresent && (
        <div className='mt-10'>
          <ProductIsDeleted />
        </div>
      )}
    </>
  );
};

export default page;
