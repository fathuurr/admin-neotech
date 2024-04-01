/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';
import { getProduct } from '@/service/product';
import { getUser } from '@/service/user';
import { ShoppingCart, User } from 'lucide-react';

export default function page() {
  const router = useRouter();

  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);

  const productList = useCallback(async () => {
    const res = await getProduct();

    setProduct(res);
  }, []);

  const userList = useCallback(async () => {
    const res = await getUser();

    setUser(res.data.data);
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    productList();
    userList();
  }, []);

  return (
    <ScrollArea className='h-full'>
      <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Product</CardTitle>
              <ShoppingCart />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'> +{product.length} </div>
              <p className='text-xs text-muted-foreground'>Total Product</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Users</CardTitle>
              <User />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'> +{user.length} </div>
              <p className='text-xs text-muted-foreground'>Total User</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
