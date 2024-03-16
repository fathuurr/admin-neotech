import callAPI from "@/config/api";
import { UpdateWarranty } from "@/types/warranty";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getWarranty() {
  const response = await axios.get(`${URL}/warranty-product`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function deleteWarranty(id: string) {
  const url = `${URL}/warranty-product/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    token: true,
  });
}

export async function updateWarranty(data: UpdateWarranty, id: string) {
  const url = `${URL}/warranty-product/${id}`;

  return callAPI({
    url,
    method: "PUT",
    token: true,
    data,
  });
}
