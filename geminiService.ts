
import { GoogleGenAI } from "@google/genai";
import { Church } from "./types";

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async *queryChurchesStream(prompt: string, churches: Church[]) {
    const ai = this.getAI();
    try {
      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{
              text: `Você é um assistente oficial da AICEB. Use estes dados: ${JSON.stringify(churches)}. Responda de forma pastoral em português brasileiro. Pergunta: ${prompt}`
            }]
          }
        ],
        config: { tools: [{ googleSearch: {} }], temperature: 0.7 }
      });

      for await (const chunk of result) {
        if (chunk.text) yield chunk.text;
      }
    } catch (error) {
      console.error(error);
      yield "Houve um erro ao processar sua solicitação.";
    }
  }
}
