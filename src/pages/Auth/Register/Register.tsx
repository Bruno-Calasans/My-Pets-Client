
document.title = 'login'

// style
import { Container } from "./Register.style";

// react
import { useState, useReducer, useContext, useRef } from "react";
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";

// helpers
import {
  alphaMask,
  passwordMask,
  phoneMask,
} from "../../../helpers/maks";

// types
import { UserEdit, UserFields, UserRegister } from "../../../types/user.type";

// mui components
import LoadingButton from '@mui/lab/LoadingButton';
import {
  TextField,
  InputAdornment,
  Link,
} from "@mui/material";

// mui icons
import {
  Badge,
  Email,
  Visibility,
  VisibilityOff,
  Phone,
  Save,
} from "@mui/icons-material";

// validators
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  comparePasswords
} from "../../../schemas/userValidator";

// reducer
import {
  userState,
  userReducer,
} from "../../../reducer/userReducer";
import formDataToObj from "../../../helpers/getObjFromFormData";

export default function Register() {

  const [state, dispatch] = useReducer(userReducer, userState);
  const authCtx = useContext(AuthContext) as AuthContextType
  const form = useRef<HTMLFormElement | null>(null)

  // when 
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    const inputName = e.target.getAttribute('name') as UserFields
    let inputValue = e.target.value // valor que será inserido

    let error = false
    let msg = ''
    let valid = true

    try {

      // validando firstName e lastName
      if(inputName === 'firstName' || inputName == 'lastName') {
        inputValue = alphaMask(inputValue)
        validateName(inputValue)
      }

      // validando email
      if(inputName === 'email') {
        validateEmail(inputValue)
      }

      // validando phone
      if(inputName === 'phone'){

        inputValue = phoneMask(inputValue)
        validatePhone(inputValue)
      }

      // validando passwords
      if(inputName === 'password' || inputName == 'confirmationPassword') {
        inputValue = passwordMask(inputValue)
        validatePassword(inputValue,  true)

        if(inputName === 'confirmationPassword'){
          comparePasswords(inputValue, state.inputs.password.value)
        }
      }

    }catch(e: any){
      error = true
      msg = e.errors[0]
      valid = false;
    }

    dispatch({
      type: "SET_FIELD",
      fieldName: inputName,
      payload: {
        value: inputValue,
        error,
        msg,
        valid,
      },
    });
    
  }

  // try to register the user
  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {

    dispatch({ type: "VALIDATE" });

    const formData = new FormData(form.current as HTMLFormElement)
    const user = formDataToObj<UserRegister>(formData)

    // start request
    dispatch({ type: "START_LOADING" });
    await authCtx.register(user)
    dispatch({ type: "STOP_LOADING" });

  }

  return (
    <>
      <h1 className="pageName">Registrar Novo Usuário</h1>

      <Container ref={form} onSubmit={e => e.preventDefault()}>
        <TextField
          required
          error={state.inputs.firstName.error}
          helperText={state.inputs.firstName.msg}
          name="firstName"
          margin="normal"
          label="Primeiro Nome"
          placeholder="Escreva seu primeiro nome"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Badge />
              </InputAdornment>
            ),
          }}
          onChange={inputHandler}
          value={state.inputs.firstName.value}
        />

        <TextField
          required
          error={state.inputs.lastName.error}
          helperText={state.inputs.lastName.msg}
          name="lastName"
          label="Sobrenome"
          placeholder="Escreva seu sobrenome"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Badge />
              </InputAdornment>
            ),
          }}
          onChange={inputHandler}
          value={state.inputs.lastName.value}
        />

        <TextField
          required
          error={state.inputs.email.error}
          helperText={state.inputs.email.msg}
          name="email"
          type="email"
          label="Email"
          placeholder="Digite seu email"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          onChange={inputHandler}
          value={state.inputs.email.value}
        />

        <TextField
          required
          error={state.inputs.phone.error}
          helperText={state.inputs.phone.msg}
          name="phone"
          type="tel"
          label="Celular"
          placeholder="Digite seu celular"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
          onChange={inputHandler}
          value={state.inputs.phone.value}
        />

        <TextField
          required
          error={state.inputs.password.error}
          helperText={state.inputs.password.msg}
          name="password"
          type="password"
          label="Senha"
          placeholder="Escreva seu primeiro nome"
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Visibility />
              </InputAdornment>
            ),
          }}
          onChange={inputHandler}
          value={state.inputs.password.value}
        />

        <TextField
          required
          error={state.inputs.confirmationPassword.error}
          helperText={state.inputs.confirmationPassword.msg}
          name="confirmationPassword"
          type="password"
          id="standard-basic"
          label="Confirmação de senha"
          placeholder="Confirme sua senha"
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Visibility />
              </InputAdornment>
            ),
          }}
          onChange={inputHandler}
          value={state.inputs.confirmationPassword.value}
        />
        <LoadingButton
          type="submit"
          onClick={register}
          loading={state.loading}
          loadingPosition="start"
          startIcon={<Save />}
          variant="outlined"
        >
          {state.loading ? 'Criando' : 'Criar'}
        </LoadingButton>
        <div>
        Já tem conta? <Link href="/login">Clique aqui</Link>
        </div>
      </Container>
    </>
  );
}