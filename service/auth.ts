import callAPI from "@/config/api";
import { AuthLoginTypes } from "@/types/auth";
import { User } from "@/types/user";

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
