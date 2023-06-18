import { ISendResponse } from "@/interfaces/Quiz";

export default async function checkQuiz(
  token: string,
  result: ISendResponse
): Promise<any> {
  try {
    console.log(result);
    const response = await fetch(
      "http://vbujdewvbj.cfolks.pl/api/quiz/check/",
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
