import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAi = new GoogleGenerativeAI(API_KEY);
export const model = genAi.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});
