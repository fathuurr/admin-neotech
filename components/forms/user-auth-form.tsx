"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Cookies from "js-cookie";
import { authLogin } from "@/service/auth";
import { toast } from "../ui/use-toast";
import { PasswordInput } from "./input/PasswordInput";

export default function UserAuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const nextPage = useCallback(async () => {
    router.push("/dashboard");
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    if (!username || !password) {
      toast({
        title: "Please fill your username and password",
        className: "bg-red-500",
      });
    } else {
      const response = await authLogin(data);
      if (response.error) {
        alert(response.message);
      } else {
        toast({
          title: "Success",
          className: "bg-green-500",
        });

        const { accessToken } = response.data;

        Cookies.set("token", accessToken, {
          expires: 1,
        });

        nextPage();
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-2 w-full">
        <Input
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <PasswordInput
          value={password}
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="ml-auto w-full" type="submit">
          Continue
        </Button>
      </form>
    </>
  );
}
