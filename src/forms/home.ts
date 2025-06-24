import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import { 
  ArrowForward, 
  MenuBook, 
  Code, 
  Group, 
  FlashOn, 
  Security, 
  Language 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const heroSectionStyles = {
    backgroundColor: '#f6f8fa',
    borderBottom: '1px solid #d1d9e0',
    paddingTop: 8,
    paddingBottom: 8,
  };

  const heroContentStyles = {
    textAlign: 'center',
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const heroTitleStyles = {
    fontSize: { xs: '2.5rem', md: '3.5rem' },
    fontWeight: 600,
    color: '#1f2328',
    marginBottom: 3,
    lineHeight: 1.2,
  };

  const heroSubtitleStyles = {
    color: '#656d76',
    fontWeight: 400,
    marginBottom: 5,
    lineHeight: 1.5,
    fontSize: { xs: '1.125rem', md: '1.25rem' },
  };

  const heroButtonStyles = {
    backgroundColor: '#0969da',
    '&:hover': {
      backgroundColor: '#0860ca',
    },
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: '1.125rem',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: '6px',
    boxShadow: '0 1px 0 rgba(27,31,36,0.04), inset 0 1px 0 rgba(255,255,255,0.25)',
  };

  const sectionTitleStyles = {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: '#1f2328',
    marginBottom: 2,
  };

  const sectionSubtitleStyles = {
    color: '#656d76',
    fontSize: '1.125rem',
  };

  const cardStyles = {
    height: '100%',
    border: '1px solid #d1d9e0',
    borderRadius: '12px',
    boxShadow: 'none',
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#0969da',
      boxShadow: '0 8px 24px rgba(140,149,159,0.2)',
      transform: 'translateY(-2px)',
    },
  };

  const cardActionStyles = {
    height: '100%',
    padding: 0,
    borderRadius: '12px',
  };

  const cardContentStyles = {
    padding: 4,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const featuredChipStyles = {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#dbeafe',
    color: '#0969da',
    fontSize: '0.75rem',
    fontWeight: 500,
    height: '24px',
  };

  const cardHeaderStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 3,
    marginBottom: 3,
  };

  const iconContainerStyles = {
    marginTop: 0.5,
    flexShrink: 0,
  };

  const cardTitleStyles = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1f2328',
    marginBottom: 2,
    lineHeight: 1.3,
  };

  const cardDescriptionStyles = {
    color: '#656d76',
    lineHeight: 1.6,
    fontSize: '1rem',
  };

  const cardFooterStyles = {
    marginTop: 'auto',
  };

  const popularLabelStyles = {
    color: '#656d76',
    fontSize: '0.875rem',
    marginBottom: 1.5,
    fontWeight: 500,
  };

  const popularItemsStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
  };

  const popularItemStyles = {
    color: '#0969da',
    fontSize: '0.875rem',
    fontWeight: 400,
    '&:not(:last-child)::after': {
      content: '"•"',
      marginLeft: 0.75,
      marginRight: 0.75,
      color: '#656d76',
    },
  };

  const allTopicsSectionStyles = {
    marginTop: 8,
    textAlign: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#f6f8fa',
    borderRadius: '12px',
  };

  const allTopicsTitleStyles = {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#1f2328',
    marginBottom: 2,
  };

  const allTopicsSubtitleStyles = {
    color: '#656d76',
    marginBottom: 4,
    fontSize: '1.125rem',
  };

  const allTopicsButtonStyles = {
    borderColor: '#0969da',
    color: '#0969da',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 1.5,
    paddingBottom: 1.5,
    fontSize: '1rem',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: '#f6f8fa',
      borderColor: '#0860ca',
    },
  };

  const topicsData = [
    {
      id: 'get-started',
      title: 'Get started',
      description: 'New to GitHub? Learn the basics with our quickstart guide.',
      icon: <FlashOn sx={{ fontSize: 24, color: '#0969da' }} />,
      items: ['Quickstart', 'Hello World', 'GitHub flow', 'Create a repo'],
      featured: true,
    },
    {
      id: 'repositories',
      title: 'Repositories',
      description: 'Learn how to use Git and GitHub to manage your code.',
      icon: <MenuBook sx={{ fontSize: 24, color: '#0969da' }} />,
      items: ['About repositories', 'Creating a repository', 'Repository permissions', 'Managing files'],
    },
    {
      id: 'pull-requests',
      title: 'Pull requests',
      description: 'Collaborate on GitHub by creating and reviewing pull requests.',
      icon: <Code sx={{ fontSize: 24, color: '#0969da' }} />,
      items: ['About pull requests', 'Creating a pull request', 'Reviewing changes', 'Merging pull requests'],
    },
    {
      id: 'issues',
      title: 'Issues',
      description: 'Track bugs, feature requests, and other project work.',
      icon: <Group sx={{ fontSize: 24, color: '#0969da' }} />,
      items: ['About issues', 'Creating an issue', 'Issue templates', 'Labels and milestones'],
    },
    {
      id: 'actions',
      title: 'GitHub Actions',
      description: 'Automate your workflow with GitHub Actions.',
      icon: <Language sx={{ fontSize: 24, color: '#0969da' }} />,
      items: ['Understanding GitHub Actions', 'Workflows', 'Events', 'Jobs and steps'],
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Keep your code and data secure on GitHub.',
      icon: <Security sx={{ fontSize: 24, color: '#0969da' }} />,
      items: ['Security overview', 'Code scanning', 'Dependency alerts', 'Secret scanning'],
    },
  ];

  const handleTopicClick = (topicId: string) => {
    navigate(`/docs/${topicId}`);
  };

  return (
    <Box sx={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <Box sx={heroSectionStyles}>
        <Container maxWidth="lg">
          <Box sx={heroContentStyles}>
            <Typography variant="h1" sx={heroTitleStyles}>
              GitHub Docs
            </Typography>
            <Typography variant="h5" sx={heroSubtitleStyles}>
              Help for wherever you are on your GitHub journey.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
              onClick={() => handleTopicClick('get-started')}
              sx={heroButtonStyles}
            >
              Get started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Topics Section */}
      <Container maxWidth="lg" sx={{ paddingTop: 8, paddingBottom: 8 }}>
        <Box sx={{ marginBottom: 6 }}>
          <Typography variant="h2" sx={sectionTitleStyles}>
            Popular topics
          </Typography>
          <Typography variant="body1" sx={sectionSubtitleStyles}>
            Browse our most popular documentation
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {topicsData.map((topic) => (
            <Grid item xs={12} md={6} key={topic.id}>
              <Card sx={cardStyles}>
                <CardActionArea onClick={() => handleTopicClick(topic.id)} sx={cardActionStyles}>
                  <CardContent sx={cardContentStyles}>
                    {topic.featured && (
                      <Chip label="Featured" size="small" sx={featuredChipStyles} />
                    )}
                    
                    <Box sx={cardHeaderStyles}>
                      <Box sx={iconContainerStyles}>{topic.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h3" sx={cardTitleStyles}>
                          {topic.title}
                        </Typography>
                        <Typography variant="body2" sx={cardDescriptionStyles}>
                          {topic.description}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={cardFooterStyles}>
                      <Typography variant="body2" sx={popularLabelStyles}>
                        Popular in this topic:
                      </Typography>
                      <Box sx={popularItemsStyles}>
                        {topic.items.slice(0, 3).map((item, index) => (
                          <Typography key={index} variant="body2" sx={popularItemStyles}>
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* All topics section */}
        <Box sx={allTopicsSectionStyles}>
          <Typography variant="h3" sx={allTopicsTitleStyles}>
            Explore all topics
          </Typography>
          <Typography variant="body1" sx={allTopicsSubtitleStyles}>
            Browse the complete GitHub documentation library
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={() => handleTopicClick('get-started')}
            sx={allTopicsButtonStyles}
          >
            Browse all topics
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
