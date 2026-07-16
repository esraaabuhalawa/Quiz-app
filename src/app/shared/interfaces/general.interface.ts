// ---- Generic API wrapper ----
export interface IApiResponse<T> {
  message: string;
  data: T;
}
