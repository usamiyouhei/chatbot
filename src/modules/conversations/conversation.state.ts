import { atom } from "jotai";
import type { Conversation } from "./conversation.entity";

export const conversationsAtom = atom<Conversation[]>([]);
