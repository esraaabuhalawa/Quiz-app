import { JwtPayload } from 'jwt-decode';
import { IApiResponse } from '../../../shared/interfaces/general.interface';

export interface IDecodedToken extends JwtPayload {
  _id: string;
  role: string;
  verified: boolean;
  iat: number;
  exp: number;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface ICurrentUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
// ======Response Interfaces=======
export interface ILoginData {
  user: IUser;
  token: string;
}

export interface IUser {
  _id: string;
  userName: string;
  role: string;
}

export interface IReset {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export type ILoginResponse = IApiResponse<ILoginData>;

export type ICurrentUserResponse = IApiResponse<{ user: ICurrentUser }>;

export type IResetResponse = IApiResponse<null>;

export type IChangePasswordResponse = IApiResponse<null>;
