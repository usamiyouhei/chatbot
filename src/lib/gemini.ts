import { GoogleGenerativeAI, type Content } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAi = new GoogleGenerativeAI(API_KEY);
const model = genAi.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

export const startChatSesson = (history: Content[]) => {
  return model.startChat({ history });
};
