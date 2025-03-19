import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, ChevronUp, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showLogo = location.pathname === '/';

  return (
    <>
      <motion.header
        className="flex items-center justify-between p-4 bg-dark-800 text-white border-b border-dark-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="flex items-center gap-2">
          <motion.button
            className="mr-2"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>
          {!showLogo && (
            <Link to="/" className="hidden md:flex items-center gap-2">
              <motion.div
                className="flex items-center gap-2"
              >
                <div className="p-2 bg-primary-600 rounded-lg">
                  <Code size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Markus Code</h1>
                  <p className="text-xs text-gray-400">AI-Powered Web App Builder</p>
                </div>
              </motion.div>
            </Link>
          )}
          {showLogo && (
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                className="flex items-center gap-2"
              >
                <div className="p-2 bg-primary-600 rounded-lg">
                  <Code size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Markus Code</h1>
                  <p className="text-xs text-gray-400">AI-Powered Web App Builder</p>
                </div>
              </motion.div>
            </Link>
          )}
        </motion.div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://docs.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Docs
          </motion.a>
          <Link to="/premium">
            <motion.button
              className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-1 hover:bg-primary-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronUp size={16} />
              <span>Upgrade</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
