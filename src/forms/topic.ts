import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
  Paper,
  Fade,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { navigationStructure } from '../data/navigationData';
import { getMarkdownContent } from '../utils/markdownLoader';

const TopicPage: React.FC = () => {
  const { category, topic } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentCategory = navigationStructure.find(cat => cat.id === category);
  const currentTopic = currentCategory?.sections
    .flatMap(section => section.items)
    .find(item => item.id === topic);

  const containerStyles = {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
  };

  const breadcrumbStyles = {
    marginBottom: 4,
  };

  const breadcrumbLinkStyles = (isLast: boolean) => ({
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: isLast ? 500 : 400,
    color: isLast ? '#1f2328' : '#0969da',
    '&:hover': {
      textDecoration: isLast ? 'none' : 'underline',
    },
  });

  const paperStyles = {
    flex: 1,
    padding: 6,
    backgroundColor: '#ffffff',
    border: '1px solid #d1d9e0',
    borderRadius: '8px',
    minHeight: '70vh',
  };

  const loadingContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  };

  const errorContainerStyles = {
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  };

  const errorTextStyles = {
    fontSize: '1.125rem',
    fontWeight: 500,
  };

  const markdownStyles = {
    '& h1': {
      fontSize: '2.25rem',
      fontWeight: 600,
      color: '#1f2328',
      marginBottom: 3,
      paddingBottom: 3,
      borderBottom: '1px solid #d1d9e0',
      lineHeight: 1.25,
    },
    '& h2': {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1f2328',
      marginTop: 5,
      marginBottom: 3,
      lineHeight: 1.25,
    },
    '& h3': {
      fontSize: '1.375rem',
      fontWeight: 600,
      color: '#1f2328',
      marginTop: 4,
      marginBottom: 2,
      lineHeight: 1.25,
    },
    '& h4': {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1f2328',
      marginTop: 3,
      marginBottom: 2,
      lineHeight: 1.25,
    },
    '& p': {
      color: '#1f2328',
      lineHeight: 1.6,
      marginBottom: 3,
      fontSize: '1rem',
    },
    '& ul, & ol': {
      color: '#1f2328',
      paddingLeft: 4,
      marginBottom: 3,
      lineHeight: 1.6,
    },
    '& li': {
      marginBottom: 1,
    },
    '& li > ul, & li > ol': {
      marginTop: 1,
      marginBottom: 1,
    },
    '& code': {
      backgroundColor: '#f6f8fa',
      padding: '2px 6px',
      borderRadius: '6px',
      fontSize: '0.875rem',
      border: '1px solid #d1d9e0',
      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    },
    '& pre': {
      backgroundColor: '#f6f8fa',
      border: '1px solid #d1d9e0',
      borderRadius: '8px',
      padding: 3,
      overflow: 'auto',
      marginBottom: 3,
      fontSize: '0.875rem',
      lineHeight: 1.45,
      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
      '& code': {
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        fontSize: 'inherit',
      },
    },
    '& blockquote': {
      borderLeft: '4px solid #d1d9e0',
      paddingLeft: 3,
      marginLeft: 0,
      color: '#656d76',
      marginBottom: 3,
      backgroundColor: '#f6f8fa',
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: '0 6px 6px 0',
    },
    '& a': {
      color: '#0969da',
      textDecoration: 'none',
      fontWeight: 500,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: 3,
      border: '1px solid #d1d9e0',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    '& th, & td': {
      border: '1px solid #d1d9e0',
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '0.875rem',
    },
    '& th': {
      backgroundColor: '#f6f8fa',
      fontWeight: 600,
      color: '#1f2328',
    },
    '& td': {
      backgroundColor: '#ffffff',
    },
    '& hr': {
      border: 'none',
      borderTop: '1px solid #d1d9e0',
      marginTop: 4,
      marginBottom: 4,
    },
    '& strong': {
      fontWeight: 600,
      color: '#1f2328',
    },
    '& em': {
      fontStyle: 'italic',
    },
  };

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const markdownContent = await getMarkdownContent(category!, topic);
        setContent(markdownContent);
      } catch (err) {
        setError('Failed to load content');
        console.error('Error loading markdown:', err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      loadContent();
    }
  }, [category, topic, currentCategory]);

  const breadcrumbs = [
    { label: 'GitHub Docs', href: '/' },
    { label: currentCategory?.title || category, href: `/docs/${category}` },
  ];

  if (topic && currentTopic) {
    breadcrumbs.push({ label: currentTopic.title, href: `/docs/${category}/${topic}` });
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={containerStyles}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<ChevronRight sx={{ fontSize: 14, color: '#656d76' }} />}
          sx={breadcrumbStyles}
        >
          {breadcrumbs.map((crumb, index) => (
            <Link
              key={index}
              color={index === breadcrumbs.length - 1 ? 'text.primary' : 'primary'}
              href={crumb.href}
              onClick={(e) => {
                e.preventDefault();
                navigate(crumb.href);
              }}
              sx={breadcrumbLinkStyles(index === breadcrumbs.length - 1)}
            >
              {crumb.label}
            </Link>
          ))}
        </Breadcrumbs>

        {/* Content */}
        <Paper elevation={0} sx={paperStyles}>
          {loading ? (
            <Box sx={loadingContainerStyles}>
              <CircularProgress size={32} sx={{ color: '#0969da' }} />
            </Box>
          ) : error ? (
            <Box sx={errorContainerStyles}>
              <Typography color="error" sx={errorTextStyles}>
                {error}
              </Typography>
            </Box>
          ) : (
            <Fade in={!loading} timeout={300}>
              <Box sx={markdownStyles}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </Box>
            </Fade>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default TopicPage;
