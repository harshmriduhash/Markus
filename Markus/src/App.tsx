import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ModelSelector from './components/ModelSelector';
import ApiKeyInput from './components/ApiKeyInput';
import PromptInput from './components/PromptInput';
import CodePreview from './components/CodePreview';
import ErrorNotification from './components/ErrorNotification';
import HomePage from './components/HomePage';
import CodeEditor from './components/CodeEditor';
import LearnToCode from './components/LearnToCode';
import { useAppStore } from './store/appStore';
import GetPremium from './components/Premium';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-gray-200 flex flex-col">
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={
            <>
              <Header />
              <motion.main 
                className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col">
                  <motion.h1 
                    className="text-2xl font-bold mb-6 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Build Web Apps with AI
                  </motion.h1>
                  
                  <div className="space-y-6">
                    <ModelSelector />
                    <ApiKeyInput />
                    <PromptInput />
                  </div>
                </div>
                
                <div className="flex flex-col h-full">
                  <CodePreview />
                </div>
              </motion.main>
            </>
          } />
          <Route path="/code-editor" element={
            <>
              <Header />
              <motion.main 
                className="flex-1 container mx-auto px-4 py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CodeEditor />
              </motion.main>
            </>
          } />
          <Route path="/learn-to-code" element={<LearnToCode />} />
          <Route path="/premium" element={<><Header /><motion.main className="flex-1 container mx-auto px-4 py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}><GetPremium /></motion.main></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/generate" />} />
        </Routes>
        
        <ErrorNotification />
      </div>
    </Router>
  );
}

export default App;
