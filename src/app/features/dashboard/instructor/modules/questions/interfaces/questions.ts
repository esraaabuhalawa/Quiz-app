import { IApiResponse } from '../../../../../../shared/interfaces/general.interface';

export type QuestionAnswer = 'A' | 'B' | 'C' | 'D';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionStatus = 'active' | 'inactive';

export interface ICreateOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface IQuestionOptions extends ICreateOptions {
  _id: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  description: string;
  options: IQuestionOptions;
  answer: QuestionAnswer;
  status: QuestionStatus | string;
  instructor: string;
  difficulty: QuestionDifficulty | string;
  points: number;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IQuestionDocument extends IQuestion {
  updatedAt: string;
  createdAt: string;
  __v: number;
}
export interface ICreateQuestionData {
  title: string;
  description: string;
  options: ICreateOptions;
  answer: QuestionAnswer;
  difficulty: QuestionDifficulty;
  type: string;
}

export interface IQuestionUpdateForm {
  answer?: QuestionAnswer;
  title?: string;
  description?: string;
  options?: ICreateOptions;
  difficulty?: QuestionDifficulty;
  type?: string;
}

// ---- API Response Types -----
export type IQuestionDetailsResponse = IApiResponse<IQuestion>;
export type IQuestionsListResponse = IApiResponse<{
  data: IQuestion[];
  totalRecords?: number;
}>;

export type ICreateQuestionResponse = IApiResponse<IQuestionDocument>;
export type IUpdateQuestionResponse = IApiResponse<IQuestion>;
export type IDeleteQuestionResponse = IApiResponse<IQuestionDocument>;
