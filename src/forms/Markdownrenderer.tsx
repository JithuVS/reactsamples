import React from 'react';
import Markdown from 'markdown-to-jsx';
import { ContentCopy, Check, OpenInNew } from '@mui/icons-material';
import '../styles/MarkdownRenderer.scss';

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const language = className?.replace('lang-', '') || 'text';

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="language-label">{language}</span>
        <button onClick={handleCopy} className="copy-button">
          {copied ? <Check className="copy-icon" /> : <ContentCopy className="copy-icon" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="code-content">
        <code>{children}</code>
      </pre>
    </div>
  );
};

const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="inline-code">{children}</code>
);

const CustomLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const isExternal = href.startsWith('http');
  
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
      {isExternal && <OpenInNew className="external-link-icon" />}
    </a>
  );
};

const CustomBlockquote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <blockquote>{children}</blockquote>
);

const CustomTable: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="table-container">
    <table>{children}</table>
  </div>
);

const CustomTh: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th>{children}</th>
);

const CustomTd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td>{children}</td>
);

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const options = {
    overrides: {
      h1: {
        component: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
      },
      h2: {
        component: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
      },
      h3: {
        component: ({ children }: { children: React.ReactNode }) => <h3>{children}</h3>,
      },
      h4: {
        component: ({ children }: { children: React.ReactNode }) => <h4>{children}</h4>,
      },
      h5: {
        component: ({ children }: { children: React.ReactNode }) => <h5>{children}</h5>,
      },
      h6: {
        component: ({ children }: { children: React.ReactNode }) => <h6>{children}</h6>,
      },
      p: {
        component: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
      },
      pre: {
        component: CodeBlock,
      },
      code: {
        component: ({ children, className }: { children: React.ReactNode; className?: string }) => {
          if (className) {
            return <code className={className}>{children}</code>;
          }
          return <InlineCode>{children}</InlineCode>;
        },
      },
      a: {
        component: CustomLink,
      },
      blockquote: {
        component: CustomBlockquote,
      },
      ul: {
        component: ({ children }: { children: React.ReactNode }) => <ul>{children}</ul>,
      },
      ol: {
        component: ({ children }: { children: React.ReactNode }) => <ol>{children}</ol>,
      },
      li: {
        component: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
      },
      table: {
        component: CustomTable,
      },
      th: {
        component: CustomTh,
      },
      td: {
        component: CustomTd,
      },
      img: {
        component: ({ src, alt }: { src: string; alt: string }) => (
          <img src={src} alt={alt} />
        ),
      },
      hr: {
        component: () => <hr />,
      },
    },
  };

  return (
    <div className="markdown-renderer">
      <Markdown options={options}>{content}</Markdown>
    </div>
  );
};

export default MarkdownRenderer;
