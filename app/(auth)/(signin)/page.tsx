import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function AuthenticationPage() {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 hidden top-4 md:right-8 md:top-8'
        )}>
        Login
      </Link>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-blue-700' />
        <div className='relative z-20 flex items-center text-2xl font-medium'>
          <Cpu className='mr-2' size={50} />
          Neotech
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-xl'>PT. Neotech Multi Creasindo</p>
          </blockquote>
        </div>
      </div>
      <div className='p-4 lg:p-8 h-full flex items-center'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
            <p className='text-sm text-muted-foreground'>
              Please enter your username below to sign in to your account
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
