import { CategoryProduct } from './product';

export interface Warranty {
  _id: string;
  isValid: boolean;
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
  phoneNumber: string;
  email: string;
  serialNumber: string;
  receiptDate: string;
}
