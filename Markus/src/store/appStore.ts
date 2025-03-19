import { create } from 'zustand';
import { AppState, ProjectFile, GenerationStep } from '../types';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

    // Function to create a blob URL from project files
    const createPreviewUrl = (files: ProjectFile[]): string => {
      // Find the index.html, styles.css, and script.js files
      const indexFile = files.find(file => file.name === 'index.html');
      const cssFile = files.find(file => file.name === 'styles.css');
      const jsFile = files.find(file => file.name === 'script.js');

      if (!indexFile) {
        throw new Error('No index.html file found in the project');
      }

      let htmlContent = indexFile.content;

      // Inject CSS into the HTML
      if (cssFile) {
        const styleTag = `<style>\n${cssFile.content}\n</style>`;
        htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);
      }

      // Inject JavaScript into the HTML
      if (jsFile) {
        const scriptTag = `<script>\n${jsFile.content}\n</script>`;
        htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
      }

      // Create a blob with the modified HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Post a message to the iframe with the URL
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'previewUrl', url: url }, '*');
      }

      return url;
    };

    // Default prompt suffix to always generate modern and clean UI
    const DEFAULT_PROMPT_SUFFIX = " with modern and clean UI";

    // Function to make API calls to different AI models
    const generateProjectWithAI = async (
      model: string,
      apiKey: string,
      prompt: string,
      addStep: (step: GenerationStep) => void,
      updateStep: (id: string, updates: Partial<GenerationStep>) => void,
      addMessage: (message: string) => void,
      previousFiles: ProjectFile[] // Add previousFiles parameter
    ): Promise<ProjectFile[]> => {
      // Add default prompt suffix if not already included
      if (!prompt.toLowerCase().includes("modern") && !prompt.toLowerCase().includes("clean ui")) {
        prompt += DEFAULT_PROMPT_SUFFIX;
      }

      // Initial conversation message
      addMessage(`I'll help you build a web application based on your request: "${prompt}". Let me analyze what you need and create the appropriate files.`);

      // Step 1: Analyzing request
      const step1Id = uuidv4();
      addStep({
        id: step1Id,
        message: 'Analyzing your request...',
        completed: false
      });

      try {
        // Different API endpoints and parameters based on the model
        let apiEndpoint = '';
        let requestData: any = {};
        let headers: any = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        };

        // Prepare the system message to instruct the AI to generate web app files
        let systemMessage = `You are an expert senior web developer. Your task is to create a complete, production-ready web application based on the user's request.
        Focus on writing high-quality, clean, and well-structured code. Ensure the application is fully functional and visually appealing.
        Use modern web development practices and prioritize a professional-grade aesthetic.
        The entire application MUST be built using only HTML, CSS, and JavaScript. Do not use any external libraries or frameworks unless explicitly specified by the user.
        Avoid using default or basic styling; instead, create a custom, visually engaging design.
        Incorporate subtle animations and transitions to enhance the user experience.
        Ensure the generated code is free of any placeholder years (e.g., 2023, 2024), and use dynamic methods to display dates where necessary.

        Return your response in the following JSON format:
        {
          "files": [
            {
              "name": "index.html",
              "content": "<!DOCTYPE html>..."
            },
            {
              "name": "styles.css",
              "content": "body { ... }"
            },
            {
              "name": "script.js",
              "content": "document.addEventListener('DOMContentLoaded', () => { ... })"
            }],
          "explanation": "Brief explanation of the application structure and features"
        }

        Make sure to create modern, clean UI with responsive design. Include proper HTML structure, CSS styling, and JavaScript functionality.
        Use syntax highlighting classes for code elements to make the code colorful, similar to VS Code's Dark Plus theme. For example:
        - Keywords: hljs-keyword
        - Strings: hljs-string
        - Numbers: hljs-number
        - Comments: hljs-comment
        - Functions: hljs-function
        - Classes: hljs-class
        Ensure that the generated code includes these classes for proper syntax highlighting.`;

        // If there are previous files, include them in the system message
        if (previousFiles && previousFiles.length > 0) {
          const previousCode = previousFiles.map(file => `File: ${file.name}\nContent:\n${file.content}`).join('\n\n');
          systemMessage += `\n\nHere's the existing code:\n${previousCode}\n\nUpdate the code based on the user's new request.`;
        }

        // Configure API request based on the selected model
        if (model === 'GPT-4') {
          apiEndpoint = 'https://api.openai.com/v1/chat/completions';
          requestData = {
            model: 'gpt-4',
            messages: [
              { role: 'system', content: systemMessage },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7
          };
        } else if (model === 'Claude 3') {
          apiEndpoint = 'https://api.anthropic.com/v1/messages';
          requestData = {
            model: 'claude-3-opus-20240229',
            messages: [
              { role: 'user', content: systemMessage + "\n\n" + prompt }
            ],
            max_tokens: 4000
          };
          headers = {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          };
        } else if (model === 'Gemini') {
          apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
          requestData = {
            contents: [
              {
                parts: [
                  { text: systemMessage + "\n\n" + prompt }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8192
            }
          };
          // For Gemini, API key is passed as a query parameter
          apiEndpoint += `?key=${apiKey}`;
          // Remove Authorization header for Gemini
          delete headers.Authorization;
        } else {
          throw new Error(`Model ${model} is not supported`);
        }

        // Make the actual API call
        updateStep(step1Id, { message: `Connecting to ${model} API...` });

        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
          const response = await axios.post(apiEndpoint, requestData, { headers });

          updateStep(step1Id, { completed: true });
          addMessage("I've received a response from the AI model. Now I'll process the data and create your web application.");

          // Process the API response based on the model
          let responseData;
          if (model === 'GPT-4') {
            responseData = response.data.choices[0].message.content;
          } else if (model === 'Claude 3') {
            responseData = response.data.content[0].text;
          } else if (model === 'Gemini') {
            responseData = response.data.candidates[0].content.parts[0].text;
          }

          // Try to parse the JSON response
          let parsedData;
          try {
            // Extract JSON from the response if it's wrapped in markdown code blocks
            const jsonMatch = responseData.match(/```json\n([\s\S]*?)\n```/) ||
              responseData.match(/```\n([\s\S]*?)\n```/) ||
              responseData.match(/{[\s\S]*?}/);

            const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : responseData;
            parsedData = JSON.parse(jsonString);
          } catch (error) {
            console.error('Failed to parse JSON response:', error);
            throw new Error('Failed to parse the AI model response. Please try again.');
          }

          // Step 2: Creating project structure
          const step2Id = uuidv4();
          addStep({
            id: step2Id,
            message: 'Creating project structure...',
            completed: false
          });

          await new Promise(resolve => setTimeout(resolve, 1000));

          // Convert the parsed data to our ProjectFile format
          const files: ProjectFile[] = parsedData.files.map((file: any) => ({
            name: file.name,
            path: `/${file.name}`,
            language: file.name.split('.').pop() || 'text',
            content: file.content
          }));

          updateStep(step2Id, {
            completed: true,
            files: [files[0]] // Just show the first file initially
          });

          if (parsedData.explanation) {
            addMessage(parsedData.explanation);
          } else {
            addMessage("I've created the basic project structure. Now I'll add styling and functionality.");
          }

          // Step 3: Adding styles
          const step3Id = uuidv4();
          addStep({
            id: step3Id,
            message: 'Adding styles with CSS...',
            completed: false
          });

          await new Promise(resolve => setTimeout(resolve, 1500));

          const cssFile = files.find(file => file.name.endsWith('.css'));
          if (cssFile) {
            updateStep(step3Id, {
              completed: true,
              files: [cssFile]
            });
            addMessage("I've added CSS styles to make the application look good.");
          } else {
            updateStep(step3Id, {
              completed: true,
              message: 'No separate CSS file found. Styles might be included in the HTML.'
            });
          }

          // Step 4: Adding JavaScript
          const step4Id = uuidv4();
          addStep({
            id: step4Id,
            message: 'Adding JavaScript functionality...',
            completed: false
          });

          await new Promise(resolve => setTimeout(resolve, 1500));

          const jsFile = files.find(file => file.name.endsWith('.js'));
          if (jsFile) {
            updateStep(step4Id, {
              completed: true,
              files: [jsFile]
            });
            addMessage("I've added JavaScript to make the application interactive.");
          } else {
            updateStep(step4Id, {
              completed: true,
              message: 'No separate JavaScript file found. Scripts might be included in the HTML.'
            });
          }

          // Final step: Finalizing project
          const finalStepId = uuidv4();
          addStep({
            id: finalStepId,
            message: 'Finalizing project...',
            completed: false
          });

          await new Promise(resolve => setTimeout(resolve, 1000));

          updateStep(finalStepId, { completed: true });

          addMessage("The project is now complete and ready for preview!");

          return files;
        } catch (axiosError) {
          // Handle API call errors
          console.error('API call failed:', axiosError);

          let errorMessage = 'Failed to connect to the AI service. Please check your API key and try again.';

          if (axios.isAxiosError(axiosError)) {
            if (axiosError.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              const status = axiosError.response.status;
              const responseData = axiosError.response.data;

              if (status === 401 || status === 403) {
                errorMessage = 'Authentication failed. Please check your API key and try again.';
              } else if (status === 404) {
                errorMessage = 'The API endpoint could not be found. This model might not be available.';
              } else if (status === 429) {
                errorMessage = 'Rate limit exceeded. Please try again later.';
              } else {
                // Try to extract a meaningful error message from the response
                let detailedError = 'Unknown error';

                if (typeof responseData === 'string') {
                  detailedError = responseData;
                } else if (responseData && typeof responseData === 'object') {
                  if (responseData.error) {
                    if (typeof responseData.error === 'string') {
                      detailedError = responseData.error;
                    } else if (responseData.error.message) {
                      detailedError = responseData.error.message;
                    }
                  } else if (responseData.message) {
                    detailedError = responseData.message;
                  }
                }

                errorMessage = `API error (${status}): ${detailedError}`;
              }
            } else if (axiosError.request) {
              // The request was made but no response was received
              errorMessage = 'No response received from the AI service. Please check your internet connection.';
            } else {
              // Something happened in setting up the request that triggered an Error
              errorMessage = `Error setting up the request: ${axiosError.message}`;
            }
          }

          // Specific error handling for Gemini
          if (model === 'Gemini') {
            errorMessage = `Gemini API error: ${errorMessage}`;
          }

          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Generation process failed:', error);
        throw new Error(`Failed to generate code: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    export const useAppStore = create<AppState>((set, get) => ({
      selectedModel: null,
      apiKey: '',
      prompt: 'Create a responsive landing page for a tech startup',
      generatedCode: '',
      isGenerating: false,
      previewUrl: null,
      error: null,
      projectFiles: [],
      generationSteps: [],
      currentConversation: [],

      setSelectedModel: (model) => set({ selectedModel: model }),
      setApiKey: (key) => set({ apiKey: key }),
      setPrompt: (prompt) => set({ prompt }),

      addGenerationStep: (step) => set(state => ({
        generationSteps: [...state.generationSteps, step]
      })),

      updateGenerationStep: (id, updates) => set(state => ({
        generationSteps: state.generationSteps.map(step =>
          step.id === id ? { ...step, ...updates } : step
        )
      })),

      addConversationMessage: (message) => set(state => ({
        currentConversation: [...state.currentConversation, message]
      })),

      clearGeneration: () => set({
        generationSteps: [],
        currentConversation: [],
        projectFiles: [],
        generatedCode: '',
        previewUrl: null
      }),

      generateCode: async () => {
        const { selectedModel, apiKey, prompt, addGenerationStep, updateGenerationStep, addConversationMessage, projectFiles, clearGeneration } = get();

        if (!selectedModel) {
          set({ error: 'Please select an AI model' });
          return;
        }

        if (!apiKey) {
          set({ error: 'Please enter your API key' });
          return;
        }

        if (!prompt) {
          set({ error: 'Please enter a prompt' });
          return;
        }

        // Clear previous generation
        clearGeneration();

        set({
          isGenerating: true,
          error: null,
        });

        try {
          // Generate project files
          const files = await generateProjectWithAI(
            selectedModel.name,
            apiKey,
            prompt,
            addGenerationStep,
            updateGenerationStep,
            addConversationMessage,
            projectFiles // Pass previous files
          );

          // Set the generated files
          set({ projectFiles: files });

          // Create a preview URL
          const url = createPreviewUrl(files);

          // If there was a previous URL, revoke it to prevent memory leaks
          if (get().previewUrl) {
            URL.revokeObjectURL(get().previewUrl);
          }

          // Set the main HTML file as the generated code for the code preview
          const indexFile = files.find(file => file.name === 'index.html');
          if (indexFile) {
            set({ generatedCode: indexFile.content });
          }

          set({ previewUrl: url, isGenerating: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            isGenerating: false
          });
        }
      },

      resetError: () => set({ error: null }),
    }));
