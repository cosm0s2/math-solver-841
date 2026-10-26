import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  latex: string;
  block?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ latex, block = false, className = '' }) => {
  // If string is pure natural language text without LaTeX syntax or equations
  const isPlainArabic = /[\u0600-\u06FF]/.test(latex || '') && !latex.includes('\\') && !/[=^_{}]/.test(latex || '');

  const html = useMemo(() => {
    if (!latex) return '';
    if (isPlainArabic) return '';
    try {
      // Clean leading and trailing dollar signs if present
      const cleanLatex = latex.replace(/^\${1,2}/, '').replace(/\${1,2}$/, '').trim();
      return katex.renderToString(cleanLatex, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch (err) {
      console.warn('KaTeX rendering error for:', latex, err);
      return `<span class="math-font">${latex}</span>`;
    }
  }, [latex, block, isPlainArabic]);

  if (isPlainArabic) {
    return <span className={`inline font-sans ${className}`}>{latex}</span>;
  }

  return (
    <span
      dir="ltr"
      style={{ unicodeBidi: 'isolate' }}
      className={`inline-block ${block ? 'my-2 overflow-x-auto max-w-full text-center' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
