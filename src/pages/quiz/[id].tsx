import GetToken from "@/functions/GetToken";
import { getGeneratedQuiz } from "@/functions/GetGeneratedQuiz";
import { useEffect, useState } from "react";
import getRouteParameter from "@/functions/GetRouteParameter";
import { IQuiz, ISendResponse } from "@/interfaces/Quiz";
import checkQuiz from "@/functions/CheckQuiz";
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
  const token = GetToken();
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
  }, []);

  useEffect(() => {
    if (generatedQuiz) {
      setIsAllChecked(
        Object.keys(answers).length === generatedQuiz?.questions?.length
      );
    }
  }, [answers, generatedQuiz]);

  //obsługa quizu
  const handleAnswerChange = (questionId: number, answerLetter: string) => {
    setAnswers(Object.assign({}, answers, { [questionId]: answerLetter }));
    if (Object.keys(answers).length === generatedQuiz?.questions?.length)
      setIsAllChecked(true);
  };

  async function handleSubmit(): Promise<void> {
    const result: ISendResponse = {
      flashcards_set: parseInt(getRouteParameter()),
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
              {generatedQuiz?.questions &&
                generatedQuiz.questions.map((question) => (
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
                : `${finalScore}/${generatedQuiz?.questions?.length}`}
            </Typography>
          )}
        </div>
      )}
    </>
  );
}
