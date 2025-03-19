import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, ExternalLink, X } from 'lucide-react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';

const CodeEditor: React.FC = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    setHtml(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Markus!</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 class="greeting">Welcome to Markus!</h1>
    </div>
    <script src="script.js"></script>
</body>
</html>`);
    setCss(`* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #121212; /* Dark background */
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    transition: background-color 2s ease; /* Smooth transition for background color */
}

.container {
    text-align: center;
    color: #ffffff;
}

.greeting {
    font-size: 3rem;
    font-weight: bold;
    opacity: 0;
    transform: translateY(-50px);
    animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-50px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}`);
    setJs(`window.onload = () => {
    setTimeout(() => {
        document.body.style.backgroundColor = '#ff5722'; // Change to a vibrant color
    }, 3000);
};`);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(createSrcDoc());
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const createSrcDoc = useCallback(() => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;
  }, [html, css, js]);

  const clearEditor = () => {
    setHtml('');
    setCss('');
    setJs('');
  };

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Code Editor</h2>
        <div className="flex gap-2">
          <motion.button
            className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-500 transition-colors"
            onClick={() => setSrcDoc(createSrcDoc())}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={16} />
            <span>Run</span>
          </motion.button>
          <motion.button
            onClick={clearEditor}
            className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg flex items-center gap-2 hover:bg-dark-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={16} />
            <span>Clear</span>
          </motion.button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col flex-1">
          <h3 className="text-md font-semibold text-gray-300 mb-2">index.html</h3>
          <AceEditor
            mode="html"
            theme="dracula"
            onChange={setHtml}
            value={html}
            name="html-editor"
            editorProps={{ $blockScrolling: true }}
            style={{ height: '300px', width: '100%', backgroundColor: '#1A1A1A' }}
          />
        </div>

        <div className="flex flex-col flex-1">
          <h3 className="text-md font-semibold text-gray-300 mb-2">styles.css</h3>
          <AceEditor
            mode="css"
            theme="dracula"
            onChange={setCss}
            value={css}
            name="css-editor"
            editorProps={{ $blockScrolling: true }}
            style={{ height: '300px', width: '100%', backgroundColor: '#1A1A1A' }}
          />
        </div>

        <div className="flex flex-col flex-1">
          <h3 className="text-md font-semibold text-gray-300 mb-2">script.js</h3>
          <AceEditor
            mode="javascript"
            theme="dracula"
            onChange={setJs}
            value={js}
            name="js-editor"
            editorProps={{ $blockScrolling: true }}
            style={{ height: '300px', width: '100%', backgroundColor: '#1A1A1A' }}
          />
        </div>
      </div>

      <div className="flex-1 lg:flex-[0.7] mt-4">
        <h3 className="text-md font-semibold text-gray-300 mb-2">Preview</h3>
        <iframe
          srcDoc={srcDoc}
          title="Output"
          sandbox="allow-scripts"
          width="100%"
          height="700px"
          className="bg-white rounded-lg border border-dark-600"
        />
      </div>
    </motion.div>
  );
};

export default CodeEditor;
