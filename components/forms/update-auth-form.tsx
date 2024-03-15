"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { UpdateUser } from "@/types/user";
import { updateUser } from "@/service/auth";
import { toast } from "../ui/use-toast";

const UpdateForm = () => {
  const [updateProfile, setUpdateProfile] = useState<UpdateUser>({
    namaLengkap: "",
    noTelp: "",
    email: "",
    username: "",
  });

  const onSubmit = async () => {
    const data = {
      ...updateProfile,
    };

    const response = await updateUser(data);
    try {
      if (response.error) {
        toast({
          title: "Error updating",
          description: response.message,
          className: "bg-red-500",
        });
      } else {
        toast({
          title: "Successfully updated",
          className: "bg-green-500",
        });
        window.location.reload();
      }
    } catch (error: any) {
      toast({
        title: error.message,
        className: "bg-red-500",
      });
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userData = {
          namaLengkap: decodedToken.namaLengkap,
          noTelp: decodedToken.noTelp,
          email: decodedToken.email,
          username: decodedToken.username,
        };
        setUpdateProfile(userData);
      } catch (error) {
        toast({
          title: "Error decoding token",
        });
      }
    }
  }, []);

  return (
    <div className="container space-y-3">
      <div className="">
        <Label>Nama Lengkap</Label>
        <Input
          value={updateProfile.namaLengkap}
          type="text"
          onChange={(e) =>
            setUpdateProfile((prevState) => ({
              ...prevState,
              namaLengkap: e.target.value,
            }))
          }
        />
      </div>

      <div className="">
        <Label>Nomor Telepon</Label>
        <Input
          value={updateProfile.noTelp}
          type="text"
          onChange={(e) =>
            setUpdateProfile((prevState) => ({
              ...prevState,
              noTelp: e.target.value,
            }))
          }
        />
      </div>

      <div className="">
        <Label>Email</Label>
        <Input
          value={updateProfile.email}
          type="email"
          onChange={(e) =>
            setUpdateProfile((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
      </div>

      <div className="">
        <Label>Username</Label>
        <Input
          value={updateProfile.username}
          type="text"
          onChange={(e) =>
            setUpdateProfile((prevState) => ({
              ...prevState,
              username: e.target.value,
            }))
          }
        />
      </div>

      <Button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-300">
        Update
      </Button>
    </div>
  );
};

export default UpdateForm;
