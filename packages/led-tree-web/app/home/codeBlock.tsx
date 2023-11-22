import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const SupportedLanguages = ['javascript', 'python'] as const;
export type SupportedLanguage = (typeof SupportedLanguages)[number];

const SupportedStyles = {
  dark: dark,
  docco: docco,
} as const;

export const SupportedStyleNames = Object.keys(SupportedStyles);

export type SupportedStyle = keyof typeof SupportedStyles;

const getComputedStyle = (
  style: SupportedStyle
): (typeof SupportedStyles)[SupportedStyle] => {
  if (!SupportedStyles[style]) {
    throw new Error(`Unsupported Style: ${style}`);
  }

  return SupportedStyles[style];
};

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const prepadCode = (code: string) => '';
const postpadCode = (code: string) => {
  const lines = Array.from(code.matchAll(/\n/g)).length;

  if (lines < 5) {
    return '\n'.repeat(5 - lines);
  }
  return '\n';
};
export const CodeBlock: React.FC<{
  code: string;
  language: SupportedLanguage;
  style: SupportedStyle;
}> = ({code, language, style}) => {
  const formattedCode = prepadCode(code) + code + postpadCode(code);

  return (
    <SyntaxHighlighter
      language={language as string}
      style={getComputedStyle(style)}
      showLineNumbers={true}
    >
      {formattedCode}
    </SyntaxHighlighter>
  );
};
