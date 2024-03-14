import callAPI from '@/config/api';
import {
  CategoryProduct,
  ComplementaryProduct,
  PostDataProduct,
} from '@/types/product';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

// Category Product

export async function categoryProduct(data: CategoryProduct) {
  const url = `${URL}/category-product`;

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}
export async function getCategoryProduct() {
  const response = await axios.get(`${URL}/category-product`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function deleteCategoryProduct(id: string) {
  const url = `${URL}/category-product/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

export async function updateCategory(data: CategoryProduct, id: string) {
  const url = `${URL}/category-product/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true,
  });
}

// Product

export async function getProduct() {
  const response = await axios.get(`${URL}/product`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getProductById(id: string) {
  const response = await axios.get(`${URL}/product?id=${id}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function postProduct(data: PostDataProduct) {
  const url = `${URL}/product`;

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}

export async function updateProduct(data: PostDataProduct, id: string) {
  const url = `${URL}/product/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true,
  });
}

export async function deleteProduct(id: string) {
  const url = `${URL}/product/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

// Upload Photo Product

export async function uploadPhotoProduct(data: FormData, id: string) {
  const url = `${URL}/product/${id}/upload-photo`;

  return callAPI({
    url,
    method: 'POST',
    token: true,
    data,
  });
}

// Complementary Data Product

export async function getDataComplementary() {
  const response = await axios.get(`${URL}/complementary-product`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function postDataComplementary(data: ComplementaryProduct) {
  const url = `${URL}/complementary-product`;

  return callAPI({
    url,
    method: 'POST',
    token: true,
    data,
  });
}
