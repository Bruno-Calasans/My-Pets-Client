
import { createContext } from "react";
import { UserRegister } from "../types/user";

import { UserLogin } from './../types/user';

import {
  Auth,
  ApiRegisterSuccessResponse,
  ApiRegisterErrorResponse,
  ApiLoginSuccessResponse,
  ApiLoginErrorResponse
} from "../types/api.type";

interface AuthContext {
  auth: Auth;
  register: (user: UserRegister) => Promise<ApiRegisterSuccessResponse | ApiRegisterErrorResponse>;
  login: (user: UserLogin) => Promise<ApiLoginSuccessResponse | ApiLoginErrorResponse>;
  logout: () => void;
}

// criando context
export const AuthContext = createContext<AuthContext>({})

