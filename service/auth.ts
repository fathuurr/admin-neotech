import callAPI from "@/config/api";
import { AuthLoginTypes } from "@/types/auth";
import { ChangePassword, UpdateUser, User } from "@/types/user";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function authLogin(data: AuthLoginTypes) {
  const url = `${URL}/auth/login`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function authRegisterUser(data: User) {
  const url = `${URL}/auth/register`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function changePassword(data: ChangePassword) {
  const url = `${URL}/auth/change-password`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}

export async function updateUser(data: UpdateUser) {
  const url = `${URL}/auth/update`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}
