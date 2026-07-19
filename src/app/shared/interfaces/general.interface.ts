// ---- Generic API wrapper ----
export interface IApiResponse<T> {
  message: string;
  data: T;
}

export interface IGroup {
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
