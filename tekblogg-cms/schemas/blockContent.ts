import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      type: 'code',
      name: 'code',
      title: 'Code Block',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Javascript', value: 'javascript' },
          { title: 'Typescript', value: 'typescript' },
          { title: 'JSX', value: 'jsx' },
          { title: 'TSX', value: 'tsx' },
          { title: 'Python', value: 'python' },
          { title: 'Shell', value: 'sh' },
        ],
      },
    })
  ],
});
