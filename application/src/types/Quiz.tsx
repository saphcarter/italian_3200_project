type Quiz = {
  id: string;
  name: string;
  questions: Question[];
  dueDate: string;
};

export type Question = {
  id: string;
  description: string;
  audio: string;
};

export default Quiz;
