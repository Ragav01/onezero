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

      {/* Buttons */}
      <div className="my-8 flex flex-wrap gap-2">
        <Button
          size="lg"
          variant={selected === 'all' ? 'default' : 'outline'}
          onClick={() => setSelected('all')}
        >
          All articles
        </Button>

        {categories.map(cat => (
          <Button
            key={cat.id}
            size="lg"
            variant={selected === cat.slug ? 'default' : 'outline'}
            onClick={() => setSelected(cat.slug)}
          >
            {cat.title}
          </Button>
        ))}
      </div>

      {/* Posts */}
      <div className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <PostCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  )
}