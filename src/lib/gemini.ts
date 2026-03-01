import { GoogleGenerativeAI, type Content } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAi = new GoogleGenerativeAI(API_KEY);
const model = genAi.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

export const startChatSesson = (history: Content[]) => {
  return model.startChat({ history });
};

export const generateConversationTitle = async (message: string) => {
  const prompt = `以下のメッセージに対する会話のタイトルを15字以内で生成してください。タイトルのみを返してください。\n\nメッセージ:${message}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};
