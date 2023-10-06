function getQuizQuestions({ quizId }: { quizId: string }) {
  const quiz = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: { quizId } }),
  };

  const quizzes = fetch("/quizzes/questions", quiz)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return quizzes;
}

export default getQuizQuestions;
