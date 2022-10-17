

import { AuthContext, AuthContextType } from "../../contexts/AuthContext"
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useFlash from './../../hooks/useFlash';

interface CheckAuthProps {
    children : JSX.Element[] | JSX.Element
}

export default function CheckAuth({children}: CheckAuthProps){

    const { auth } = useContext(AuthContext) as AuthContextType;
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { createMessage } = useFlash();

    useEffect(() => {

        if(auth.checked){ 

            if(!auth.authenticated){

                createMessage({
                  msg: "Você precisa estar logado para acessar esta página",
                  type: "info",
                });
                return navigate("/auth/login");
            }
            
            setLoading(false)
        }

    }, [auth.checked])


    return (
        <>
            {!loading && children}
        </>
    )

}