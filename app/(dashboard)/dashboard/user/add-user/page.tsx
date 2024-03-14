"use client";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/forms/input/PasswordInput";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { authRegisterUser } from "@/service/auth";

const breadcrumbItems = [
  { title: "User", link: "/dashboard/user" },
  { title: "Create", link: "/dashboard/user/create" },
];

const AddUser = () => {
  const router = useRouter();

  const [addUser, setAddUser] = useState<User>({
    namaLengkap: "",
    noTelp: "",
    email: "",
    role: "superAdmin",
    username: "",
    password: "",
    retype_password: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async () => {
    if (addUser.password !== addUser.retype_password) {
      toast({
        title: "Password confirmation does not match.",
        className: "bg-red-500",
      });
      return;
    }

    const data = {
      ...addUser,
    };

    if (!addUser) {
      toast({
        title: "Please complete the form",
        className: "bg-red-500",
      });
    } else {
      const response = await authRegisterUser(data);
      if (response.error) {
        toast({
          title: response.message,
          className: "bg-red-500",
        });
      } else {
        toast({
          title: "Succressfully register user",
          className: "bg-green-500",
        });

        router.push("/dashboard/user");
      }
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <Heading title={"Create User"} description={"Add a new user"} />
        </div>
        <Separator />
        <div className="grid grid-rows-3 md:grid-cols-3 gap-4">
          <div>
            <Label>Nama Lengkap</Label>
            <Input
              type="text"
              value={addUser.namaLengkap}
              onChange={(e) =>
                setAddUser({ ...addUser, namaLengkap: e.target.value })
              }
            />
          </div>

          <div>
            <Label>No Telepon</Label>
            <Input
              type="text"
              value={addUser.noTelp}
              onChange={(e) =>
                setAddUser({ ...addUser, noTelp: e.target.value })
              }
            />
          </div>

          <div>
            <Label> Email </Label>
            <Input
              type="email"
              placeholder="example@mail.com"
              value={addUser.email}
              onChange={(e) =>
                setAddUser({ ...addUser, email: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Role</Label>

            <Select
              value={addUser.role}
              onValueChange={(value) => setAddUser({ ...addUser, role: value })}
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
          </div>

          <div>
            <Label> Username </Label>
            <Input
              type="text"
              value={addUser.username}
              onChange={(e) =>
                setAddUser({ ...addUser, username: e.target.value })
              }
            />
          </div>

          <div>
            <Label> Password </Label>
            <PasswordInput
              id="password"
              value={addUser.password}
              onChange={(e) =>
                setAddUser({ ...addUser, password: e.target.value })
              }
              autoComplete="new-password"
            />
          </div>

          <div>
            <Label> Confirm Password </Label>
            <PasswordInput
              id="confirm_password"
              value={addUser.retype_password}
              onChange={(e) => {
                setAddUser({ ...addUser, retype_password: e.target.value });
                if (e.target.value !== addUser.password) {
                  setPasswordError("Password confirmation does not match.");
                } else {
                  setPasswordError("");
                }
              }}
              autoComplete="new-password"
            />
            <div className="text-red-500">{passwordError}</div>
          </div>
        </div>
        <Button onClick={onSubmit} variant={"outline"}>
          Save
        </Button>
      </div>
    </ScrollArea>
  );
};

export default AddUser;
