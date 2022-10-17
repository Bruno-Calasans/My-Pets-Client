
import { Container } from "./menu.style";
import { ButtonGroup, IconButton } from "@mui/material";
import { Close, Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

interface MenuProps{
  children: JSX.Element[]
}

export default function Menu({children}: MenuProps){

    const [openMenu, setOpenMenu] = useState(false)
  
    const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpenMenu(previous => !previous)
    }

    return (
      <Container id="menu">

        <IconButton id="toggleMenu" onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>

        <ButtonGroup
        className={openMenu ? '' : 'toggle'}
        id="menuContent" 
        variant="text" 
        color="inherit">

            <IconButton
            id="closeBtn" 
            onClick={e => setOpenMenu(false)}>
                <Close />
            </IconButton>

            {children}

        </ButtonGroup>

      </Container>
    );
}