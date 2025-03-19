import React from 'react';
import { motion } from 'framer-motion';
import { Code, FileCode2, Layout, Script, Type, Database, Server, Package, GitBranch as Git, Terminal, Brush, Puzzle, Rocket, CheckCircle, GraduationCap, FileText, Layers } from 'lucide-react';
import Header from './Header';

const LearnToCode: React.FC = () => {
  const skills = [
    {
      title: 'HTML',
      description: 'Structure the content of web pages using Hypertext Markup Language',
      icon: <FileCode2 size={32} className="text-orange-500" />,
      link: 'https://www.youtube.com/watch?v=kUMe1FH4CHE'
    },
    {
      title: 'CSS',
      description: 'Style, animate and design your web pages using Cascading Style Sheets.',
      icon: <Brush size={32} className="text-blue-500" />,
      link: 'https://www.youtube.com/watch?v=OXGznpKZ_sA'
    },
    {
      title: 'JavaScript',
      description: 'Add interactivity and dynamic behavior to web pages.',
      icon: <FileText size={32} className="text-yellow-500" />,
      link: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
    },
    {
      title: 'React',
      description: 'Build user interfaces with a component-based approach.',
      icon: <Layout size={32} className="text-cyan-500" />,
      link: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA'
    },
    {
      title: 'Node.js',
      description: 'Develop server-side applications with JavaScript.',
      icon: <Server size={32} className="text-green-500" />,
      link: 'https://www.youtube.com/watch?v=f2EqECiTBL8'
    },
    {
      title: 'Express.js',
      description: 'Create robust APIs and web applications with Node.js.',
      icon: <Code size={32} className="text-gray-400" />,
      link: 'https://www.youtube.com/watch?v=nH9E25nkk3I'
    },
    {
      title: 'Git',
      description: 'Publish, manage and track changes to your code.',
      icon: <Git size={32} className="text-red-500" />,
      link: 'https://www.youtube.com/watch?v=zTjRZNkhiEU'
    },
    {
      title: 'SQL',
      description: 'Create, manage and query your databases.',
      icon: <Database size={32} className="text-blue-400" />,
      link: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
    },
    {
      title: 'TypeScript',
      description: 'Enhance JavaScript with static typing.',
      icon: <Type size={32} className="text-blue-600" />,
      link: 'https://www.youtube.com/watch?v=30LWjhZzg50'
    },
    {
      title: 'Webpack',
      description: 'Bundle JavaScript modules for deployment.',
      icon: <Package size={32} className="text-yellow-600" />,
      link: 'https://www.youtube.com/watch?v=MpGLUVbqoYQ'
    },
    {
      title: 'REST APIs',
      description: 'Design and consume RESTful APIs.',
      icon: <Terminal size={32} className="text-orange-400" />,
      link: '#'
    },
    {
      title: 'Algorithms',
      description: 'Solve complex problems with efficient algorithms.',
      icon: <Puzzle size={32} className="text-purple-500" />,
      link: '#'
    },
    {
      title: 'Data Structures',
      description: 'Organize and store data efficiently.',
      icon: <Layers size={32} className="text-teal-500" />,
      link: '#'
    },
    {
      title: 'Deployment',
      description: 'Deploy and host web applications.',
      icon: <Rocket size={32} className="text-green-400" />,
      link: '#'
    },
    {
      title: 'Testing',
      description: 'Write effective tests for your code.',
      icon: <CheckCircle size={32} className="text-green-600" />,
      link: '#'
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 flex flex-col">
      <Header />
      <motion.div
        className="flex-1 py-12 px-6 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.section
          className="max-w-7xl mx-auto text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Learn to Code</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Acquire the skills to become a proficient web developer.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-600 transition-colors relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {index < 10 && (
                <div className="absolute top-4 right-4 text-orange-500 font-bold">FREE</div>
              )}
              {index >= 10 && (
                <div className="absolute top-4 right-4 text-purple-500 font-bold">PRO</div>
              )}
              <div className="p-3 bg-dark-700 rounded-lg inline-block mb-4">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{skill.title}</h3>
              <p className="text-gray-400 mb-4">{skill.description}</p>
              <motion.a
                href={skill.link}
                className="px-6 py-3 bg-primary-600 rounded-lg text-white font-medium inline-block hover:bg-primary-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LearnToCode;
