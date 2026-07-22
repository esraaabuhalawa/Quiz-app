export interface IQuizRespons {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: IQuestion[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  participants: number;
}

export interface IQuestion {
  _id: string;
  title: string;
  options: Options;
}

export interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}
