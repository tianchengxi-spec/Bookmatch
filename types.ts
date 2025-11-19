export enum AppStage {
  ONBOARDING = 'ONBOARDING',
  SWIPING = 'SWIPING',
  MATCHING = 'MATCHING',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
}

export interface QuestionOption {
  text: string;
  isCorrect: boolean; // "Correct" means the book likes this answer
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  tags: string[];
  description: string;
  shelfLocation: string;
  quiz: QuizQuestion;
  matchThreshold: number; // Number of tags matched to skip quiz
}

export type SwipeDirection = 'left' | 'right' | null;

export interface MatchResult {
  success: boolean;
  book: Book | null;
  reason?: string;
}