import { RoleEnum } from '../../../core/enum/role.enum';
import { ApiResponse } from '../../../core/interfaces/api-response.model';

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

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  profile: UserProfile;
}

export interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: RoleEnum;
}
export interface ILoginRequest {
  email: string;
  password: string;
}
export type LoginResponse = ApiResponse<LoginResponseData>;
