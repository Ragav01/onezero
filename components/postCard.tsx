'use client'
import React from 'react'
import { PostType } from '@/lib/interface'
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Props {
    post: PostType;
}
const PostCard = ({ post }: Props) => {
    function formatDate(dateStr?: string | null) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return (
        <>
         <Link href={`/articles/${post.slug}`} className='group hover:no-underline col-span-1 bg-card h-fit rounded-md'>
             <div className='w-full h-48 overflow-hidden rounded-md relative'>
                 <div className='absolute left-2 top-2  z-10 px-2 py-1 bg-white rounded-sm'>
                     <p className='text-xs uppercase font-semibold tracking-wide'>{post.categories?.[0]?.title ?? ''}</p>
                 </div>
                 {post.image && <Image loading='lazy' quality={50}  src={urlFor(post.image).url()} alt={post.title} fill className='w-full h-full object-cover group-hover:scale-110 transition-all duration-300' />}
            </div>
             <div className='space-y-2 md:space-y-3 p-4'>
                 <p className='text-xs md:text-xs uppercase font-medium text-foreground-muted'>{formatDate(post.date)} / post by <span className='text-foreground'>{post.author}</span></p>
                 <div className='space-y-3 md:space-y-2'>
                    <h2 className='text-lg font-semibold line-clamp-2 leading-5 mt-2'>{post.title}</h2>
                    <p className='text-sm text-foreground-muted line-clamp-2 leading-tight'>{post.description}</p>
                 </div>
             </div>
         </Link>
        </>
    )
}

export default PostCard