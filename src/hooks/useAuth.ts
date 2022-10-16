
import api from "../utils/api";
import useFlash from "./useFlash";
import { UserRegister, UserLogin } from "../types/user";
import { saveToken, getToken, destroyToken } from "../helpers/token";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Auth,
  ApiRegisterSuccessResponse,
  ApiRegisterErrorResponse,
  ApiLoginSuccessResponse,
  ApiLoginErrorResponse,
} from "../types/api.type";


// registra o usuário
export default function useAuth() {

    const [auth, setAuth] = useState<Auth>({
        authenticated: false,
        token: getToken(),
        checked: false
    })

    const { createMessage } = useFlash();
    const navigate = useNavigate()

    // verify token from local storage is valid
    const checkToken = async (token: string) => {

        try {
            const response = await api.get('/user/check', {
                headers: {
                authorization: `Bearer ${token}`
            }})
            setAuth({ ...auth, authenticated: true, checked: true })
            
        }catch(e){
            setAuth({ ...auth, authenticated: false, checked: true })
        }
    }

    // set token in local storage, authorization header and auth state
    const setToken = (token: string) => {
        saveToken(token)
        api.defaults.headers.Authorization =  `Bearer ${token}`;
        setAuth({...auth, authenticated: true, token });
    };
  
    // remove token from local storage, authorization header and auth state
    const clearToken = () => {
      destroyToken();
      api.defaults.headers.Authorization = undefined;
      setAuth({...auth, authenticated: false, token: null });
    };

    // verifying token
    useEffect( () => {
        if(auth.token){ checkToken(auth.token) }

    }, [])

    return {
        auth,
        async register(user: UserRegister){
    
            try {
                // get data from api
                const response = await api
                  .post("/user/register", user)
                  .then(rsp => rsp.data) as ApiRegisterSuccessResponse

                // set flash message
                createMessage({
                  msg: response.message,
                  type: "success",
                });

                // save token in all necessary pkaces
                setToken(response.token)

                createMessage({
                  msg: "Usuário registrado com sucesso",
                  type: "error",
                });

                // redirect to home
                navigate('/')

                return response

            } catch (e: any) {
                const response = e.response?.data as ApiRegisterErrorResponse
                createMessage({ msg: response.message, type: "error"});
                return response
            }
        },
        logout(){

            // remove token from all places where it's
            clearToken()

            // set flash message
            createMessage({ msg: "Deslogado com sucesso", type: "success" });

            // redirect to login page
            // navigate('/auth/login')
        },
        async login(user: UserLogin){

            try {

                const response = (await api
                  .post("/user/login", user)
                  .then((rsp) => rsp.data)) as ApiLoginSuccessResponse;

                createMessage({
                  msg: response.message,
                  type: "success",
                });

                setToken(response.token)
                navigate('/')
                return response
                
            } catch (e: any) {
                const response = e.response?.data as ApiLoginErrorResponse
                createMessage({ msg: response.message, type: "error"});
                return response
            }
        },
    }

}


