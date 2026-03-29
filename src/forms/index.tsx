import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  KeyboardArrowUp,
  DarkMode,
  LightMode,
} from '@mui/icons-material';

import Navigation from './components/Navigation';
import MarkdownRenderer from './components/MarkdownRenderer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useMarkdownFiles } from './hooks/useMarkdownFiles';
import { getFileTitle } from './utils/fileUtils';

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const {
    files,
    selectedFile,
    fileContent,
    loading,
    contentLoading,
    error,
    selectFile,
  } = useMarkdownFiles();

  // Create theme
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
        light: '#7986cb',
        dark: '#303f9f',
      },
      secondary: {
        main: '#f50057',
        light: '#ff5983',
        dark: '#c51162',
      },
      background: {
        default: isDarkMode ? '#121212' : '#fafafa',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  // Handle scroll events for scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleNavigation = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingSpinner message="Loading documentation..." />
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorMessage message={error} />
      </ThemeProvider>
    );
  }

  const drawerWidth = isNavCollapsed ? 0 : 320;
  const currentFileTitle = selectedFile ? getFileTitle(selectedFile) : 'Documentation';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Navigation */}
        <Navigation
          files={files}
          selectedFile={selectedFile}
          onFileSelect={selectFile}
          isCollapsed={isNavCollapsed}
          onToggle={toggleNavigation}
        />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: { sm: isNavCollapsed ? 0 : `${drawerWidth}px` },
            minWidth: 0,
          }}
        >
          {/* App Bar */}
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              backgroundColor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="toggle navigation"
                onClick={toggleNavigation}
                edge="start"
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, fontWeight: 600 }}
              >
                {currentFileTitle}
              </Typography>
              <Tooltip title={isDarkMode ? 'Light mode' : 'Dark mode'}>
                <IconButton
                  color="inherit"
                  onClick={toggleDarkMode}
                  aria-label="toggle dark mode"
                >
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>

          {/* Content */}
          <Container
            maxWidth="lg"
            sx={{
              py: { xs: 2, sm: 4 },
              px: { xs: 2, sm: 3 },
            }}
          >
            {contentLoading ? (
              <LoadingSpinner message="Loading content..." />
            ) : fileContent ? (
              <MarkdownRenderer
                content={fileContent}
                title={currentFileTitle}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Select a file from the navigation to get started
                </Typography>
              </Box>
            )}
          </Container>
        </Box>

        {/* Scroll to top button */}
        {showScrollTop && (
          <Fab
            color="primary"
            size="small"
            aria-label="scroll back to top"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
