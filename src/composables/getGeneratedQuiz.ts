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
          flashcard_set_id: parseInt(id),
        }),
      }
    );
    const data = await response.json() as IQuiz;
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
