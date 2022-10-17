
import { ConfidentialUser, UserContact } from "./user.type";
import { Pet } from "./pet.type";

export interface Auth {
  authenticated: boolean
  checked: boolean
}

export type ApiBodyError = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

export interface ApiUserSuccessResponse {
  message: string
  user: ConfidentialUser
}

export interface ApiPetSuccessResponse {
  message: string
  pet: Pet
}

export interface ApiPetsSuccessResponse {
  message: string
  pets: Pet[]
}

export interface ApiErrorResponse {
  error: boolean
  message: string
  errors?: ApiBodyError[]
}

// User Register ---------------------------------------------------------------
export interface ApiUserRegisterSuccessResponse extends ApiUserSuccessResponse {
  token: string
}

// User Login ---------------------------------------------------------------
export interface ApiLoginSuccessResponse {
  message: string
  token: string
}

// User Edit ---------------------------------------------------------------
export interface ApiUserEditSuccessResponse {
  message: string
  previousUser: ConfidentialUser
  updatedUser: ConfidentialUser
}

// Pet Edit ---------------------------------------------------------------
export interface ApiPetEditSuccessResponse {
  message: string;
  previousPet: Pet;
  updatedPet: Pet;
}

// Adoption -----------------------------------------------------------
export interface ApiPetAdoptionSuccessResponse extends ApiPetSuccessResponse{
  adopter: UserContact
  owner: UserContact
}

