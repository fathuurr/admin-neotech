/* eslint-disable @next/next/no-img-element */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { deletePhotoProduct, getProductById } from "@/service/product";
import { Product } from "@/types/product";
import { ScrollText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const ModalDetailProduct = ({ product }: any) => {
  const [productDetail, setProductDetail] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductById(product);
        setProductDetail(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error fetching product detail:", error);
      }
    };

    fetchProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePhoto = async (path: string) => {
    try {
      const requestBody = {
        path: path,
      };

      const res = await deletePhotoProduct(
        productDetail?._id || "",
        requestBody,
      );

      if (res) {
        const updatedProductDetail = await getProductById(
          productDetail?._id || "",
        );
        setProductDetail(updatedProductDetail);
      } else {
        toast({
          title: "Failed to delete photo",
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="has-tooltip">
          <ScrollText className="cursor-pointer mr-2 text-emerald-500" />
          <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-12">
            Detail
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[50%] overflow-y-scroll max-h-[700px]">
        <DialogHeader>
          <DialogTitle>{productDetail?.productName}</DialogTitle>
          <DialogDescription>
            {productDetail?.productCategory.categoryName}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-3">
          <span className="font-semibold">Description :</span>
          <p>{productDetail?.productDescription}</p>

          <span className="font-semibold">Warranty :</span>
          <p>{productDetail?.productWarranty}</p>

          <span className="font-semibold">Serial Number :</span>
          <p>{productDetail?.serialNumber.join(", ")}</p>

          <span className="font-semibold mb-2">Product Image :</span>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-10">
            {Array.isArray(productDetail?.productImage) &&
              productDetail?.productImage.map(
                (imageUrl: string, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`}
                      className="h-auto max-w-full rounded-lg"
                      alt="Product Image"
                      loading="lazy"
                    />

                    <Trash2
                      onClick={() => {
                        deletePhoto(imageUrl);
                      }}
                      className="text-red-500 mt-5 cursor-pointer "
                      size={20}
                    />
                  </div>
                ),
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetailProduct;
