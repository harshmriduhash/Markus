import React from 'react';
import { Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const GetPremium = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-bold text-white flex flex-col sm:flex-row items-start sm:items-center">
        <span style={{ color: '#ffc857' }}>Get Markus Code</span>
        <div className="flex items-center sm:ml-2">
          <span className="text-3xl font-bold text-white" style={{ color: '#ffc857', marginRight: '5px' }}>Premium</span>
          <Crown color="#ffc857" size={32} />
        </div>
      </h1>
      <p className="text-gray-300 mb-8">Unlock exclusive features and enhance your web app building experience.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-dark-700 rounded-2xl shadow-lg p-6 border border-dark-600">
          <h2 className="text-2xl font-semibold text-white mb-2">Free</h2>
          <p className="text-gray-300 mb-4">Get started with basic features.</p>
          <div className="text-4xl font-bold text-primary-500 mb-4">Free</div>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <li>AI Code Generation: Limited</li>
            <li>Project Storage: Limited</li>
            <li>Community Support</li>
            <li>Basic Code Editor</li>
            <li>Standard Templates</li>
            <li>Limited Component Library</li>
            <li>Access to all free courses</li>
            <li>Basic Version Control</li>
            <li>Standard Deployment Options</li>
            <li>Limited Collaboration Features</li>
            <li>Watermarked Exports</li>
          </ul>
          <button className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Already Activated</button>
        </div>

        {/* Standard Plan */}
        <div className="bg-dark-700 rounded-2xl shadow-lg p-6 border border-dark-600">
          <div className="flex items-center mb-2">
            <h2 className="text-2xl font-semibold text-white mr-2">Standard</h2>
            <span className="bg-yellow-500 text-white text-xs font-semibold rounded-full px-2 py-1">Popular</span>
          </div>
          <p className="text-gray-300 mb-4">Enhanced features for serious web app builders.</p>
          <div className="text-4xl font-bold text-primary-500 mb-4">₹299/month</div>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <li>AI Code Generation: Increased Limit</li>
            <li>Project Storage: Increased Limit</li>
            <li>Priority Support</li>
            <li>Advanced Code Editor</li>
            <li>Premium API: 100 Calls</li>
            <li>Early Access to New Models</li>
            <li>Access to all Free and Premium courses</li>
            <li>Advanced Version Control</li>
            <li>Automated Testing</li>
            <li>Enhanced Collaboration Features</li>
            <li>Standard Analytics Dashboard</li>
          </ul>
          <button className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">Get Started</button>
        </div>

        {/* Premium Plan */}
        <div className="bg-dark-700 rounded-2xl shadow-lg p-6 border border-dark-600">
          <h2 className="text-2xl font-semibold text-white mb-2">Premium</h2>
          <p className="text-gray-300 mb-4">The ultimate web app building experience.</p>
          <div className="text-4xl font-bold text-primary-500 mb-4">₹499/month</div>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <li>Unlimited AI Code Generation</li>
            <li>Unlimited Project Storage</li>
            <li>24/7 Priority Support</li>
            <li>Advanced Code Editor</li>
            <li>Premium API: 300 Calls</li>
            <li>Exclusive Beta Features</li>
            <li>Access to all Free and Premium courses</li>
            <li>Advanced Version Control with Branching</li>
            <li>Automated Testing and CI/CD</li>
            <li>Advanced Collaboration Features</li>
            <li>Customizable Analytics Dashboard</li>
          </ul>
          <button className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">Get Started</button>
        </div>
      </div>
    </motion.div>
  );
};

export default GetPremium;
