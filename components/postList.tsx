import { PostType } from '@/lib/interface';
import { client } from '@/sanity/lib/client';
import React from 'react'
import PostCard from './postCard';

async function getPosts() {
    const query = `
        *[_type == "post"]| order(_createdAt desc) [0...6]{
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
    const data = await client.fetch(query);
    return data;
}
export default async function PostList() {
    const posts: PostType[] = await getPosts();
  return (
    <div className='my-20 space-y-6'>
            <h1 className='text-3xl tracking-tight font-semibold'>Latest posts</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map((post, idx) => (
                <PostCard post={post} key={idx} />
            ))}
        </div>
    </div>
  )
}
