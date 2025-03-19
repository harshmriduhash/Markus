import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { Eye, EyeOff, Key } from 'lucide-react';

const ApiKeyInput: React.FC = () => {
  const { apiKey, setApiKey, selectedModel } = useAppStore();
  const [showKey, setShowKey] = useState(false);

  const toggleShowKey = () => setShowKey(!showKey);

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-lg font-semibold mb-3 text-white">API Key</h2>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Key size={18} />
        </div>
        <input
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={`Enter your ${selectedModel?.name || 'AI model'} API key`}
          className="w-full pl-10 pr-10 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        <button
          type="button"
          onClick={toggleShowKey}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Your API key is stored locally and never sent to our servers.
      </p>
    </motion.div>
  );
};

export default ApiKeyInput;
