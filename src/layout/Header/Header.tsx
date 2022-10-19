
import { Button } from "@mui/material";
import {
  Pets,
  Login,
  Logout,
  AccountCircle,
} from "@mui/icons-material";

import { Container, Content, Logo } from "./Header.style";
import { useContext } from "react";
import { AuthContextType } from "../../contexts/AuthContext";
import Menu from './../../components/Menu/Menu';
import { AuthContext } from './../../contexts/AuthContext';

interface HeaderProps{
  logoSrc: string
}

export default function Header({ logoSrc }: HeaderProps) {

  const { auth, logout } = useContext(AuthContext) as AuthContextType
 
  return (
    <Container>
      <Content>
        
        <Logo href="/">
          <img src={logoSrc} alt="logo" />
        </Logo>

        <Menu>
          <Button href="/" startIcon={<Pets />}>
            Adotar
          </Button>

          {
            // if the user is authenticated
            auth.authenticated ? (
              <>
                <Button href="/user/mypets" startIcon={<Pets />}>
                  Meus Pets
                </Button>

                <Button href="/user/myadoptions" startIcon={<Pets />}>
                  Minhas Adoções
                </Button>

                <Button href="/user/profile" startIcon={<AccountCircle />}>
                  Meu Perfil
                </Button>

                <Button
                  // href="/auth/login"
                  id="logoutBtn"
                  onClick={logout}
                  startIcon={<Logout />}
                >
                  Logout
                </Button>
              </>
            ) : (
              // if the user is not authenticated
              <>
                <Button href="/auth/login" startIcon={<Login />}>
                  Login
                </Button>

                <Button href="/auth/register" startIcon={<AccountCircle />}>
                  Register
                </Button>
              </>
            )
          }
        </Menu>
      </Content>
    </Container>
  );
}