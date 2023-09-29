function addQuiz({ name, dueDate }: { name: string; dueDate: string }) {
  const quiz = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: { name }, dueDate: { dueDate } }),
  };

  const quizzes = fetch("/quizzes", quiz)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return quizzes;
}

export default addQuiz;
