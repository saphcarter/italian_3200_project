function getAllQuizzes() {
  let quizzes = [];
  quizzes = fetch("/quizzes")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return quizzes;
}

export default getAllQuizzes;
