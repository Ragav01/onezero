import { CategoryType, PostType } from '@/lib/interface';
import { client } from '@/sanity/lib/client';
import Article from '@/components/article/article';
import React from 'react'

async function getCategories() {
    const query = `
        *[_type == "categories"] {
        "id": _id,
        title,
        "slug": slug.current,
        description,
        "image": image.asset->url
    }
    `;
    const catdata = await client.fetch(query);
    return catdata;
}
async function getPosts() {
    const query = `
        *[_type == "post"] | order(_createdAt desc) {
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

export const revalidate = 60

export default async function Articles() {
    const category: CategoryType[] = await getCategories();
    const posts: PostType[] = await getPosts();

    return (
        <Article categories={category} posts={posts}/>
    )
}
