import { GoogleGenAI, Type } from "@google/genai";
import { Product, ProductType } from "../types";

// Initialize Gemini
// NOTE: In a real production app, ensure API keys are handled securely.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateProductConcept = async (userPrompt: string): Promise<Partial<Product> | null> => {
  if (!apiKey) {
    console.error("API Key is missing");
    // Return mock data if no key to prevent app crash in demo
    return {
      title: `Simulated: ${userPrompt} Bundle`,
      description: "API Key missing. This is a simulation of the AI generated content.",
      price: 99.99,
      type: ProductType.LOGO_BUNDLE,
      tags: ["Simulation", "Demo"],
    };
  }

  try {
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
    if (!apiKey) return "System Offline. Monitoring disabled.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze these system logs and provide a 1-sentence futuristic status report formatted like a command terminal output: ${logs.join('\n')}`
        });
        return response.text || "Status Unknown";
    } catch (e) {
        return "Connection Interrupted.";
    }
}