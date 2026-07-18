import { RoleEnum } from '../../../core/enum/role.enum';
import { ApiResponse } from '../../../core/interfaces/api-response.model';

export interface IForgotResponse {
  message: string;
import { JwtPayload } from 'jwt-decode';
import { IApiResponse } from '../../../shared/interfaces/general.interface';

export interface IDecodedToken extends JwtPayload {
  _id: string;
  role: string;
  verified: boolean;
  iat: number;
  exp: number;
}

export interface IRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IChangePassword {
  password: string;
  password_new: string;
}

// ====== Response Interfaces ======

export interface ILoginData {
  user: IUser;
  token: string;
}

export interface IUser {
  _id: string;
  userName: string;
  role: string;
}

export interface IRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  status: string;
  role: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
}

export interface IReset {
  otp: string;
  email: string;
  password: string;
}

export interface IForgotResponse {
  message: string;
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
// export interface IChangePasswordData {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   status: string;
//   role: string;
// }

// ====== API Response Types ======

export type ILoginResponse = IApiResponse<ILoginData>;

export type IResetResponseAPI = IApiResponse<null>;

export type IRegisterResponse = IApiResponse<IRegisterData>;

//export type IChangePasswordResponse = IApiResponse<IChangePasswordData>;
