import { Rule } from "sanity"

const categories = {
    name: 'categories',
    title: 'Categories',
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
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: (Rule: Rule) => Rule.required(),
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
}

export default categories