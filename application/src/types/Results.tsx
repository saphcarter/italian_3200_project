type QuizResults = {
  quizId: string;
  dateCompleted: string;
  results: Result[];
};

export type Result = {
  questionId: string;
  answerAudio: string;
  similarityScore: string;
  selfEvalScore: string;
};

export default QuizResults;
