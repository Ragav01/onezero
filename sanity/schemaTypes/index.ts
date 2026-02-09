import { type SchemaTypeDefinition } from 'sanity'
import categories from './categories'
import post from './post'
import author from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categories,post,author],
}
