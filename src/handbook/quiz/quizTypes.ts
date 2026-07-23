export type QuizQuestion = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  sourceQaId: string;
  questions: QuizQuestion[];
};
