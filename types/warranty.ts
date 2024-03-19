import { CategoryProduct } from './product';

export interface Warranty {
  _id: string;
  serialNumber: string;
  product: {
    productName: string;
  };
  warranty: number;
  receipt?: string;
  receiptDate: string;
  warrantyEnd: string;
}

export interface UpdateWarranty {
  serialNumber: string;
  receiptDate: string;
}
