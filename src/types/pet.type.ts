
import { UserContact } from "./user.type";
import { Input } from "./input.type";
export type PetFields = 'name' | 'age' | 'weight' | 'color' | 'images'
export type PetColors =
  | "preta"
  | "branca"
  | "cinza"
  | "amarela"
  | "laranja"
  | "azul"
  | "rosa"
  | "vermelha"
  | "misturada"
  | "outra"

type AdoptionStatus =
  | "none"
  | "going"
  | "finished"
  | "cancelling"
  | "cancelled"
  | "returning"
  | "returned";

export interface Pet {
    _id: string
    name: string;
    age: string;
    weight: string;
    color: PetColors;
    description: string
    images: String[];
    adoption: {
        _id: string
        status: AdoptionStatus
        adopter: UserContact
        owner: UserContact
    }
    createdAt: Date | EpochTimeStamp;
    updatedAt: Date | EpochTimeStamp;
}

export interface PetRegister {
    name: string;
    age: string;
    weight: string;
    color: string;
    description: string
    images: File[]
}

export interface PetEdit {
    name?: string;
    age?: string;
    weight?: string;
    color?: string;
    description?: string
    images?: File[]
}

export interface PetInputs {
    name: Input
    age: Input
    weight: Input
    color: PetColors
    description: Input
    images: String[]
}

export interface PetState {
    inputs: PetInputs
    loading: boolean
    validInputs: boolean
}


