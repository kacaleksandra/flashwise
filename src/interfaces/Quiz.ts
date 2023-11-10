export interface IAnswer {
  letter: string;
  text: string;
}

export interface IQuestion {
  flashcard_id: number;
  text: string;
  answers: IAnswer[];
}

export interface IQuiz {
  question: IQuestion[];
}

export interface ISendResponse {
  answers: AnswersResponse;
}

interface AnswersResponse {
  [questionId: string]: string;
}
