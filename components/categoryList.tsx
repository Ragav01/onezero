import React from 'react'
import {client} from '@/sanity/lib/client'
import CategoryCard from '@/components/categoryCard'
import { CategoryType } from '@/lib/interface'


async function getCategories() {
    const query = `
        *[_type == "categories"] {
        _id,
        title,
        "slug": slug.current,
        description,
        "image": image.asset->url
    }
    `;
    const data = await client.fetch(query);
    return data;
}

export const revalidate = 60

export default async function CategoryList() {
  const category: CategoryType[] = await getCategories();
  return (
    <div className='my-26'>
      <h1 className='text-2xl md:text-4xl tracking-tight font-semibold'>Browse by topic</h1>
      <div className='my-4 md:my-8 grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
        {category.map((cat, idx) => (
          <CategoryCard key={idx} category={cat} />
        ))}
      </div>
    </div>
  )
}
