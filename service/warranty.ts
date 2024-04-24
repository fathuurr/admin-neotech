import callAPI from '@/config/api';
import { UpdateWarranty } from '@/types/warranty';

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getWarranty() {
  const url = `${URL}/warranty-product`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function deleteWarranty(id: string) {
  const url = `${URL}/warranty-product/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

export async function updateWarranty(data: UpdateWarranty, id: string) {
  const url = `${URL}/warranty-product/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    token: true,
    data,
  });
}

export async function approveWarranty(id: string) {
  const url = `${URL}/warranty-product/${id}/approve`;

  return callAPI({
    url,
    method: 'PUT',
    token: true,
  });
}
export async function rejectWarranty(id: string) {
  const url = `${URL}/warranty-product/${id}/reject`;

  return callAPI({
    url,
    method: 'PUT',
    token: true,
  });
}
