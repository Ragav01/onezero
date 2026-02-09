import { PostType } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import PostCard from "../postCard";

interface Props{
    category: string
}

async function getPosts(category: string) {
  const query = `
    *[ _type == "post" && $category in categories[]->slug.current | order(_createdAt desc)]{
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
  const data = await client.fetch(query, { category });
  return data;
}

export default async function RelatedPost({ category }: Props) {
  const posts: PostType[] = await getPosts(category);

  return(
        <div className='my-26'>
            <h1 className='text-2xl md:text-4xl tracking-tight font-semibold'>Related Post</h1>
            <div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {posts.map((post) => (
                <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
  )
}