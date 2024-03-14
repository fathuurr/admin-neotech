export interface Product {
  _id: string;
  productNumber: string;
  productName: string;
  productSlug: string;
  productCategory: CategoryProduct;
  productDescription?: string;
  productWarranty?: number;
  serialNumber: string[];
  productImage?: string;
}

export interface CategoryProduct {
  _id?: string;
  categoryName: string;
  categorySlug?: string;
}

export interface PostDataProduct {
  productNumber: string;
  productCategory?: string;
  productName: string;
  productDescription: string;
  productWarranty: number | string;
}

export interface ComplementaryProduct {
  productID: string;
  complementaryData: ComplementaryData[];
}

interface ComplementaryData {
  serialNumber: string;
  macAddress: string;
}
