import { Code } from "bright";

export type CodeBlockProps = {
  code: string;
  language: string;
  filename: string;
};

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  return (
    <div className="max-w-[calc(100vw-2rem)] overflow-x-auto">
      <Code theme="one-dark-pro" lang={language} title={filename} lineNumbers>
        {code}
      </Code>
    </div>
  );
}
