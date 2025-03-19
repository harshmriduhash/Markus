import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { Wand2, RotateCcw } from 'lucide-react';

const PromptInput: React.FC = () => {
  const { prompt, setPrompt, generateCode, isGenerating, clearGeneration } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateCode();
  };

  const handleReset = () => {
    clearGeneration();
    setPrompt('');
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold mb-3 text-white">Describe Your Web App</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the web app you want to build..."
          className="w-full p-4 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-h-[120px] resize-y"
        />
        <div className="mt-3 flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Be specific about features, design, and functionality.
          </p>
          <div className="flex gap-2">
            <motion.button
              type="button"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isGenerating
                  ? 'bg-dark-600 text-gray-400 cursor-not-allowed'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              } transition-colors`}
              whileHover={!isGenerating ? { scale: 1.05 } : {}}
              whileTap={!isGenerating ? { scale: 0.95 } : {}}
              disabled={isGenerating}
              onClick={handleReset}
            >
              <RotateCcw size={18} />
              <span>Reset</span>
            </motion.button>
            <motion.button
              type="submit"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isGenerating
                  ? 'bg-dark-600 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-500'
              } transition-colors`}
              whileHover={!isGenerating ? { scale: 1.05 } : {}}
              whileTap={!isGenerating ? { scale: 0.95 } : {}}
              disabled={isGenerating}
            >
              <Wand2 size={18} className={isGenerating ? 'animate-pulse' : ''} />
              <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PromptInput;
