
document.title = "login";
import { Container } from "./Login.style";
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Link} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from '../../../contexts/AuthContext';
import { UserInput } from "../../../types/user";
import { validateEmail, validatePassword } from '../../../schemas/userValidator';

type LoginInputFields = 'email' | 'password'

interface UserLoginInputs {
    email: UserInput
    password: UserInput
}

export default function Login() {

    const [loading, setLoading] = useState(false)
    const authCtx = useContext(AuthContext)

    const [inputs, setInputs] = useState<UserLoginInputs>({
      email: { value: "", error: false, msg: "", valid: false },
      password: { value: "", error: false, msg: "", valid: false },
    });

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

      const inputName = e.target.getAttribute('name') as LoginInputFields
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

      setInputs({
        ...inputs,
        [inputName]: { value: inputValue, msg, error, valid },
      });

    }

    const validateInputs =  () => {

        const invalidFields = []
    
        // loop through all inputs to find an invalid or empty field
        for(let fieldName in inputs) {
    
          const fieldValue = inputs[fieldName as LoginInputFields]
    
          if (!fieldValue.valid) {
    
            fieldValue.error = true
            fieldValue.msg = fieldValue.value ? 'Campo inválido' : 'Campo obrigatório'
    
            invalidFields.push({[fieldName]: fieldValue})
          }
        }
    
        // if there's an invalid or empty input at least
        if(invalidFields.length > 0) {
          return setInputs({...inputs, ...invalidFields})
        }

        login()
    }

    const login = async () => {

      let user: any = {}
      for(let field in inputs){
        user[field] = inputs[field as LoginInputFields].value
      }

      setLoading(true);
      await authCtx.login(user);
      setLoading(false);
    }

    return (
        <>
        <h1 className="pageName">Entrar</h1>
        <Container onSubmit={e => e.preventDefault()}>

            <TextField
            required
            error={inputs.email.error}
            helperText={inputs.email.msg}
            type='email'
            name="email"
            margin="normal"
            label="Email"
            placeholder="Email"
            variant="standard"
            onChange={inputHandler}
            value={inputs.email.value}
            />

            <TextField
            required
            error={inputs.password.error}
            helperText={inputs.password.msg}
            type='password'
            name="password"
            margin="normal"
            label="Senha"
            placeholder="Senha"
            variant="standard"
            onChange={inputHandler}
            value={inputs.password.value}
            />
            
            <LoadingButton
            type="submit"
            onClick={validateInputs}
            loading={loading}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            variant="outlined"
            >
            {loading ? 'Entrando...' : 'Entrar'}
            </LoadingButton>

            <div>
                Não tem conta? <Link href="/auth/register">Clique aqui</Link>
            </div>
            
        </Container>

        </>
    )
}