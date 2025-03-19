import React from 'react';
import { motion } from 'framer-motion';
import { AI_MODELS } from '../data/models';
import { useAppStore } from '../store/appStore';
import { AIModel } from '../types';
import { Check } from 'lucide-react';

const ModelSelector: React.FC = () => {
  const { selectedModel, setSelectedModel } = useAppStore();

  const renderIcon = (iconString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: iconString }} />;
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-3 text-white">Select AI Model</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {AI_MODELS.map((model) => (
          <ModelCard 
            key={model.id}
            model={model}
            isSelected={selectedModel?.id === model.id}
            onClick={() => setSelectedModel(model)}
            renderIcon={renderIcon}
          />
        ))}
      </div>
    </motion.div>
  );
};

interface ModelCardProps {
  model: AIModel;
  isSelected: boolean;
  onClick: () => void;
  renderIcon: (iconString: string) => React.ReactNode;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, isSelected, onClick, renderIcon }) => {
  return (
    <motion.div
      className={`p-4 rounded-lg cursor-pointer border ${
        isSelected 
          ? 'border-primary-500 bg-dark-700' 
          : 'border-dark-700 bg-dark-800 hover:bg-dark-700'
      } transition-colors relative`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary-600' : 'bg-dark-600'}`}>
          {renderIcon(model.icon)}
        </div>
        <div>
          <h3 className="font-medium text-white">{model.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{model.description}</p>
        </div>
      </div>
      
      {isSelected && (
        <motion.div 
          className="absolute top-2 right-2 text-primary-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <Check size={18} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ModelSelector;
