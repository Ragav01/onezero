import { Rule } from "sanity"

const author = {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        }
    ],
};

export default author;