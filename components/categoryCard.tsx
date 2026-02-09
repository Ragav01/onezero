import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { CategoryType } from '@/lib/interface'
import { urlFor } from '@/sanity/lib/image'

interface Props {
    category: CategoryType;
}
const CategoryCard = ({category}: Props) => {
  return (
    <>
        <Link href={`/categories/${category.slug}`} className='group col-span-1 h-64 bg-card rounded-lg overflow-hidden relative'>
            {category.image && <Image fill src={urlFor(category.image).url()} alt={category.slug} className="hidden group-hover:block absolute w-full h-full blur-sm scale-125 object-cover" />}
            <div className='absolute w-full h-full flex flex-col items-center justify-center z-10 p-6 group-hover:bg-black/30 '>
                {category.image && <Image unoptimized src={urlFor(category.image).url()} alt={category.title} width={64} height={64} className="block group-hover:hidden w-16 h-16 object-cover mx-auto rounded-lg"/>}
                <h2 className='text-lg text-center my-3 group-hover:text-white font-semibold '>{category.title}</h2>
                <p className='text-center  text-foreground-muted line-clamp-2 group-hover:text-white leading-5 '>{category.description}</p>
                <button className='text-sm md:hidden group-hover:block group-hover:text-white hover:underline underline-offset-4 mt-5  duration-300'>
                    Explore Category <ArrowRight size={16} className='inline-block ml-1'/>
                </button>
            </div>
        </Link>
    </>
  )
}

export default CategoryCard