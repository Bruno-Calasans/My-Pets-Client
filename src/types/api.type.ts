
import { User, UserContact } from "./user";
import { Pet, PetRegister } from "./pet.type";

// user
export interface ApiRegisterSuccessResponse {
  message: string,
  user: string
  token: string
}

export interface ApiRegisterErrorResponse {
  error: boolean,
  message: string,
}

export interface ApiLoginSuccessResponse {
  message: string
  token: string
}

export interface ApiLoginErrorResponse {
  error: boolean
  message: string
}

export interface ApiUserEditSuccessResponse {
  message: string;
  previousUser: User;
  updatedUser: User;
}

type ApiError = { value: string; msg: string; param: string; location: string }

export interface ApiUserEditErrorResponse {
  error: boolean
  message: string;
  errors: ApiError[]
}


export interface ApiGetUserSuccessResponse {
  message: string;
  user: User;
}

export interface ApiGetUserErrorResponse {
  error: boolean
  message: string;
}


export interface ApiGetUserByIdSuccessResponse {
  message: string;
  user: User;
}

export interface ApiGetUserByIdErrorResponse {
  error: boolean
  message: string;
}

// pet
export interface ApiRegisterPetSuccessResponse {
  pet: PetRegister
  message: string;
}

export interface ApiRegisterPetErrorResponse {
  error: boolean
  message: string
  errors: ApiError[]
}

export interface ApiGetMyPetsSuccessResponse {
  pets: Pet[]
  message: string;
}

export interface ApiGetMyPetsErrorResponse {
  error: boolean
  message: string
  errors: ApiError[]
}

export interface ApiRemovePetSuccessResponse {
  pet: Pet
  message: string;
}

export interface ApiRemovePetErrorResponse {
  error: boolean
  message: string
}

export interface ApiGetPetsSuccessResponse {
  pets: Pet[]
  message: string;
}

export interface ApiGetPetsErrorResponse {
  error: boolean
  message: string
}

export interface ApiGetPetByIdSuccessResponse {
  pet: Pet
  message: string;
}

export interface ApiGetPetByIdErrorResponse {
  error: boolean
  message: string
}

export interface ApiPetEditSuccessResponse {
  message: string;
  previousPet: Pet;
  updatedPet: Pet;
}

export interface ApiPetEditErrorResponse {
  error: boolean
  message: string;
  errors: ApiError[]
}

// Adoption --------------------------------------------------------------------
export interface ApiPetScheduleAdoptionSuccessResponse {
  message: string
  pet: Pet
  adopter: UserContact
  owner: UserContact
}

export interface ApiPetScheduleAdoptionErrorResponse {
  error: boolean
  message: string;
}

export interface ApiGetAdoptionsSuccessResponse {
  message: string
  pets: Pet[]
}

export interface ApiGetAdoptionsErrorResponse {
  error: boolean
  message: string;
}

export interface ApiPetiFinishAdoptionSuccessResponse {
  message: string;
  pet: Pet;
  adopter: UserContact;
  owner: UserContact;
}

export interface ApiPetFinishAdoptionErrorResponse {
  error: boolean;
  message: string;
}

export interface Auth {
  authenticated: boolean
  checked: boolean
}
