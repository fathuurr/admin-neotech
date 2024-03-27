/* eslint-disable @next/next/no-img-element */
'use client';
import BreadCrumb from '@/components/breadcrumb';
import ModalUploadPhoto from '@/components/modal/product/ModalUploadPhoto';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/modal/alert-modal';
import { Trash2 } from 'lucide-react';

import { deletePhotoProduct, getProductById } from '@/service/product';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

const ProductById = ({ params }: { params: { id: string } }) => {
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [deleteImage, setDeleteImage] = useState<string>(''); // State to store the image to be deleted
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // State to control modal visibility

  const breadcrumbItems = [
    { title: 'Product', link: '/dashboard/product' },
    { title: 'Product Detail', link: `/dashboard/product/${params.id}` },
  ];

  const fetchProductDetail = async () => {
    try {
      const data = await getProductById(params.id);
      setProductDetail(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error fetching product detail:', error);
    }
  };

  const deletePhoto = async (path: string) => {
    try {
      // Set the image path to be deleted
      setDeleteImage(path);
      // Show confirmation modal
      setShowConfirmation(true);
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      const requestBody = {
        path: deleteImage,
      };

      const res = await deletePhotoProduct(
        productDetail?._id || '',
        requestBody
      );

      if (res) {
        const updatedProductDetail = await getProductById(
          productDetail?._id || ''
        );
        setProductDetail(updatedProductDetail);
      } else {
        toast({
          title: 'Failed to delete photo',
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    } finally {
      // Close confirmation modal after deletion
      setShowConfirmation(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AlertModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleDeleteConfirmation}
      />

      <ScrollArea className='h-full'>
        <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
          <BreadCrumb items={breadcrumbItems} />
          <Heading
            title={productDetail?.productName}
            description={`Category: ${productDetail?.productCategory.categoryName}`}
          />

          <div className='mt-5'>
            <span className='font-semibold'>Description :</span>
            <p>{productDetail?.productDescription}</p>

            <div className='mt-5'>
              <span className='font-semibold'>Warranty :</span>
              <p>{productDetail?.productWarranty} Months </p>
            </div>

            <div className='mt-5'>
              <span className='font-semibold'>Serial Number :</span>
              <p>{productDetail?.serialNumber.join(', ')}</p>
            </div>

            <div className='mt-5'>
              <span className='font-semibold mb-2'>Product Image :</span>
              <div className='mt-2 grid grid-cols-2 md:grid-cols-5 gap-10'>
                {Array.isArray(productDetail?.productImage) &&
                  productDetail?.productImage.map(
                    (imageUrl: string, index: number) => (
                      <div key={index} className='relative'>
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`}
                          className='h-auto max-w-full rounded-lg'
                          alt='Product Image'
                          loading='lazy'
                        />

                        <Trash2
                          onClick={() => {
                            deletePhoto(imageUrl);
                          }}
                          className='text-red-500 mt-5 cursor-pointer '
                          size={20}
                        />
                      </div>
                    )
                  )}
              </div>
            </div>

            <ModalUploadPhoto product={params.id} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default ProductById;
