import { UserContact } from "./user";

export type PetFields = 'name' | 'age' | 'weight' | 'color' | 'images'
export type PetColors = 'preto' | 'branco'| 'cinza'| 'amarelo' |'misturado'

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
    images: File[]
}

export interface PetEdit {
    name?: string;
    age?: string;
    weight?: string;
    color?: string;
    images?: File[]
}
  
  
export interface PetInput {
    value: string
    error: boolean
    msg: string
    valid: boolean
}

export interface PetInputs {
    name: PetInput
    age: PetInput
    weight: PetInput
    color: PetColors
    images: File[]
}

export interface PetIOptinalInput {
    value?: string
    error?: boolean
    msg?: string
    valid?: boolean
}
  
export interface PetInputs {
    name: PetInput
    age: PetInput
    weight: PetInput
    color: PetColors
    images: File[]
}

export interface PetState {
    inputs: PetInputs
    loading: boolean
    validInputs: boolean
}


