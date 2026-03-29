import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Divider,
  Alert,
  Chip,
  useTheme
} from '@mui/material';
import { 
  PlayArrow, 
  VolumeUp, 
  Code as CodeIcon,
  Info,
  Warning,
  Error as ErrorIcon,
  CheckCircle
} from '@mui/icons-material';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const theme = useTheme();

  const components = {
    // Headers
    h1: ({ children, ...props }: any) => (
      <Typography 
        variant="h1" 
        component="h1" 
        sx={{ 
          marginBottom: 3,
          paddingBottom: 2,
          borderBottom: `2px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </Typography>
    ),
    h2: ({ children, ...props }: any) => (
      <Typography 
        variant="h2" 
        component="h2" 
        sx={{ 
          marginTop: 4,
          marginBottom: 2,
          color: theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </Typography>
    ),
    h3: ({ children, ...props }: any) => (
      <Typography 
        variant="h3" 
        component="h3" 
        sx={{ 
          marginTop: 3,
          marginBottom: 2,
          color: theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </Typography>
    ),
    h4: ({ children, ...props }: any) => (
      <Typography 
        variant="h4" 
        component="h4" 
        sx={{ 
          marginTop: 2,
          marginBottom: 1.5,
          color: theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </Typography>
    ),

    // Paragraphs
    p: ({ children, ...props }: any) => (
      <Typography 
        variant="body1" 
        component="p" 
        sx={{ 
          marginBottom: 2,
          lineHeight: 1.7,
          color: theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </Typography>
    ),

    // Lists
    ul: ({ children, ...props }: any) => (
      <Box 
        component="ul" 
        sx={{ 
          paddingLeft: 3,
          marginBottom: 2,
          '& li': {
            marginBottom: 0.5,
            color: theme.palette.text.primary,
          }
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
          paddingLeft: 3,
          marginBottom: 2,
          '& li': {
            marginBottom: 0.5,
            color: theme.palette.text.primary,
          }
        }}
        {...props}
      >
        {children}
      </Box>
    ),

    // Code blocks
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <Chip
            label={children}
            size="small"
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
              color: theme.palette.primary.main,
              fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: '0.85em',
              height: 'auto',
              '& .MuiChip-label': {
                padding: '2px 6px',
              }
            }}
          />
        );
      }

      return (
        <Paper
          elevation={1}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            marginBottom: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#e9ecef',
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CodeIcon sx={{ fontSize: 16, marginRight: 1, color: theme.palette.text.secondary }} />
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {className?.replace('language-', '') || 'code'}
            </Typography>
          </Box>
          <Box
            component="pre"
            sx={{
              padding: 2,
              margin: 0,
              overflow: 'auto',
              fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              color: theme.palette.text.primary,
            }}
            {...props}
          >
            <code>{children}</code>
          </Box>
        </Paper>
      );
    },

    // Tables
    table: ({ children, ...props }: any) => (
      <TableContainer 
        component={Paper} 
        elevation={1}
        sx={{ 
          marginBottom: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
        {...props}
      >
        <Table size="small">
          {children}
        </Table>
      </TableContainer>
    ),
    thead: ({ children, ...props }: any) => (
      <TableHead {...props}>
        {children}
      </TableHead>
    ),
    tbody: ({ children, ...props }: any) => (
      <TableBody {...props}>
        {children}
      </TableBody>
    ),
    tr: ({ children, ...props }: any) => (
      <TableRow {...props}>
        {children}
      </TableRow>
    ),
    th: ({ children, ...props }: any) => (
      <TableCell 
        component="th" 
        sx={{ 
          fontWeight: 600,
          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f8f9fa',
          color: theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </TableCell>
    ),
    td: ({ children, ...props }: any) => (
      <TableCell 
        sx={{ 
          color: theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </TableCell>
    ),

    // Blockquotes
    blockquote: ({ children, ...props }: any) => (
      <Alert 
        severity="info"
        icon={<Info />}
        sx={{ 
          marginBottom: 2,
          '& .MuiAlert-message': {
            color: theme.palette.text.primary,
          }
        }}
        {...props}
      >
        {children}
      </Alert>
    ),

    // Horizontal rule
    hr: ({ ...props }: any) => (
      <Divider sx={{ marginY: 3 }} {...props} />
    ),

    // Links
    a: ({ children, href, ...props }: any) => (
      <Typography
        component="a"
        href={href}
        sx={{
          color: theme.palette.primary.main,
          textDecoration: 'none',
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'underline',
          }
        }}
        {...props}
      >
        {children}
      </Typography>
    ),

    // Images
    img: ({ src, alt, ...props }: any) => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 2,
        }}
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 2,
            boxShadow: theme.shadows[2],
          }}
          {...props}
        />
      </Box>
    ),

    // Video
    video: ({ src, ...props }: any) => (
      <Paper
        elevation={2}
        sx={{
          marginBottom: 2,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#e9ecef',
          }}
        >
          <PlayArrow sx={{ fontSize: 16, marginRight: 1, color: theme.palette.text.secondary }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Video Content
          </Typography>
        </Box>
        <Box
          component="video"
          controls
          sx={{
            width: '100%',
            height: 'auto',
          }}
          {...props}
        >
          <source src={src} />
          Your browser does not support the video tag.
        </Box>
      </Paper>
    ),

    // Audio
    audio: ({ src, ...props }: any) => (
      <Paper
        elevation={1}
        sx={{
          marginBottom: 2,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#e9ecef',
          }}
        >
          <VolumeUp sx={{ fontSize: 16, marginRight: 1, color: theme.palette.text.secondary }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Audio Content
          </Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box
            component="audio"
            controls
            sx={{
              width: '100%',
            }}
            {...props}
          >
            <source src={src} />
            Your browser does not support the audio tag.
          </Box>
        </Box>
      </Paper>
    ),
  };

  return (
    <Box
      sx={{
        '& > *:first-of-type': {
          marginTop: 0,
        },
        '& > *:last-child': {
          marginBottom: 0,
        },
      }}
    >
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
