import React from 'react'
import FileX from '@/app/assets/doc-x.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='h-screen max-w-xl mx-auto flex flex-col items-center gap-6 text-center px-4 md:px-0'>
      <div className='mt-40 p-4 bg-card rounded-md'>
        <Image src={FileX} alt="404 Not Found" width={48} height={48} />
      </div>
      <h2 className='text-3xl font-semibold'>Oops! We lost this page</h2>
      <p>The page you&apos;re looking for couldn&apos;t be found. It may have been moved, renamed, or no longer exists. Try searching to find what you&apos;re looking for.</p>
      <Button size={'lg'} asChild>
        <Link href={'/blog'}>
          <ArrowLeft />
          Back to homepage
        </Link>
      </Button>
    </div>
  )
}
