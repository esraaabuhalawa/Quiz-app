import { IApiResponse, IGroup } from "../../../../../../shared/interfaces/general.interface";

export interface IGroupFormData {
  name: string;
  students: string[];
}

export interface IGroupData {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}


// interface ICreateResponseData {
//   name: string;
//   status: string;
//   instructor: string;
//   students: string[];
//   max_students: number;
//   _id: string;
//   updatedAt: string;
//   createdAt: string;
//   __v: number;
// }

interface IUpdateData {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: any[];
  max_students: number;
}

interface IDeleteGroupData {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

// ====== API Response Types ======
export type ICreateResponse = IApiResponse<IGroup>
export type IUpdateResponse = IApiResponse<IUpdateData>
export type IDeleteResponse = IApiResponse<IDeleteGroupData>
