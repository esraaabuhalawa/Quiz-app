import { IApiResponse } from "../../../../../../shared/interfaces/general.interface";

export interface IQuestion {
  _id: string;
  title: string;
  description: string;
  options: IQuestionOptions;
  answer: string;
  status: string;
  instructor: string;
  difficulty: string;
  points: number;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IQuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface ICreateQuestionData {
  title: string;
  description: string;
  options: ICreateOptions;
  answer: string;
  difficulty: string;
  type: string;
}

interface ICreateOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface IQuestionDocument extends IQuestion {
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface IQuestionUpdateForm {
  answer: string;
}

// ====== API Response Types ======
export type ICreateQuestionResponse = IApiResponse<IQuestionDocument>
export type IUpdateQuestionResponse = IApiResponse<IQuestion>
export type IDeleteQuestionResponse = IApiResponse<IQuestionDocument>
