import { PostType } from '@/lib/interface';
import { client } from '@/sanity/lib/client';
import Slider from './slider';

async function getPosts() {
    const query = `
        *[_type == "post"]| order(_createdAt desc) [0...3]{
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

export default async function SliderList() {
    
  const posts: PostType[] = await getPosts();

  return (
    <div className='main min-h-fit md:mb-24'>
      <Slider posts={posts} />
    </div>
  )
}
