"use client";

import { useState } from "react";

import { PasswordInput } from "./input/PasswordInput";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ChangePassword } from "@/types/user";
import { changePassword } from "@/service/auth";
import { toast } from "../ui/use-toast";

const UpdatePassword = () => {
  const [updatePassword, setUpdatePassword] = useState<ChangePassword>({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async () => {
    const data = {
      ...updatePassword,
    };

    const response = await changePassword(data);

    try {
      if (response.error) {
        toast({
          title: "Error change password",
          description: response.message,
          className: "bg-red-500",
        });
      } else {
        toast({
          title: "Successfully change password",
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
    <div className="space-y-4">
      <div className="">
        <Label>Old Password</Label>
        <PasswordInput
          id="password"
          value={updatePassword.oldPassword}
          onChange={(e) =>
            setUpdatePassword({
              ...updatePassword,
              oldPassword: e.target.value,
            })
          }
        />
      </div>

      <div className="">
        <Label>New Password</Label>
        <PasswordInput
          id="password"
          value={updatePassword.newPassword}
          onChange={(e) =>
            setUpdatePassword({
              ...updatePassword,
              newPassword: e.target.value,
            })
          }
        />
      </div>

      <div className="">
        <Label>Confirm Password</Label>
        <PasswordInput
          id="confirm_password"
          value={updatePassword.retypePassword}
          onChange={(e) => {
            setUpdatePassword({
              ...updatePassword,
              retypePassword: e.target.value,
            });
            if (e.target.value !== updatePassword.newPassword) {
              setPasswordError("Password confirmation does not match.");
            } else {
              setPasswordError("");
            }
          }}
        />
        <div className="text-red-500">{passwordError}</div>
      </div>

      <Button className="bg-green-600 hover:bg-green-400" onClick={onSubmit}>
        Change
      </Button>
    </div>
  );
};

export default UpdatePassword;
