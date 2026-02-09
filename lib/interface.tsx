import { Any } from "next-sanity";

export interface CategoryType {
    id:string,
    title: string;
    slug: string;
    description: string;
    image?: string;
}

export interface PostType {
    id: string
    title: string;
    slug: string;
    description: string;
    content?: string;
    categories: CategoryType[];
    publishedAt: string;
    author: string;
    date: string;
    image?: string;
}

export interface FullPostType {
    id: string
    title: string;
    slug: string;
    description: string;
    content?: Any;
    categories: CategoryType[];
    publishedAt: string;
    author: string;
    date: string;
    image?: string;
}