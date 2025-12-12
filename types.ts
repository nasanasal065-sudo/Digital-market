export enum ProductType {
  EBOOK = 'EBOOK',
  SPREADSHEET = 'SPREADSHEET',
  LOGO_BUNDLE = 'LOGO_BUNDLE',
  LLM_PROMPT = 'LLM_PROMPT',
  FINANCIAL_SERVICE = 'FINANCIAL_SERVICE',
  AI_MODEL = 'AI_MODEL'
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: ProductType;
  size?: string;
  tags: string[];
  imageUrl: string;
  generatedBy?: string; // AI Agent Name
  dnaSignature?: string; // Mock "Origin DNA"
}

export interface SystemMetrics {
  quantumStability: number;
  neuralLoad: number;
  tokenVelocity: number;
  activeAgents: number;
  temperature: number; // Kelvin
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  source: 'SYSTEM' | 'NETWORK' | 'AI_AGENT' | 'SECURITY';
}