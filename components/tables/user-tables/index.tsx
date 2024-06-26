'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { deleteUser, getUser } from '@/service/user';

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Ban, Loader2, Trash2 } from 'lucide-react';
import { AlertModal } from '@/components/modal/alert-modal';
import { toast } from '@/components/ui/use-toast';
import { ModalUpdateUser } from '@/components/modal/user/UpdateUser';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface UserTypes {
  _id: string;
  namaLengkap: string;
  noTelp: string;
  email: string;
  username: string;
  role: string;
}

const PAGE_SIZE = 10;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  const fetchDataUser = useCallback(async () => {
    setIsLoading(true);
    const res = await getUser();
    setUsers(res.data.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDataUser();
  }, [fetchDataUser]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const loggedInUserId = {
        id: decodedToken.id,
      };
      setLoggedInUserId(loggedInUserId.id);
    }
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user: any) =>
    ['username', 'email', 'namaLengkap'].some((field: any) =>
      user[field].toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pageCount = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUserList = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const showNoDataMessage = filteredUsers.length === 0 && searchTerm !== '';

  const handleDelete = async () => {
    const response = await deleteUser(deleteId);

    if (response.error) {
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: 'Berhasil delete user',
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
      <div className='container mx-auto'>
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search by username...'
        />

        {isLoading ? (
          <div className='flex items-center justify-center mt-10'>
            <Loader2 className='animate-spin' size={50} />
          </div>
        ) : (
          <>
            <ScrollArea className='rounded-md border h-[calc(80vh-220px)] mt-7'>
              <Table>
                <TableHeader className='sticky top-0 bg-secondary'>
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
                  {showNoDataMessage ? (
                    <TableRow>
                      <TableCell>No Data</TableCell>
                    </TableRow>
                  ) : (
                    paginatedUserList.map((user: UserTypes) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.namaLengkap}</TableCell>
                        <TableCell>{user.noTelp}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className='flex items-center'>
                          {loggedInUserId === user._id ? (
                            <Ban />
                          ) : (
                            <>
                              <ModalUpdateUser userId={user} />
                              <div className='has-tooltip'>
                                <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-black text-xs -mt-12'>
                                  Delete User
                                </span>
                                <Trash2
                                  onClick={() => {
                                    setOpen(true);
                                    setDeleteId(user._id);
                                  }}
                                  className='text-red-500 cursor-pointer'
                                />
                              </div>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>

            <Pagination className='flex justify-end mt-4'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`${
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />
                </PaginationItem>
                <PaginationItem>
                  {Array.from({ length: pageCount }, (_, i) => (
                    <>
                      {(i === 0 ||
                        i === pageCount - 1 ||
                        (i >= currentPage - 2 && i <= currentPage + 1)) && (
                        <PaginationLink
                          key={i}
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </PaginationLink>
                      )}

                      {i === currentPage - 3 &&
                        i !== 0 &&
                        i !== pageCount - 3 && (
                          <span className='mx-1'>...</span>
                        )}
                    </>
                  ))}
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    className={`${
                      currentPage === pageCount
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </>
  );
};

export default UserTable;
