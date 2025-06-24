import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import { navigationStructure } from '../data/navigationData';

const DRAWER_WIDTH = 296;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { category, topic } = useParams();
  const { expandedSections, toggleSection } = useNavigation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerStyles = {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
      position: 'relative',
      height: 'calc(100vh - 64px)',
      top: 0,
      border: 'none',
      borderRight: '1px solid #d1d9e0',
      backgroundColor: '#ffffff',
    },
  };

  const headerContainerStyles = {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '100%',
    backgroundColor: '#f6f8fa',
  };

  const headerTitleStyles = {
    fontWeight: 600,
    color: '#1f2328',
    fontSize: '1.125rem',
    lineHeight: 1.3,
  };

  const headerDescriptionStyles = {
    color: '#656d76',
    marginTop: theme.spacing(1),
    fontSize: '0.875rem',
    lineHeight: 1.4,
  };

  const sectionButtonStyles = {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minHeight: 44,
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
  };

  const sectionContentStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    flex: 1,
  };

  const sectionTitleStyles = {
    fontWeight: 600,
    color: '#1f2328',
    fontSize: '0.875rem',
    lineHeight: 1.4,
  };

  const handleNavigation = (path: string) => {
    navigate(`/docs${path}`);
  };

  const renderNavigationItems = () => {
    const currentCategory = navigationStructure.find(cat => cat.id === category);
    if (!currentCategory) return null;

    return (
      <List component="nav" sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItem sx={{ padding: 0, backgroundColor: '#f6f8fa' }}>
          <Box sx={headerContainerStyles}>
            <Typography variant="h6" sx={headerTitleStyles}>
              {currentCategory.title}
            </Typography>
            {currentCategory.description && (
              <Typography variant="body2" sx={headerDescriptionStyles}>
                {currentCategory.description}
              </Typography>
            )}
          </Box>
        </ListItem>
        <Divider />
        
        {currentCategory.sections.map((section) => (
          <Box key={section.id}>
            <ListItemButton
              onClick={() => toggleSection(section.id)}
              sx={sectionButtonStyles}
            >
              <Box sx={sectionContentStyles}>
                {expandedSections[section.id] ? (
                  <ExpandMore sx={{ fontSize: 16, color: '#656d76' }} />
                ) : (
                  <ChevronRight sx={{ fontSize: 16, color: '#656d76' }} />
                )}
                <Typography variant="body2" sx={sectionTitleStyles}>
                  {section.title}
                </Typography>
              </Box>
            </ListItemButton>
            
            <Collapse in={expandedSections[section.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {section.items.map((item) => {
                  const isActive = topic === item.id;
                  const itemButtonStyles = {
                    paddingLeft: theme.spacing(5.5),
                    paddingRight: theme.spacing(3),
                    paddingTop: theme.spacing(1.5),
                    paddingBottom: theme.spacing(1.5),
                    minHeight: 40,
                    backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                    borderRight: isActive ? '2px solid #0969da' : 'none',
                    '&:hover': {
                      backgroundColor: isActive ? '#e3f2fd' : '#f6f8fa',
                    },
                  };

                  const itemTextStyles = {
                    color: isActive ? '#0969da' : '#1f2328',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.875rem',
                    lineHeight: 1.4,
                  };

                  return (
                    <ListItemButton
                      key={item.id}
                      onClick={() => handleNavigation(`/${category}/${item.id}`)}
                      sx={itemButtonStyles}
                    >
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: itemTextStyles,
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    );
  };

  if (isMobile) {
    return null;
  }

  return (
    <Drawer variant="permanent" sx={drawerStyles}>
      {renderNavigationItems()}
    </Drawer>
  );
};

export default Sidebar;
