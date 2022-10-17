
import { createContext } from "react";
import { UserRegister } from "../types/user.type";
import { UserLogin } from '../types/user.type';

import {
  Auth,
  ApiLoginSuccessResponse,
  ApiErrorResponse,
} from "../types/api.type";

interface AuthContext {
  auth: Auth;
  register: (user: UserRegister) => Promise<ApiLoginSuccessResponse | ApiErrorResponse>;
  login: (user: UserLogin) => Promise<ApiLoginSuccessResponse | ApiErrorResponse>;
  logout: () => void;
}

// criando context
export const AuthContext = createContext<AuthContext>({})

