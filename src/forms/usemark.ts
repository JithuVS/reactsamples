import { useState, useEffect } from 'react';
import { FileNode } from '../types';
import { getFileStructure, loadFileContent } from '../utils/fileUtils';

export const useMarkdownFiles = () => {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load file structure on mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        const fileStructure = await getFileStructure();
        setFiles(fileStructure);
        
        // Select the first file by default
        const firstFile = findFirstFile(fileStructure);
        if (firstFile) {
          setSelectedFile(firstFile.path);
        }
      } catch (err) {
        setError('Failed to load file structure');
        console.error('Error loading files:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  // Load content when selected file changes
  useEffect(() => {
    if (!selectedFile) return;

    const loadContent = async () => {
      try {
        setContentLoading(true);
        setError(null);
        const content = await loadFileContent(selectedFile);
        setFileContent(content);
      } catch (err) {
        setError('Failed to load file content');
        console.error('Error loading content:', err);
      } finally {
        setContentLoading(false);
      }
    };

    loadContent();
  }, [selectedFile]);

  const selectFile = (path: string) => {
    setSelectedFile(path);
  };

  return {
    files,
    selectedFile,
    fileContent,
    loading,
    contentLoading,
    error,
    selectFile,
  };
};

// Helper function to find the first file in the tree
const findFirstFile = (files: FileNode[]): FileNode | null => {
  for (const file of files) {
    if (file.type === 'file') {
      return file;
    }
    if (file.children) {
      const found = findFirstFile(file.children);
      if (found) return found;
    }
  }
  return null;
};
