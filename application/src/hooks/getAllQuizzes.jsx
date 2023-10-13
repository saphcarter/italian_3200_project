import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

function getAllQuizzes() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  supabase
    .from("quizzes")
    .select()
    .then(({ data: quizzes }) => {
      return quizzes;
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error fetching data:", error);
    });

  // const quizzes = fetch("/quizzes")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     return data;
  //   });

  // return quizzes;
}

export default getAllQuizzes;
