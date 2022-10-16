

import { AuthContext } from "../../contexts/AuthContext"
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useFlash from './../../hooks/useFlash';


interface CheckAuthProps {
    children : JSX.Element[] | JSX.Element
}

export default function CheckAuth({children}: CheckAuthProps){

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate()
    const { createMessage } = useFlash();

    useEffect(() => {

        if(!auth.authenticated && auth.checked){ 
            createMessage({msg: "Você deve estart logado", type: "info"})
            navigate("/auth/login");
        }
        
        if(!auth.token){
            createMessage({msg: "Você deve estar logado", type: "info"})
            navigate("/auth/login");
        }


    }, [auth.checked])


    return (
        <>
            {children}
        </>
    )

}