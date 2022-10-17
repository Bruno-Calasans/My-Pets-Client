
import api from "../utils/api";
import useFlash from "./useFlash";
import { UserRegister, UserLogin } from "../types/user.type";
import { saveToken, getToken, destroyToken } from "../helpers/token";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Auth,
  ApiUserRegisterSuccessResponse,
  ApiLoginSuccessResponse,
  ApiErrorResponse,
} from "../types/api.type";

// registra o usuário
export default function useAuth() {

    const [auth, setAuth] = useState<Auth>({
        authenticated: false,
        checked: false
    })

    const { createMessage } = useFlash();
    const navigate = useNavigate()

    // verify token from local storage is valid
    const checkToken = async (token: string | null) => {
        
        try {

            await api.get("/user/check", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            setAuth({ authenticated: true, checked: true })
            return true
            
        }catch(e){
            setAuth({ authenticated: false, checked: true })
            return false
        }
    }

    // set token in local storage, authorization header and auth state
    const setToken = (token: string) => {
        saveToken(token)
        api.defaults.headers.authorization =  `Bearer ${token}`;
        setAuth({...auth, authenticated: true });
    };
  
    // remove token from local storage, authorization header and auth state
    const clearToken = () => {
      destroyToken();
      api.defaults.headers.authorization = undefined;
      setAuth({ ...auth, authenticated: false });
    };

    // verifying token
    useEffect( () => {

        const token = getToken();
        if(!token){
            setAuth({ authenticated: false, checked: true })
            
        }else {
            checkToken(token).then((validToken) => {
              if (!validToken) { clearToken() }
            })
        }
        
    }, [])

    return {
        auth,
        async register(user: UserRegister){
    
            try {
                // get data from api
                const response = await api
                  .post("/user/register", user)
                  .then(rsp => rsp.data) as ApiUserRegisterSuccessResponse

                // set flash message
                createMessage({
                  msg: response.message,
                  type: "success",
                });

                // save token in all necessary pkaces
                setToken(response.token)

                // redirect to home
                navigate('/')
                return response

            } catch (e: any) {
                const response = e.response?.data as ApiErrorResponse
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
                const response = e.response?.data as ApiErrorResponse
                createMessage({ msg: response.message, type: "error"});
                return response
            }
        },
    }

}


