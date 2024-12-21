import { create } from "zustand";
import type { Question } from "./types";

export interface AnswerStatus {
  status: "correct" | "incorrect" | "unanswered";
}

interface QuizStore {
  answers: Record<string, unknown>;
  questions: Question[];
  currentQuestionIndex: number;
  answerStatus: AnswerStatus; // Added answerStatus
  setAnswer: (questionId: string, answer: unknown) => void;
  setAnswers: (answers: Record<string, unknown>) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswerStatus: (status: AnswerStatus) => void; // Setter for answerStatus
  previousQuestion: () => void;
  nextQuestion: () => void;
  getAudioSrcs: () => string[];
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  answers: {},
  questions: [],
  currentQuestionIndex: 0,
  answerStatus: { status: "unanswered" }, // Initialize answerStatus
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  setAnswers: (answers) => set({ answers }),
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setAnswerStatus: (status) => set({ answerStatus: status }), // Implement setter
  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      answerStatus: { status: "unanswered" }, // Reset status on navigation
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1,
        state.questions.length - 1,
      ),
      answerStatus: { status: "unanswered" }, // Reset status on navigation
    })),
  getAudioSrcs: () => {
    const { questions } = get();
    const audioSrcs: string[] = ["/correct.wav", "/incorrect.wav"];
    questions.forEach((question) => {
      if (question.audioSrc) {
        audioSrcs.push(question.audioSrc);
      }
    });
    return audioSrcs;
  },
}));
