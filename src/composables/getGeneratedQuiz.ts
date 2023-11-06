import { IQuiz, IQuestion, IAnswer } from "@/interfaces/Quiz";
import { API_URL } from "@/constants";

export async function getGeneratedQuiz(
  token: string,
  id: string
): Promise<IQuiz> {
  try {
    const response = await fetch(
      `${API_URL}/api/quiz/generate/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flashcard_set_id: id,
        }),
      }
    );
    const data = await response.json();
    const quiz_id = data[0].quiz_id;
    data.splice(0, 1);
    const questions = data.map((item: IQuestion) => ({
      id: item.id,
      text: item.text,
      answers: item.answers.map((answer: IAnswer) => ({
        letter: answer.letter,
        text: answer.text,
      })),
    }));
    return { quiz_id, questions };
  } catch (error) {
    console.error(error);
    return {};
  }
}
