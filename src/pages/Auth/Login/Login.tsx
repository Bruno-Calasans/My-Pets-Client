
document.title = "login";
import { Container } from "./Login.style";
import { useReducer, useRef, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Link} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from '../../../contexts/AuthContext';
import { LoginFields, UserLogin } from "../../../types/user";
import { validateEmail, validatePassword } from '../../../schemas/userValidator';
import formDataToObj from './../../../helpers/getObjFromFormData';
import { loginReducer, loginState } from "../../../reducer/loginReducer";

export default function Login() {

    const [state, dispatch] = useReducer(loginReducer, loginState)
    const authCtx = useContext(AuthContext)
    const form = useRef<HTMLFormElement | null>(null);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

      const inputName = e.target.getAttribute('name') as LoginFields
      let inputValue = e.target.value

      let msg = ''
      let error = false
      let valid = true

      try {

        if (inputName === "email") {
          validateEmail(inputValue)
        }

        if (inputName === "password") {
          validatePassword(inputValue)
        }
          
      } catch (e) {
        error = true
        msg = e.errors[0]
        valid = false;
      }

      dispatch({
        type: "SET_FIELD",
        fieldName: inputName,
        payload: { value: inputValue, msg, error, valid },
      });

    }

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

      dispatch({ type: "START_LOADING" });
      const formData = new FormData(form.current)
      const user = formDataToObj<UserLogin>(formData)
      dispatch({ type: "VALIDATE" });
      await authCtx.login(user);
      dispatch({ type: "STOP_LOADING" });
    }

    console.log(state);

    return (
        <>
        <h1 className="pageName">Entrar</h1>
        <Container ref={form} onSubmit={e => e.preventDefault()}>

            <TextField
            required
            error={state.inputs.email.error}
            helperText={state.inputs.email.msg}
            type='email'
            name="email"
            margin="normal"
            label="Email"
            placeholder="Email"
            variant="standard"
            onChange={inputHandler}
            value={state.inputs.email.value}
            />

            <TextField
            required
            error={state.inputs.password.error}
            helperText={state.inputs.password.msg}
            type='password'
            name="password"
            margin="normal"
            label="Senha"
            placeholder="Senha"
            variant="standard"
            onChange={inputHandler}
            value={state.inputs.password.value}
            />
            
            <LoadingButton
            type="submit"
            onClick={login}
            loading={state.loading}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            variant="outlined"
            >
            {state.loading ? 'Entrando...' : 'Entrar'}
            </LoadingButton>

            <div>
                Não tem conta? <Link href="/auth/register">Clique aqui</Link>
            </div>
            
        </Container>

        </>
    )
}