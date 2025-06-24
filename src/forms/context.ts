import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface NavigationContextType {
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const { category, topic } = useParams();

  // Auto-expand the section containing the current topic
  useEffect(() => {
    if (category && topic) {
      // Import navigation structure to find which section contains the current topic
      import('../data/navigationData').then(({ navigationStructure }) => {
        const currentCategory = navigationStructure.find(cat => cat.id === category);
        if (currentCategory) {
          const sectionWithTopic = currentCategory.sections.find(section =>
            section.items.some(item => item.id === topic)
          );
          if (sectionWithTopic) {
            setExpandedSections(prev => ({
              ...prev,
              [sectionWithTopic.id]: true
            }));
          }
        }
      });
    }
  }, [category, topic]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <NavigationContext.Provider value={{ expandedSections, toggleSection }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
