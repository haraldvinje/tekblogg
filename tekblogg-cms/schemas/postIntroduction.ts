import { defineField, defineType } from "sanity";

export default defineType({
  name: "postIntroduction",
  title: "Introduction",
  type: "array",
  of: [
    defineField({
      name: "body",
      title: "Body",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
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
      validation: (Rule) => Rule.required(),
    }),
  ],
});
