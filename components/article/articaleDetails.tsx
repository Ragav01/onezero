import { FullPostType } from '@/lib/interface';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import RelatedPost from './relatedPost';

interface Props {
    post: FullPostType;
}

export default function ArticlesDetails({ post }: Props) {
    const cleanedSlug = post.slug?.replace(/-/g, ' ');
    function formatDate(dateStr?: string | null) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return (
        <div className="main mb-10">

            {/* Breadcrumb */}
            <div className="md:w-8/12">
                <div className="my-6 flex gap-1 items-center capitalize [&_p]:text-sm [&_a]:text-sm [&_a]:font-body [&_a]:font-medium">
                    <Link href="/">Home</Link>
                    <ChevronRight className="md:h-4 md:w-4 opacity-45" />
                    <Link href="/articles">Articles</Link>
                    <ChevronRight className="md:h-4 md:w-4 opacity-45" />
                    <p className="text-foreground-muted truncate">{cleanedSlug}</p>
                </div>

                {/* Title */}
                <div className="space-y-6">
                    <h1 className="text-[30px] md:text-[42px] leading-9 md:leading-12 font-semibold tracking-tight">
                        {post.title}
                    </h1>

                    <p>{post.description}</p>
                    <p>{post.author}</p>
                </div>
            </div>

            {/* Featured Image */}
            {post.image && (
                <div className="my-6 md:my-16 relative w-full h-96 md:h-130 overflow-hidden rounded-lg">
                    <Image
                        src={urlFor(post.image).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className='grid md:grid-cols-12 gap-10 md:gap-24'>
                <div className='md:col-span-8 '>
                    {/* Meta */}
                    <div className="mb-6 md:mb-12 flex flex-wrap items-center gap-4">
                        {post.categories?.[0] && (
                            <Button size="sm">{post.categories[0].title}</Button>
                        )}
                        <div className="flex items-center gap-2">
                            <CalendarDays size={18} className="text-foreground-muted" />
                            <p className='text-sm font-medium'>{formatDate(post.date)}</p>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="prose prose-md font-body min-w-full">
                        <PortableText value={post.content} components={PortableTextComponents} />
                    </div>
                </div>

                <div className='md:col-span-4 space-y-6 relative'>
                    {/* About */}
                    <div className='sticky top-5 p-5 bg-card space-y-6 rounded-md'>
                        <p className='text-sm uppercase font-semibold tracking-wider text-foreground-muted'>About</p>
                        <Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/logo.svg" alt="Logo" width={100} height={30} />
                        <p>Delivering independent journalism, thought-provoking insights, and trustworthy reporting to keep you informed, inspired, and engaged with the world every day.</p>
                        <div className="flex gap-2">
                            <Link href="#"><Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/X.svg" alt="X" width={24} height={24} /></Link>
                            <Link href="#"><Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/instagram.svg" alt="Instagram" width={24} height={24} /></Link>
                            <Link href="#"><Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/facebook.svg" alt="Facebook" width={24} height={24} /></Link>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedPost category={post.categories[0].slug} />
        </div>
    );
}


export const PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null;

            return (
                <div className="my-6 md:my-16 relative w-full h-96 md:h-100 overflow-hidden rounded-t-md bg-red-300">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || "Post image"}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        },

        code: ({ value }: any) => {
            return (
                <div>
                    <pre className="bg-zinc-900 text-white p-4 rounded-lg max-w-72 sm:max-w-full overflow-auto my-6 ">
                        <code className=''>{value.code}</code>
                    </pre>ergy that looks productive but isn’t.
                </div>
            );
        },
    },
}