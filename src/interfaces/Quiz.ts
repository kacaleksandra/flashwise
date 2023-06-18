export interface IAnswer {
  letter: string;
  text: string;
}

export interface IQuestion {
  id: number;
  text: string;
  answers: IAnswer[];
}

export interface IQuiz {
  quiz_id?: number;
  questions?: IQuestion[];
}

export interface ISendResponse {
  flashcards_set: number;
  quiz_id?: number;
  answers?: any;
}
