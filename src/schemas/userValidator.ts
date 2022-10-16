
import { number, string } from "yup";
import { regexAlpha, regexPhone } from "../helpers/regex";

// schemas
export const anyValue = string()
  .required("Campo obrigatório")
  .typeError("Não é uma string");

export function validateName(value: string, optional = false){

  const nameSchema = optional
  ? string().optional()
  : string().required("Campo obrigatório");

  if(optional && !value) { return }

  nameSchema
  .min(3, (schema) => `Tem que ter ${schema.min} ou mais caracteres`)
  .validateSync(value, {
    strict: true,
    abortEarly: true,
  });

}

export function validateEmail(value: string, optional = false){

  const phoneSchema = optional
  ? string().optional()
  : string().required("Campo obrigatório");

  if(optional && !value) { return }

  phoneSchema
  .email('Email inválido')
  .validateSync(value, {
    strict: true,
    abortEarly: true,
  })

}

export function validatePhone(value: string, optional = false){

  const phoneSchema = optional
    ? string().optional()
    : string().required("Campo obrigatório");

  if(optional && !value) { return }

  phoneSchema
  .matches(regexPhone, { message: "Telefone inválido" })
  .validateSync(value, {
    strict: true,
    abortEarly: true,
  })
 
}

export function validatePassword(password1: string, optional = false) {

  const passwordSchema = optional
    ? string().optional()
    : string().required("Campo obrigatório");

  if (optional && !password1) { return; }

  passwordSchema
    .min(8, (schema) => `Tem que ter ${schema.min} ou mais caracteres`)
    .validateSync(password1, {
      strict: true,
      abortEarly: true,
  });

}

export function comparePasswords(password1: string, password2: string) {

  const passwordSchema = 
    string()
    .min(8, (schema) => `Tem que ter ${schema.min} ou mais caracteres`)
    .equals([password2], 'Senhas não batem')
    .validateSync(password1, {
      strict: true,
      abortEarly: true,
  });

}

export function validateNumber(value: string, optional=false){

  const numberSchema = optional
  ? string().optional()
  : string().required("Campo obrigatório");

  if(optional && !value) { return }

  numberSchema
  .validateSync(value, {
    strict: true,
    abortEarly: true,
  });

}




