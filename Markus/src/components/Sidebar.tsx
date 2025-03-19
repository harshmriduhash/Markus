import React from 'react';
import { motion } from 'framer-motion';
import { Code, ChevronUp, Menu, GraduationCap, Bot, Pencil, Crown, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      pointerEvents: 'auto',
    },
    closed: {
      opacity: 0,
      pointerEvents: 'none',
    },
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        variants={overlayVariants}
        animate={isOpen ? 'open' : 'closed'}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <motion.aside
        className="fixed top-0 left-0 h-full w-64 bg-dark-800 border-r border-dark-700 z-50 shadow-lg"
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 pb-4">
            <Code size={20} className="text-primary-500" />
            Markus Code
          </h2>
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-dark-700 ${
                  isActive ? 'bg-primary-600 text-white' : 'text-gray-400'
                }`
              }
              onClick={onClose}
            >
              <Bot size={16} />
              <span>Generate Code</span>
            </NavLink>
            <NavLink
              to="/code-editor"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-dark-700 ${
                  isActive ? 'bg-primary-600 text-white' : 'text-gray-400'
                }`
              }
              onClick={onClose}
            >
              <Pencil size={16} />
              <span>Code Editor</span>
            </NavLink>
            <NavLink
              to="/learn-to-code"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-dark-700 ${
                  isActive ? 'bg-primary-600 text-white' : 'text-gray-400'
                }`
              }
              onClick={onClose}
            >
              <GraduationCap size={16} />
              <span>Learn to Code</span>
            </NavLink>
            <NavLink
              to="/premium"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-dark-700 ${
                  isActive ? 'bg-primary-600 text-white' : 'text-gray-400'
                }`
              }
              onClick={onClose}
            >
              <Crown size={16} />
              <span>Premium</span>
            </NavLink>
            {/* Add more navigation links here */}
          </nav>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-dark-700 text-red-500 mt-3 w-full justify-start"
            whileHover={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
