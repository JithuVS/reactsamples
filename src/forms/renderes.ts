import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Alert,
} from '@mui/material';
import Markdown from 'markdown-to-jsx';

interface MarkdownRendererProps {
  content: string;
  title?: string;
}

// Custom components for markdown rendering
const MarkdownComponents = {
  h1: ({ children, ...props }: any) => (
    <Typography 
      variant="h2" 
      component="h1" 
      gutterBottom 
      sx={{ 
        fontWeight: 700,
        color: 'primary.main',
        borderBottom: '2px solid',
        borderColor: 'primary.light',
        pb: 1,
        mb: 3,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  h2: ({ children, ...props }: any) => (
    <Typography 
      variant="h3" 
      component="h2" 
      gutterBottom 
      sx={{ 
        fontWeight: 600,
        color: 'primary.dark',
        mt: 4,
        mb: 2,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  h3: ({ children, ...props }: any) => (
    <Typography 
      variant="h4" 
      component="h3" 
      gutterBottom 
      sx={{ 
        fontWeight: 600,
        mt: 3,
        mb: 2,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  h4: ({ children, ...props }: any) => (
    <Typography 
      variant="h5" 
      component="h4" 
      gutterBottom 
      sx={{ 
        fontWeight: 600,
        mt: 3,
        mb: 1.5,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  h5: ({ children, ...props }: any) => (
    <Typography 
      variant="h6" 
      component="h5" 
      gutterBottom 
      sx={{ 
        fontWeight: 600,
        mt: 2,
        mb: 1,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  h6: ({ children, ...props }: any) => (
    <Typography 
      variant="subtitle1" 
      component="h6" 
      gutterBottom 
      sx={{ 
        fontWeight: 600,
        mt: 2,
        mb: 1,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  p: ({ children, ...props }: any) => (
    <Typography 
      variant="body1" 
      paragraph 
      sx={{ 
        lineHeight: 1.7,
        mb: 2,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  blockquote: ({ children, ...props }: any) => (
    <Alert 
      severity="info" 
      sx={{ 
        my: 2,
        '& .MuiAlert-message': {
          fontStyle: 'italic',
        },
      }}
      {...props}
    >
      {children}
    </Alert>
  ),
  code: ({ children, className, ...props }: any) => {
    const isCodeBlock = className?.startsWith('lang-');
    
    if (isCodeBlock) {
      const language = className.replace('lang-', '');
      return (
        <Paper 
          elevation={0}
          sx={{ 
            bgcolor: 'grey.900',
            color: 'common.white',
            p: 2,
            my: 2,
            overflow: 'auto',
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Chip 
              label={language} 
              size="small" 
              variant="outlined"
              sx={{ 
                color: 'common.white',
                borderColor: 'grey.600',
                fontSize: '0.75rem',
              }}
            />
          </Box>
          <Box
            component="pre"
            sx={{
              margin: 0,
              fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            <code>{children}</code>
          </Box>
        </Paper>
      );
    }

    return (
      <Box
        component="code"
        sx={{
          backgroundColor: 'action.hover',
          color: 'error.main',
          px: 0.5,
          py: 0.25,
          borderRadius: 1,
          fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '0.875em',
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
  pre: ({ children, ...props }: any) => (
    <Paper 
      elevation={0}
      sx={{ 
        bgcolor: 'grey.50',
        p: 2,
        my: 2,
        overflow: 'auto',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
      {...props}
    >
      <Box
        component="pre"
        sx={{
          margin: 0,
          fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '0.875rem',
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {children}
      </Box>
    </Paper>
  ),
  ul: ({ children, ...props }: any) => (
    <Box 
      component="ul" 
      sx={{ 
        my: 1,
        pl: 3,
        '& li': {
          mb: 0.5,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  ),
  ol: ({ children, ...props }: any) => (
    <Box 
      component="ol" 
      sx={{ 
        my: 1,
        pl: 3,
        '& li': {
          mb: 0.5,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  ),
  li: ({ children, ...props }: any) => (
    <Typography 
      component="li" 
      variant="body1"
      sx={{ 
        lineHeight: 1.6,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  table: ({ children, ...props }: any) => (
    <Paper 
      elevation={0}
      sx={{ 
        width: '100%',
        overflow: 'auto',
        my: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': {
            borderBottom: '1px solid',
            borderColor: 'divider',
            p: 1.5,
            textAlign: 'left',
          },
          '& th': {
            backgroundColor: 'action.hover',
            fontWeight: 600,
          },
        }}
        {...props}
      >
        {children}
      </Box>
    </Paper>
  ),
  img: ({ src, alt, ...props }: any) => (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 2,
        boxShadow: 1,
        my: 2,
      }}
      {...props}
    />
  ),
  a: ({ children, href, ...props }: any) => (
    <Typography
      component="a"
      href={href}
      sx={{
        color: 'primary.main',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  hr: ({ ...props }: any) => (
    <Box
      component="hr"
      sx={{
        border: 'none',
        height: '1px',
        backgroundColor: 'divider',
        my: 4,
      }}
      {...props}
    />
  ),
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, title }) => {
  return (
    <Box
      component="article"
      sx={{
        maxWidth: '100%',
        '& video, & audio': {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 2,
          my: 2,
        },
        '& iframe': {
          maxWidth: '100%',
          borderRadius: 2,
        },
      }}
    >
      {title && (
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'primary.main',
            mb: 4,
            pb: 2,
            borderBottom: '3px solid',
            borderColor: 'primary.main',
          }}
        >
          {title}
        </Typography>
      )}
      <Markdown options={{ overrides: MarkdownComponents }}>
        {content}
      </Markdown>
    </Box>
  );
};

export default MarkdownRenderer;
