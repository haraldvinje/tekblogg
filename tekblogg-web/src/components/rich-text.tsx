import type { ReactNode } from "react";
import { PortableText } from "@portabletext/react";
import type { BlockContent, BlockContentImage } from "@/types/sanity.types";
import { SanityImage } from "@/components/sanity-image";
import { CodeBlock, CodeBlockProps } from "@/components/code-block";

type SanityLink = {
  value?: {
    href: string;
    _type: string;
    _key: string;
  };
  children: ReactNode;
};

const ptComponents = {
  types: {
    image: ({ value }: { value: BlockContentImage }) => {
      const { title, alt } = value;
      return (
        <SanityImage
          image={value}
          title={title ?? "Artikkelbilde"}
          alt={alt ?? "Artikkelbilde"}
        />
      );
    },
    code: ({ value }: { value: CodeBlockProps }) => {
      return (
        <CodeBlock
          code={value.code}
          language={value.language}
          filename={value.filename}
        />
      );
    },
  },
  marks: {
    code: ({ text }: { text: string }) => (
      <code className="rounded-md border-gray-100 bg-slate-800 p-1 text-amber-600 before:content-none after:content-none">
        {text}
      </code>
    ),
    link: ({ value, children }: SanityLink) => {
      return (
        <a href={value?.href ?? ""} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
  },
};

export const RichText = ({
  value,
  className,
}: {
  value: BlockContent;
  className?: string;
}) => {
  return (
    <div className={className}>
      <PortableText value={value} components={ptComponents} />
    </div>
  );
};
