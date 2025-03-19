export type AIModel = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type ProjectFile = {
  name: string;
  path: string;
  content: string;
  language: string;
};

export type GenerationStep = {
  id: string;
  message: string;
  completed: boolean;
  files?: ProjectFile[];
};

export type AppState = {
  selectedModel: AIModel | null;
  apiKey: string;
  prompt: string;
  generatedCode: string;
  isGenerating: boolean;
  previewUrl: string | null;
  error: string | null;
  projectFiles: ProjectFile[];
  generationSteps: GenerationStep[];
  currentConversation: string[];
  setSelectedModel: (model: AIModel | null) => void;
  setApiKey: (key: string) => void;
  setPrompt: (prompt: string) => void;
  generateCode: () => Promise<void>;
  resetError: () => void;
  addGenerationStep: (step: GenerationStep) => void;
  updateGenerationStep: (id: string, updates: Partial<GenerationStep>) => void;
  addConversationMessage: (message: string) => void;
  clearGeneration: () => void;
};
