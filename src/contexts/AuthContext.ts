
import { createContext } from "react";
import { UserRegister } from "../types/user.type";
import { UserLogin } from '../types/user.type';

import {
  Auth,
  ApiLoginSuccessResponse,
  ApiErrorResponse,
} from "../types/api.type";

export interface AuthContextType {
  auth: Auth;
  register: (user: UserRegister) => Promise<ApiLoginSuccessResponse | ApiErrorResponse>;
  login: (user: UserLogin) => Promise<ApiLoginSuccessResponse | ApiErrorResponse>;
  logout: () => void;
}

// criando context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

