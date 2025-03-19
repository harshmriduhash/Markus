import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { CheckCircle, Circle, FileText, MessageSquare, Code } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const GenerationProcess: React.FC = () => {
  const { generationSteps, currentConversation, isGenerating } = useAppStore();
  
  if (generationSteps.length === 0 && currentConversation.length === 0 && !isGenerating) {
    return null;
  }
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-white">Generation Process</h2>
      
      {/* Conversation Messages */}
      <div className="mb-6 space-y-4">
        <AnimatePresence>
          {currentConversation.map((message, index) => (
            <motion.div
              key={`message-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-800 p-4 rounded-lg border border-dark-700"
            >
              <div className="flex items-start gap-3">
                <Code size={18} className="text-primary-500 mt-1 shrink-0" />
                <p className="text-gray-300">{message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Generation Steps */}
      <div className="space-y-4">
        <AnimatePresence>
          {generationSteps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-800 p-4 rounded-lg border border-dark-700"
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
                          <div className="bg-dark-700 px-3 py-2 flex items-center gap-2">
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
        </AnimatePresence>
        
        {/* Loading indicator if still generating */}
        {isGenerating && generationSteps.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-4"
          >
            <div className="w-8 h-8 border-t-2 border-primary-500 rounded-full animate-spin"></div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GenerationProcess;
