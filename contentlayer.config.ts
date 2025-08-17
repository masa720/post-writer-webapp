import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true
    },
    publish: {
      type: 'boolean',
      required: true
    },
    image: {
      type: 'string',
      required: false
    },
    authors: {
      type: 'list',
      of: { type: 'string' },
      required: false
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
});