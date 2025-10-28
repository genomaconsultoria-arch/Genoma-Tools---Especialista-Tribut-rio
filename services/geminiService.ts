
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
  }
  return apiKey;
};

export async function getTaxTips(userQuery: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    const systemInstruction = `
      Você é um especialista em direito tributário brasileiro com vasta experiência em planejamento fiscal e redução de custos para empresas de todos os portes (MEI, Simples Nacional, Lucro Presumido, Lucro Real).
      Seu objetivo é fornecer dicas claras, práticas e acionáveis. Responda à pergunta do usuário com foco em estratégias legais para otimização tributária.
      Formate sua resposta em Markdown para garantir a melhor legibilidade, utilizando:
      - Títulos (##) para seções principais.
      - Listas de marcadores (-) ou numeradas (1.) para itens.
      - Negrito (**) para destacar termos importantes.
      - Itálico (_) para ênfase.
      Sempre que possível, forneça exemplos práticos para ilustrar os conceitos.
      Seja didático e direto ao ponto. Comece a resposta diretamente, sem introduções como "Claro, aqui estão as dicas...".
      Finalize com um aviso legal em itálico: "_Atenção: As informações fornecidas são para fins educacionais e não constituem aconselhamento jurídico ou fiscal. Consulte sempre um profissional qualificado para analisar seu caso específico._"
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userQuery,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Falha na comunicação com o serviço de IA.");
  }
}
   