import callAPI from "@/config/api";
import { User } from "@/types/user";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUser() {
  const url = `${URL}/users`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function deleteUser(id: string) {
  const url = `${URL}/super-admin/delete-user/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    token: true,
  });
}

export async function updateUserBySuperAdmin(data: User, id: string) {
  const url = `${URL}/super-admin/update-user/${id}`;

  return callAPI({
    url,
    method: "PUT",
    token: true,
    data,
  });
}
