"use client"
import { PostType } from '@/lib/interface';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay'
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { useRef } from 'react';

interface Props {
    posts: PostType[];
}

const Slider = ({ posts }: Props) => {
    function formatDate(dateStr?: string | null) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }))


    return (
        <>
            <Carousel className="w-full max-w-7xl"
                plugins={[plugin.current]}
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {posts.map((post) => {
                        return (
                            <CarouselItem key={post.id}>
                                <Link href={`/articles/${post.slug}`} className="block group h-90 md:h-110 p-3 md:p-5 relative w-full bg-card rounded-lg overflow-hidden">
                                    {
                                        post.image ? <Image loading='lazy' src={urlFor(post.image).url()} alt={post.title} fill className="object-cover group-hover:scale-115 duration-500" />
                                            : <div className='w-full h-full bg-foreground/5' />
                                    }
                                    <div className='absolute z-10 px-3 py-1.5 bg-white rounded-sm'>
                                        <p className='text-xs uppercase font-medium tracking-wide'>{post.categories[0].title}</p>
                                    </div>
                                    <span className='absolute top-0 inset-0  bg-linear-to-b from-black/0 via-black/20 to-black/80'></span>
                                    <div className='absolute z-10 bottom-3 group-hover:md:bottom-4  max-w-lg space-y-2'>
                                        <p className='uppercase text-white font-normal tracking-wider text-xs'>
                                            {formatDate(post.date)} / {post.author}
                                        </p>
                                        <h2 className='text-lg md:text-2xl leading-5 md:leading-8 font-semibold text-white'>{post.title}</h2>
                                        <p className='hidden md:group-hover:block text-white leading-5  line-clamp-2'>{post.description}</p>
                                    </div>
                                </Link>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>

            <div className='my-6 grid md:grid-cols-3 gap-4'>
                {posts.map((post, index) => {
                    return (
                        <Link href={`/articles/${post.slug}`} key={index} className='col-span-1 group flex items-center rounded-lg relative w-full hover:no-underline'>
                            <div className='w-30 h-20 md:w-50 md:h-24 relative overflow-hidden rounded-lg'>
                                {post.image && <Image loading='lazy' quality={50} src={urlFor(post.image).url()} alt={post.slug} fill className="w-full h-full object-cover group-hover:scale-110 group-hover:-rotate-6 duration-300" />}
                            </div>

                            <div className='space-y-2 px-3 md:px-4 w-full'>
                                <p className='text-[10px]  md:text-xs uppercase font-medium text-foreground-muted'>{formatDate(post.date)} / {post.author}</p>
                                <p className='text-sm md:text-lg font-semibold md:leading-6 line-clamp-2'>{post.title}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
export default Slider


