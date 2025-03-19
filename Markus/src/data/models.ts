import { AIModel } from '../types';

    export const AI_MODELS: AIModel[] = [
      {
        id: 'gpt-4',
        name: 'GPT-4',
        description: 'Advanced reasoning, complex instructions, and creative content generation',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V5a2 2 0 0 0 2 2h.5A2.5 2.5 0 0 1 17 9.5a2.5 2.5 0 0 1-2.5 2.5.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5h-.5a2 2 0 0 0-2 2v.5A2.5 2.5 0 0 1 9.5 22 2.5 2.5 0 0 1 7 19.5v-.5a2 2 0 0 0-2-2h-.5A2.5 2.5 0 0 1 2 14.5 2.5 2.5 0 0 1 4.5 12h.5a2 2 0 0 0 2-2v-.5A2.5 2.5 0 0 1 9.5 7h.5a2 2 0 0 0 2-2v-.5A2.5 2.5 0 0 1 9.5 2Z"></path></svg>',
      },
      {
        id: 'claude-3',
        name: 'Claude 3',
        description: 'Excellent at following nuanced instructions with thoughtful, safe outputs',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>',
      },
      {
        id: 'gemini-pro',
        name: 'Gemini',
        description: 'Multimodal capabilities with strong reasoning and coding abilities',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>',
      },
      {
        id: 'llama-3',
        name: 'Llama 3',
        description: 'Open-source model with strong performance across various tasks',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
      },
    ];
