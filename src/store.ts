import { create } from "zustand";
import type { Question } from "./types";

interface QuizStore {
  answers: Record<string, unknown>;
  questions: Question[];
  currentQuestionIndex: number;
  setAnswer: (questionId: string, answer: unknown) => void;
  setAnswers: (answers: Record<string, unknown>) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  previousQuestion: () => void;
  nextQuestion: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  answers: {},
  questions: [],
  currentQuestionIndex: 0,
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  setAnswers: (answers) => set({ answers }),
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1,
        state.questions.length - 1
      ),
    })),
}));
