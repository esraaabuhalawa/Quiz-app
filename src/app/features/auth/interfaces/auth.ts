export interface IForgotResponse {
  message: string;
}

export interface IReset {
  otp: string;
  email: string;
  password: string;
}

export interface IResetResponse {
  message: string;
  timestamp: string;
}
