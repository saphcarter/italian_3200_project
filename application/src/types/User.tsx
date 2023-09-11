import QuizResults from "./Results";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  quizResults: QuizResults[];
  administrative: Boolean;
};

export default User;
