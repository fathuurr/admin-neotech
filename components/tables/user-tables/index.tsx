"use client";
import { deleteUser, getUser } from "@/service/user";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { AlertModal } from "@/components/modal/alert-modal";
import { toast } from "@/components/ui/use-toast";
import { ModalUpdateUser } from "@/components/modal/user/UpdateUser";

interface UserTypes {
  _id: string;
  namaLengkap: string;
  noTelp: string;
  email: string;
  username: string;
  role: string;
}

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const fetchDataUser = useCallback(async () => {
    const res = await getUser();
    setUsers(res.data.data);
  }, []);

  useEffect(() => {
    fetchDataUser();
  }, [fetchDataUser]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user: any) =>
    ["username", "email", "namaLengkap"].some((field: any) =>
      user[field].toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const handleDelete = async () => {
    const response = await deleteUser(deleteId);

    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: "Berhasil delete user",
      });
      window.location.reload();
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="container mx-auto">
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>No Telepon</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: UserTypes) => (
              <TableRow key={user._id}>
                <TableCell>{user.namaLengkap}</TableCell>
                <TableCell>{user.noTelp}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex items-center">
                  <ModalUpdateUser userId={user} />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Trash2
                          onClick={() => {
                            setOpen(true);
                            setDeleteId(user._id);
                          }}
                          className="text-red-500 cursor-pointer"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete User</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserTable;
