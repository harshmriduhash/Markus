import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { X, AlertCircle } from 'lucide-react';

const ErrorNotification: React.FC = () => {
  const { error, resetError } = useAppStore();
  
  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        resetError();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, resetError]);
  
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-md flex items-start gap-3"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
        >
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="font-medium">Error</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
          <button 
            onClick={resetError}
            className="shrink-0 text-white/80 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorNotification;
