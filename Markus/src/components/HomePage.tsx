import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, ChevronRight, Github, LogIn, UserPlus, Sparkles, Zap, Layers, ArrowRight, Menu } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTryNow = () => {
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const featureCardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: 0.2 + (i * 0.1)
      }
    })
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.4)',
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="py-4 px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="mr-2 md:hidden"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-2"
            >
              <div className="p-2 bg-primary-600 rounded-lg">
                <Code size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold sm:text-xl">Markus Code</h1>
                <p className="text-xs text-gray-400">AI-Powered Web App Builder</p>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          className="hidden md:flex items-center gap-3 bg-dark-800 p-1.5 rounded-full border border-dark-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </motion.a>
          <motion.a 
            href="/login" 
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            <LogIn size={16} />
            <span className="hidden sm:inline">Login</span>
          </motion.a>
          <motion.a 
            href="/register" 
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus size={16} />
            <span className="hidden sm:inline">Register</span>
          </motion.a>
        </motion.div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-64 bg-dark-800 border-r border-dark-700 z-50 shadow-lg transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 pb-4">
            <Code size={20} className="text-primary-500" />
            Markus Code
          </h2>
          <nav className="flex flex-col gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-dark-700 text-gray-400"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <Link
              to="/login"
              className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-dark-700 text-gray-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-dark-700 text-gray-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserPlus size={16} />
              <span>Register</span>
            </Link>
          </nav>
        </div>
      </motion.div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleMobileMenu}
        />
      )}

      {/* Hero Section */}
      <motion.section 
        className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-dark-700 rounded-full text-sm text-primary-400 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles size={16} />
            <span>Powered by AI Models like GPT-4, Claude 3, and more</span>
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400"
          variants={itemVariants}
        >
          Build Web Apps with AI in Minutes
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          variants={itemVariants}
        >
          Transform your ideas into fully functional web applications with just a text prompt. 
          No coding required. Modern, clean UI by default.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleTryNow}
            className="px-8 py-4 bg-primary-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 group"
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Try Now</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.a
            href="#features"
            className="px-8 py-4 bg-dark-700 border border-dark-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 group"
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Learn More</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Preview Image */}
        <motion.div
          className="relative mx-auto max-w-4xl flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-dark-700 w-full sm:w-1/3 aspect-video mb-4 sm:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80" 
                alt="Markus Code App Interface" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-dark-700 w-full sm:w-1/3 ml-0 sm:ml-4 aspect-video mb-4 sm:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80" 
                alt="Markus Code App Interface" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-dark-700 w-full sm:w-1/3 ml-0 sm:ml-4 aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80" 
                alt="Markus Code App Interface" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-600 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary-600 opacity-10 rounded-full blur-3xl"></div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to build web applications without writing a single line of code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Code className="text-primary-500" size={24} />,
              title: "Multiple AI Models",
              description: "Choose from GPT-4, Claude 3, Gemini Pro, and more to power your web app generation."
            },
            {
              icon: <Sparkles className="text-primary-500" size={24} />,
              title: "Modern UI by Default",
              description: "All generated applications come with clean, responsive, and modern user interfaces."
            },
            {
              icon: <Zap className="text-primary-500" size={24} />,
              title: "Instant Preview",
              description: "See your web application come to life in real-time with our built-in preview."
            },
            {
              icon: <Layers className="text-primary-500" size={24} />,
              title: "Complete Project Files",
              description: "Get all the HTML, CSS, and JavaScript files needed for your web application."
            },
            {
              icon: <Code className="text-primary-500" size={24} />,
              title: "Code Transparency",
              description: "View and understand the generated code with syntax highlighting."
            },
            {
              icon: <Sparkles className="text-primary-500" size={24} />,
              title: "Generation Process",
              description: "Watch the AI build your application step by step with detailed progress updates."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-600 transition-colors"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={featureCardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-3 bg-dark-700 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-6 md:px-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-dark-800 to-dark-700 rounded-2xl p-10 border border-dark-600 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary-600 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary-600 opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Web App?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Start creating beautiful, functional web applications in minutes with the power of AI.
              </p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleTryNow}
                className="px-8 py-4 bg-primary-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 group"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span>Try Now</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-dark-700 border border-dark-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 group"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Github size={18} />
                <span>GitHub</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 border-t border-dark-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Code size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Markus Code</h2>
              <p className="text-xs text-gray-400">© 2025 All rights reserved</p>
            </div>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer >
    </div >
  );
};

export default HomePage;
