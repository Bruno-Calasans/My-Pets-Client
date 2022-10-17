
document.title = 'profile'

// style
import { Container } from "./profile.style";

// react
import { useState, useEffect, useReducer, useRef, useContext } from "react";

// components from MUI
import {
  TextField,
  InputAdornment,
  Avatar,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// icons from MUI
import {
    Badge,
    Email,
    Visibility,
    VisibilityOff,
    Phone,
    Save,
    Upload
} from "@mui/icons-material";
  
// helpers
import { phoneMask, alphaMask, passwordMask } from "../../../helpers/maks";
import formDataToObj from "../../../helpers/getObjFromFormData";

import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  comparePasswords
} from "../../../schemas/userValidator";

// reducer and context
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";
import { userReducer, userState } from "../../../reducer/userReducer";

// types
import { UserEdit, UserFields } from "../../../types/user.type";
import { ApiErrorResponse, ApiUserSuccessResponse } from "../../../types/api.type";

// custom hook
import useApi from '../../../hooks/useApi';

export default function Profile() {

    const [state, dispatch] = useReducer(userReducer, userState)
    const [preview, setPreview] = useState<File | null>(null);
    const authCtx = useContext(AuthContext) as AuthContextType
    const api = useApi();
    const form = useRef<HTMLFormElement | null>(null);
    
    const loadUser = async () => {
      
      const response = await api.checkUser() as ApiUserSuccessResponse

      if(response.user){
        const { firstName, lastName, email, phone, image } = response.user;
        
        dispatch({type: 'SET_FIELDS', payload: {
          firstName: {value: firstName, error: false, msg: '', valid: true},
          lastName: {value: lastName, error: false, msg: '', valid: true},
          email: {value: email, error: false, msg: '', valid: true},
          phone: {value: phone, error: false, msg: '', valid: true},
          password: {value: '', error: false, msg: '', valid: true},
          confirmationPassword: {value: '', error: false, msg: '', valid: true},
          image: image
        }})
      }
    }
    
    // loading user for the first time
    useEffect(() => { 

      if(authCtx.auth.authenticated){
        dispatch({ type: "START_LOADING" });
        loadUser();
        dispatch({ type: "STOP_LOADING" });
      }

    }, [authCtx.auth.authenticated])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

      const inputName = e.target.getAttribute("name") as UserFields
      let inputValue = e.target.value // valor que será inserido

      let error = false
      let msg = ''
      let valid = true

      try {

        // validando firstName e lastName
        if (inputName === "firstName" || inputName == "lastName") {
          const originalValue = inputValue
          inputValue = alphaMask(inputValue);
          validateName(originalValue)

        }

        // validando email
        if (inputName === "email") {
          validateEmail(inputValue)
        }

        // validando phone
        if (inputName === "phone") {
          inputValue = phoneMask(inputValue);
          validatePhone(inputValue)
        }

        // validando passwords
        if (inputName === "password" || inputName == "confirmationPassword") {

          inputValue = passwordMask(inputValue)
          validatePassword(inputValue, true)

          if(inputName === 'confirmationPassword'){
            comparePasswords(inputValue, state.inputs.password.value)

          } 

        }
      } catch (e: any) {
        error = true;
        valid = false;
        msg = e.errors[0];
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

    const previewHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files){ 
        setPreview(e.target.files[0]) 
      }
    }
    
    const update = async (e: React.MouseEvent<HTMLButtonElement>) => {

      dispatch({ type: "START_LOADING" });

      // starting validation
      dispatch({ type: "VALIDATE" });

      // creating a user obj
      const formData = new FormData(form.current as HTMLFormElement)
      const user = formDataToObj<UserEdit>(formData)

      // if user don't want to redefine your password
      if(!user.password && !user.confirmationPassword) {
        delete user.password
        delete user.confirmationPassword
      }

      // starting update
      const response = await api.editUser(user) as ApiErrorResponse
      if (!response.error) { loadUser() }

      // scrolling to the top of the page
      scrollTo(0, 0)
      dispatch({ type: "STOP_LOADING" });
    }

    return (
      <section>
        <Container ref={form} onSubmit={(e) => e.preventDefault()}>
          <Avatar
            className="avatar"
            sx={{ width: 80, height: 80 }}
            alt={state.inputs.firstName.value}
            src={
              preview
                ? URL.createObjectURL(preview)
                : state.inputs.image
                ? import.meta.env.VITE_USER_IMGS_UPLOAD_FOLDER +
                  `${state.inputs.image}`
                : ""
            }
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              name="image"
              accept=".png,.jpg"
              type="file"
              onChange={previewHandler}
            />
            <Upload />
          </IconButton>

          <Divider className="personalDataDivider">
            <Chip label="Dados Pessoais" variant="outlined" />
          </Divider>

          <TextField
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

          <Divider className="passwordDivider">
            <Chip label="Senha" variant="outlined" />
          </Divider>

          <TextField
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
            onClick={update}
            loading={state.loading}
            loadingPosition="start"
            startIcon={<Save />}
            variant="outlined"
          >
            {state.loading ? "Salvando" : "Salvar"}
          </LoadingButton>
        </Container>
      </section>
    );
}