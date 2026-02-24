'use client'

import React, { useState } from 'react'
import PostCard from '@/components/postCard'
import { Button } from '@/components/ui/button'
import { CategoryType, PostType } from '@/lib/interface'

type Props = {
  categories: CategoryType[]
  posts: PostType[]
}

export default function Articles({ categories, posts }: Props) {
  const [selected, setSelected] = useState<string>('all')

  const filteredPosts =
    selected === 'all'
      ? posts
      : posts.filter(post =>
          post.categories?.some(cat => cat.slug === selected)
        )

  return (
    <div className="main my-10">
      <h1 className="text-2xl md:text-4xl tracking-tight font-semibold">
        Articles
      </h1>

      <div className='flex flex-col md:flex-row gap-8'>
        {/* Buttons */}
        <div className="my-8 md:w-2/12 flex flex-wrap md:flex-col gap-2">
          <Button
            size="lg"
            variant={selected === 'all' ? 'default' : 'outline'}
            className='md:px-3 justify-start truncate w-full'
            onClick={() => setSelected('all')}
          >
            <p className='truncate font-medium uppercase'>All articles</p>
          </Button>

          {categories.map(cat => (
            <Button
              key={cat.id}
              size="lg"
              variant={selected === cat.slug ? 'default' : 'outline'}
              className='md:px-3 justify-start w-full'
              onClick={() => setSelected(cat.slug)}
            >
              <p className='truncate font-medium uppercase'>{cat.title}</p>
            </Button>
          ))}
        </div>
        {/* Posts */}
        <div className="pt-8 md:w-10/12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {filteredPosts.map(post => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </div>
  )
}