import React, { useRef, useEffect, useState } from 'react';
    import { motion } from 'framer-motion';
    import { useAppStore } from '../store/appStore';
    import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
    import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
    import { Copy, Code, ExternalLink, FileText, Eye, Terminal, Layers, CheckCircle, Circle, Save, Download } from 'lucide-react';
    import JSZip from 'jszip';
    import { saveAs } from 'file-saver';

    const CodePreview: React.FC = () => {
      const {
        generatedCode,
        previewUrl,
        isGenerating,
        projectFiles,
        generationSteps,
        currentConversation,
        setProjectFiles,
        setGeneratedCode
      } = useAppStore();

      const [selectedFile, setSelectedFile] = useState<string | null>(null);
      const [activeTab, setActiveTab] = useState<'code' | 'preview' | 'progress'>('progress');
      const codeRef = useRef<HTMLDivElement>(null);
      const [editedCode, setEditedCode] = useState<string>('');

      // Set the first file as selected when files are generated
      useEffect(() => {
        if (projectFiles.length > 0 && !selectedFile) {
          setSelectedFile(projectFiles[0].path);
        }
      }, [projectFiles, selectedFile]);

      // Initialize editedCode when selectedFile changes
      useEffect(() => {
        setEditedCode(getSelectedFileContent());
      }, [selectedFile, projectFiles]);

      const copyToClipboard = async () => {
        try {
          const codeToCopy = getSelectedFileContent();
          await navigator.clipboard.writeText(codeToCopy);
          console.log('Code copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };

      useEffect(() => {
        if (codeRef.current && generatedCode) {
          codeRef.current.scrollTop = 0;
        }
      }, [generatedCode, selectedFile]);

      // Get the content of the selected file
      const getSelectedFileContent = () => {
        if (!selectedFile) {
          return generatedCode;
        }
        const file = projectFiles.find(file => file.path === selectedFile);
        return file ? file.content : '';
      };

      // Get the language of the selected file for syntax highlighting
      const getSelectedFileLanguage = () => {
        if (!selectedFile) return 'html';
        const file = projectFiles.find(file => file.path === selectedFile);
        return file ? file.language : 'html';
      };

      const downloadProject = async () => {
        const zip = new JSZip();

        // Define the files to include in the zip
        const files = {
          'index.html': projectFiles.find(file => file.name === 'index.html')?.content || generatedCode,
          'styles.css': projectFiles.find(file => file.name === 'styles.css')?.content || '',
          'script.js': projectFiles.find(file => file.name === 'script.js')?.content || '',
        };

        // Add files to the zip
        for (const fileName in files) {
          if (files[fileName]) {
            zip.file(fileName, files[fileName]);
          }
        }

        try {
          const content = await zip.generateAsync({ type: 'blob' });
          saveAs(content, 'project.zip');
        } catch (error) {
          console.error('Failed to generate zip file:', error);
        }
      };

      // Tab button component
      const TabButton = ({
        tab,
        label,
        icon: Icon
      }: {
        tab: 'code' | 'preview' | 'progress',
        label: string,
        icon: React.ElementType
      }) => (
        <motion.button
          onClick={() => setActiveTab(tab)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            activeTab === tab
              ? 'bg-primary-600 text-white'
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon size={16} />
          <span>{label}</span>
        </motion.button>
      );

      if (!generatedCode && !isGenerating && generationSteps.length === 0) {
        return (
          <motion.div
            className="h-full flex items-center justify-center bg-dark-800 rounded-lg border border-dark-700 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <Code size={48} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Code Generated Yet</h3>
              <p className="text-gray-400 max-w-md">
                Select an AI model, enter your API key, and describe the web app you want to build.
              </p>
            </div>
          </motion.div>
        );
      }

      return (
        <motion.div
          className="h-full flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tab navigation */}
          <div className="flex gap-2 mb-4">
            <TabButton tab="progress" label="Progress" icon={Terminal} />
            <TabButton tab="preview" label="Preview" icon={Eye} />
            <TabButton tab="code" label="Code" icon={Code} />
          </div>

          {/* Code Tab */}
          {activeTab === 'code' && (
            <div className="flex-1 flex flex-col">
              {projectFiles.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {projectFiles.map((file) => (
                    <motion.button
                      key={file.path}
                      onClick={() => {
                        setSelectedFile(file.path);
                      }}
                      className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 ${
                        selectedFile === file.path
                          ? 'bg-primary-600 text-white'
                          : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText size={14} />
                      <span>{file.name}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-white">
                  {selectedFile ? `Code: ${selectedFile.substring(1)}` : 'Generated Code'}
                </h2>
                <div className="flex gap-2">
                  {(generatedCode || projectFiles.length > 0) && !isGenerating && (
                    <>
                      <motion.button
                        onClick={downloadProject}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </motion.button>
                      <motion.button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Copy size={14} />
                        <span>Copy</span>
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              <div
                ref={codeRef}
                className="flex-1 overflow-auto rounded-lg border border-dark-700 custom-scrollbar"
                style={{ backgroundColor: '#1A1A1A', maxHeight: 'calc(100vh - 200px)' }}
              >
                {isGenerating && generationSteps.length === 0 ? (
                  <div className="h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 border-t-2 border-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Generating code...</p>
                    </div>
                  </div>
                ) : (
                  <SyntaxHighlighter
                    language={getSelectedFileLanguage()}
                    style={vscDarkPlus}
                    customStyle={{
                      backgroundColor: '#1A1A1A',
                      margin: 0,
                      padding: '0.75rem',
                      overflow: 'auto',
                      fontSize: '0.875rem',
                      display: 'block'
                    }}
                  >
                    {editedCode}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-white">Preview</h2>
                {previewUrl && !isGenerating && (
                  <motion.a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={14} />
                    <span>Open in new tab</span>
                  </motion.a>
                )}
              </div>

              {previewUrl ? (
                <div className="flex-1 border border-dark-700 rounded-lg overflow-hidden bg-white">
                  <iframe
                    src={previewUrl}
                    title="Preview"
                    className="w-full h-full"
                    sandbox="allow-scripts"
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-dark-800 rounded-lg border border-dark-700 p-6">
                  <div className="text-center">
                    <Eye size={48} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No Preview Available</h3>
                    <p className="text-gray-400 max-w-md">
                      Generate code first to see a preview of your web application.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-white">Generation Process</h2>
              </div>

              <div className="flex-1 overflow-auto rounded-lg border border-dark-700 bg-dark-800 p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {currentConversation.length === 0 && generationSteps.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Layers size={48} className="mx-auto text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No Progress Yet</h3>
                      <p className="text-gray-400 max-w-md">
                        Start generating code to see the progress and steps taken by the AI.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Conversation Messages */}
                    {currentConversation.map((message, index) => (
                      <motion.div
                        key={`message-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-dark-700 p-4 rounded-lg border border-dark-600"
                      >
                        <div className="flex items-start gap-3">
                          <Code size={18} className="text-primary-500 mt-1 shrink-0" />
                          <p className="text-gray-300">{message}</p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Generation Steps */}
                    {generationSteps.map((step) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-dark-700 p-4 rounded-lg border border-dark-600"
                      >
                        <div className="flex items-start gap-3">
                          {step.completed ? (
                            <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                          ) : (
                            <Circle size={18} className="text-primary-500 animate-pulse mt-1 shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-gray-300 mb-2">{step.message}</p>

                            {/* Show files if any */}
                            {step.files && step.files.length > 0 && (
                              <div className="mt-3 space-y-3">
                                {step.files.map((file) => (
                                  <div key={file.path} className="bg-dark-900 rounded-md overflow-hidden">
                                    <div className="bg-dark-600 px-3 py-2 flex items-center gap-2">
                                      <FileText size={14} className="text-primary-400" />
                                      <span className="text-sm text-gray-300">{file.name}</span>
                                    </div>
                                    <SyntaxHighlighter
                                      language={file.language}
                                      style={vscDarkPlus}
                                      customStyle={{
                                        margin: 0,
                                        padding: '0.75rem',
                                        maxHeight: '200px',
                                        fontSize: '0.75rem',
                                      }}
                                    >
                                      {file.content}
                                    </SyntaxHighlighter>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Loading indicator if still generating */}
                    {isGenerating && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center py-4"
                      >
                        <div className="w-8 h-8 border-t-2 border-primary-500 rounded-full animate-spin"></div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      );
    };

    export default CodePreview;
