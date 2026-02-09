import PostCard from '@/components/postCard';
import { CategoryType, PostType } from '@/lib/interface';
import { client } from '@/sanity/lib/client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


async function getCategory(slug: string) {
  const query = `
    *[ _type == "categories" && slug.current == $slug]{
      title,
      description,
    }
  `;
  const catdata = await client.fetch(query, { slug });
  return catdata;
}
async function getPosts(slug: string) {
  const query = `
    *[ _type == "post" && $slug in categories[]->slug.current] | order(_createdAt desc){
            "id": _id,
            title,
            "slug": slug.current,
            description,
            "image": mainImage.asset->url,
            categories[]->{
                title,
                "slug": slug.current,
            },
            "author": author->name,
            "date":  _createdAt
    }
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

export const revalidate = 60


export default async function CategoryPage({ params, }: { params: Promise<{ slug: string }>; }) {
  const { slug } = await params;
  const posts: PostType[] = await getPosts(slug);
  const category: CategoryType[] = await getCategory(slug)

  return (
    <div className='main'>
      <div className='my-6 flex gap-1 items-center capitalize [&_p]:text-sm [&_a]:text-sm [&_a]:font-body [&_a]:font-medium'>
        <Link href={'/'}>Home</Link>
        <ChevronRight size={14} className='opacity-45'/>
        <Link href={'/categories'}>Category</Link>
        <ChevronRight size={14} className='opacity-45'/>
        <p className='text-foreground-muted'>{slug}</p>
      </div>

      <div className='md:w-1/3 space-y-2'>
        <h1 className='text-2xl md:text-4xl tracking-tight font-semibold'>{category[0].title}</h1>
        <p>Explore strategies, leadership skills, and growth tactics for thriving businesses.</p>
      </div>

      <div className='my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>

    </div>
  );
}