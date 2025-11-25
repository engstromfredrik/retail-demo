import { GoogleGenAI } from "@google/genai";
import { ProductData } from '../types';

let genAI: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const askProductQuestion = async (
  question: string,
  product: ProductData
): Promise<string> => {
  if (!genAI) {
    return "AI service is not configured (API Key missing).";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert product assistant for the following product:
      Name: ${product.name}
      Brand: ${product.brand}
      Description: ${product.description}
      Ingredients: ${product.ingredients.join(', ')}
      Allergens: ${product.allergens.join(', ')}
      Origin: ${product.traceability.origin}
      Carbon Footprint: ${product.sustainability.carbonFootprint}kg CO2e

      User Question: "${question}"

      Answer concisely, in a helpful and friendly retail assistant tone. 
      If the user asks for a recipe and the product is food, suggest one using the product.
      Keep the answer under 100 words.
    `;

    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I couldn't generate an answer at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the product knowledge base right now.";
  }
};