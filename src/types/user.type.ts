
export type UserFields =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmationPassword"
  | "phone";

export type LoginFields = 'email' | 'password'

export interface UserInput {
  value: string
  error: boolean
  msg: string
  valid: boolean
}

export interface UserRegister {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmationPassword: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface User {
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  password?: string
  createdAt: Date
  updatedAt: Date
}

export interface ConfidentialUser {
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  createdAt: Date
  updatedAt: Date
}

export interface UserEdit {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmationPassword?: string;
  image?: File
}

export interface UserContact {
  _id: string
  firstName: string
  lastName: string
  phone: string
}

