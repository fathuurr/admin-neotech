/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProductById } from "@/service/product";
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
        console.log("Error fetching product detail:", error);
      }
    };

    fetchProductDetail();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ScrollText className="cursor-pointer mr-2 text-emerald-500" />
      </DialogTrigger>
      <DialogContent className="min-w-[50%]">
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

                    <Trash2 className="text-red-500 mt-5" size={20} />
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
