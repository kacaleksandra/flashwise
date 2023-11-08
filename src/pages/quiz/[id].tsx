import useToken from "@/composables/useToken";
import { getGeneratedQuiz } from "@/composables/getGeneratedQuiz";
import { useEffect, useState } from "react";
import getRouteParameter from "@/composables/getRouteParameter";
import { IQuiz, ISendResponse } from "@/interfaces/Quiz";
import checkQuiz from "@/composables/checkQuiz";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Quiz() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = useToken();
  const [generatedQuiz, setGeneratedQuiz] = useState<IQuiz>();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [finalScore, setFinalScore] = useState<string>("");

  useEffect(() => {
    getGeneratedQuiz(token, getRouteParameter())
      .then((res) => {
        setGeneratedQuiz(res);
      })
      .then(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (generatedQuiz) {
      console.log(generatedQuiz);
      setIsAllChecked(
        Object.keys(answers).length === generatedQuiz?.question?.length
      );
    }
  }, [answers, generatedQuiz]);

  //obsługa quizu
  const handleAnswerChange = (questionId: number, answerLetter: string) => {
    setAnswers(Object.assign({}, answers, { [questionId]: answerLetter }));
    if (Object.keys(answers).length === generatedQuiz?.question?.length)
      setIsAllChecked(true);
  };

  async function handleSubmit(): Promise<void> {
    const result: ISendResponse = {
      flashcard_set_id: parseInt(getRouteParameter()),
      quiz_id: generatedQuiz?.quiz_id,
      answers: answers,
    };
    const res = await checkQuiz(token, result);
    setFinalScore(res.final_score);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center ">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="flex justify-center w-full flex-col items-center">
          <Typography variant="h4" className="text-blue-500 my-5">
            Quiz
          </Typography>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              width: "70%",
              flexDirection: "column",
              height: "70vh",
              overflowX: "hidden",
            }}
          >
            <FormControl>
              {generatedQuiz?.question &&
                generatedQuiz.question.map((question) => (
                  <div key={question.id} className="my-3">
                    <FormLabel className="font-medium">
                      {question.text}
                    </FormLabel>
                    <RadioGroup>
                      {question.answers.map((answer) => (
                        <FormControlLabel
                          key={answer.letter}
                          value={answer.letter}
                          control={<Radio />}
                          label={answer.text}
                          disabled={
                            finalScore !== "" && finalScore !== undefined
                          }
                          onChange={() =>
                            handleAnswerChange(question.id, answer.letter)
                          }
                        />
                      ))}
                    </RadioGroup>
                  </div>
                ))}
            </FormControl>
          </Box>
          {finalScore === "" ? (
            <Button
              disabled={!isAllChecked}
              variant="contained"
              className="bg-blue-500"
              onClick={handleSubmit}
            >
              Sprawdź
            </Button>
          ) : (
            <Typography className="text-blue-500 text-lg font-bold">
              {finalScore === undefined
                ? "Wystąpił błąd w czasie sprawdzania quizu"
                : `${finalScore}/${generatedQuiz?.question?.length}`}
            </Typography>
          )}
        </div>
      )}
    </>
  );
}
