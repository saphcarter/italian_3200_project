function getQuiz(id) {
  const quiz = fetch(`/quizzes/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return quiz;
}

export default getQuiz;
