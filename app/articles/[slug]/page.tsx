import {  FullPostType } from '@/lib/interface';
import { client } from '@/sanity/lib/client';
import ArticlesDetails from '@/components/article/articaleDetails';


async function getPosts(slug: string) {
  const query = `
    *[ _type == "post" && slug.current == $slug]{
            "id": _id,
            title,
            "slug": slug.current,
            description,
            content,
            "image": mainImage.asset->url,
             categories[]->{
                  title,
                  "slug": slug.current,
              },
            "author": author->name,
            "date":  _createdAt
    }[0]
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

export const revalidate = 60

export default async function ArticalPage({ params, }: { params: Promise<{ slug: string }>; }) {
  const { slug } = await params;
  const post: FullPostType = await getPosts(slug);
  
  return (
    <ArticlesDetails post={post} />
  );
}