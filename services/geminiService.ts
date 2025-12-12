import { GoogleGenAI, Type } from "@google/genai";
import { Product, ProductType } from "../types";

export const generateProductConcept = async (userPrompt: string): Promise<Partial<Product> | null> => {
  // Guidelines: The API key must be obtained exclusively from the environment variable process.env.API_KEY.
  // We assume it is pre-configured and accessible.
  // If missing, we fallback to simulation to avoid crashing the demo experience.
  if (!process.env.API_KEY) {
    console.warn("Cortana System: API Key is missing or environment is restricted.");
    // Return high-fidelity simulation data if no key is present (prevents broken UX)
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
    return {
      title: `Simulated: ${userPrompt.substring(0, 20)}...`,
      description: "Neural Link Connection established. Running in simulation mode due to missing API credentials. The requested asset has been modeled predictively.",
      price: 99.99,
      type: ProductType.LOGO_BUNDLE,
      tags: ["Simulation", "Neural-Model", "Predictive"],
      dnaSignature: `SIM-${Math.random().toString(36).substring(7).toUpperCase()}`,
    };
  }

  try {
    // Guidelines: Use process.env.API_KEY string directly when initializing.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Generate a futuristic digital product listing based on this user request: "${userPrompt}". 
      The product should be one of: Ebook, Spreadsheet, Logo Bundle, LLM Prompt, or Financial Service.
      Return JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            price: { type: Type.NUMBER },
            type: { type: Type.STRING, enum: Object.values(ProductType) },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            dnaSignature: { type: Type.STRING, description: "A unique alphanumeric code like DNA-XXX-YYY" }
          },
          required: ["title", "description", "price", "type", "tags", "dnaSignature"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Partial<Product>;
    }
    return null;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return null;
  }
};

export const analyzeSystemLogs = async (logs: string[]): Promise<string> => {
    // Guidelines: Check process.env.API_KEY directly.
    if (!process.env.API_KEY) return "System Offline. Monitoring disabled.";
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze these system logs and provide a 1-sentence futuristic status report formatted like a command terminal output: ${logs.join('\n')}`
        });
        return response.text || "Status Unknown";
    } catch (e) {
        return "Connection Interrupted.";
    }
}