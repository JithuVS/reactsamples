import { FileNode } from '../types';

// Constant array representing all markdown files in assets/md
const MARKDOWN_FILES = [
  '/src/assets/md/getting-started.md',
  '/src/assets/md/tutorials/basic-tutorial.md',
  '/src/assets/md/tutorials/advanced/advanced-features.md',
  '/src/assets/md/examples/sample-content.md',
];

// Function to build file structure from the constant array
export const getFileStructure = async (): Promise<FileNode[]> => {
  try {
    const fileStructure: FileNode[] = [];
    const folderMap = new Map<string, FileNode>();

    // Process each file path from the constant array
    for (const filePath of MARKDOWN_FILES) {
      // Remove the base path and get relative path
      const relativePath = filePath.replace('/src/assets/md/', '');
      const pathParts = relativePath.split('/');
      
      // Build the folder structure
      let currentPath = '';
      let currentLevel = fileStructure;
      
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        const isFile = i === pathParts.length - 1;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        const fullPath = `/src/assets/md/${currentPath}`;
        
        if (isFile) {
          // Add file
          const fileNode: FileNode = {
            name: part,
            path: filePath,
            type: 'file'
          };
          currentLevel.push(fileNode);
        } else {
          // Add or find folder
          let folderNode = currentLevel.find(node => node.name === part && node.type === 'folder');
          
          if (!folderNode) {
            folderNode = {
              name: part,
              path: fullPath,
              type: 'folder',
              children: []
            };
            currentLevel.push(folderNode);
          }
          
          currentLevel = folderNode.children!;
        }
      }
    }

    // Sort the structure (folders first, then files, both alphabetically)
    const sortNodes = (nodes: FileNode[]): FileNode[] => {
      return nodes.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      }).map(node => ({
        ...node,
        children: node.children ? sortNodes(node.children) : undefined
      }));
    };

    return sortNodes(fileStructure);
  } catch (error) {
    console.error('Error loading file structure:', error);
    throw new Error('Failed to load markdown files');
  }
};

export const loadFileContent = async (path: string): Promise<string> => {
  try {
    // Load the actual markdown file content
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading file content for ${path}:`, error);
    throw new Error(`Could not load file: ${path.split('/').pop()}`);
  }
};

export const searchFiles = (files: FileNode[], query: string): FileNode[] => {
  const results: FileNode[] = [];
  
  const searchNode = (node: FileNode) => {
    if (node.name.toLowerCase().includes(query.toLowerCase())) {
      results.push(node);
    }
    
    if (node.children) {
      node.children.forEach(searchNode);
    }
  };

  files.forEach(searchNode);
  return results;
};

export const flattenFileTree = (files: FileNode[]): FileNode[] => {
  const flattened: FileNode[] = [];
  
  const flattenNode = (node: FileNode) => {
    if (node.type === 'file') {
      flattened.push(node);
    }
    
    if (node.children) {
      node.children.forEach(flattenNode);
    }
  };

  files.forEach(flattenNode);
  return flattened;
};

export const getFileTitle = (path: string): string => {
  const fileName = path.split('/').pop() || '';
  return fileName.replace('.md', '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Helper function to add new markdown files to the constant array
export const addMarkdownFile = (filePath: string): void => {
  if (!MARKDOWN_FILES.includes(filePath)) {
    MARKDOWN_FILES.push(filePath);
    console.log(`Added new markdown file: ${filePath}`);
  }
};

// Helper function to get all markdown file paths
export const getAllMarkdownFiles = (): string[] => {
  return [...MARKDOWN_FILES];
};
