"use client";

import { useEffect, useState } from "react";
import { updateUserBySuperAdmin } from "@/service/user";
import { User } from "@/types/user";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/forms/input/PasswordInput";
import { Label } from "@/components/ui/label";

export function ModalUpdateUser({ userId }: any) {
  const { toast } = useToast();

  const [updateUser, setUpdateUser] = useState<User>({
    namaLengkap: "",
    noTelp: "",
    email: "",
    username: "",
    role: "",
    password: "",
    retype_password: "",
  });
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (userId) {
      setUpdateUser(userId);
    }
  }, [userId]);

  const onSubmit = async () => {
    try {
      setUpdateUser((prevState) => ({
        ...prevState,
        password,
        retype_password: retypePassword,
      }));

      const response = await updateUserBySuperAdmin(updateUser, userId._id);
      if (response.error) {
        toast({
          title: "Error updating user",
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="cursor-pointer mr-2 text-orange-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Click save when youre done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <Label>Nama Lengkap</Label>
          <Input
            type="text"
            value={updateUser.namaLengkap}
            onChange={(e) =>
              setUpdateUser((prevState) => ({
                ...prevState,
                namaLengkap: e.target.value,
              }))
            }
            placeholder="Nama Lengkap"
          />

          <Label>No Telepon</Label>
          <Input
            type="text"
            value={updateUser.noTelp}
            onChange={(e) =>
              setUpdateUser((prevState) => ({
                ...prevState,
                noTelp: e.target.value,
              }))
            }
            placeholder="No Telepon"
          />

          <Label>Email</Label>
          <Input
            type="email"
            value={updateUser.email}
            onChange={(e) =>
              setUpdateUser((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            placeholder="Email"
          />

          <Label>Role</Label>
          <Select
            value={updateUser.role}
            onValueChange={(value) =>
              setUpdateUser((prevState) => ({
                ...prevState,
                role: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superAdmin">Super Admin</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label>Username</Label>
          <Input
            type="text"
            value={updateUser.username}
            onChange={(e) =>
              setUpdateUser((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
            placeholder="Username"
          />

          <Label>Password</Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <Label>Confirm Password</Label>
          <PasswordInput
            id="confirm_password"
            value={retypePassword}
            onChange={(e) => {
              setRetypePassword(e.target.value);
              if (e.target.value !== password) {
                setPasswordError("Password confirmation does not match.");
              } else {
                setPasswordError("");
              }
            }}
            autoComplete="new-password"
          />
          <p className="text-red-500">{passwordError}</p>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
