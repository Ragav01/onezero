import { Rule } from "sanity"

const post = {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'content',
            title: 'Content',   
            type: 'array',
            of: [{type: 'block'},{type: 'image'},{type: 'code'}],
        },
        {
            name: 'categories', 
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'categories'}]}],
            validation: (Rule: Rule) => Rule.required().min(1).max(1),
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{type: 'author'}],
            validation: (Rule: Rule) => Rule.required(),    
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            validation: (Rule: Rule) => Rule.required(),
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
}

export default post