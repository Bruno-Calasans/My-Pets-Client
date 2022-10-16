
document.title = 'home'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { Container, PetsList } from "./Pets.style"

import { Pet } from "../../../types/pet.type"
import useApi from "../../../hooks/useApi"

import { useNavigate } from "react-router";
import { ApiGetPetsSuccessResponse, ApiGetUserByIdSuccessResponse } from "../../../types/api.type";
import  { User } from "../../../types/user";
import { AuthContext } from "../../../contexts/AuthContext";

import Label from "../../../components/Label/Label";


function formatDate(timestamp: Date | EpochTimeStamp, separator='/'){

  const date = new Date(timestamp)
  const day = date.getUTCDay()
  const month = date.getUTCMonth()
  const year = date.getFullYear()

  return `${day}${separator}${month}${separator}${year}`

}

export default function Pets(){

    const [pets, setPets] = useState<Pet[]>([])
    const api = useApi()
    const navigate = useNavigate()

    const loadPets = async () => {
      const response = await api.getAllPets() as ApiGetPetsSuccessResponse
      if(response.pets){
        setPets(response.pets)
      }
    }

    const showPetInfo = (id: string) => {
      navigate(`/pet/info/${id}`);
    };

    useEffect(() => { loadPets() }, []);

    return (

        <Container>
            <h1 className="pageName">Pets Para Adotar</h1>

            {pets.length > 0 ? 
            (<>
                <p>Clique em algum card para obter mais informações</p>
                <PetsList> 
                    {pets.map((pet, index) => {
                    
                    // if(pet.adoption.status === 1){ return false }

                    return (
                      <Card className="card" component="div" key={index}>
                        
                        <CardActionArea
                          className="cardArea"
                          onClick={(e) => showPetInfo(pet._id)}
                        >
                          <CardMedia
                            className="cardMedia"
                            component="img"
                            image={
                              import.meta.env.VITE_IMGS_PET_FOLDER +
                              pet.images[0]
                            }
                          />

                          <CardContent className="cardContent">
                            <Typography className="petName" component="div">
                              {pet.name}
                            </Typography>

                            <Typography className="petOwner" component="div">
                              <Label
                                start="Por: "
                                text={
                                  pet.adoption.owner.firstName +
                                  " " +
                                  pet.adoption.owner.lastName 
                                }
                              />
                            </Typography>

                            <Typography
                              className="petCreatedAt"
                              component="div"
                            >
                              <Label
                                start="Criado em:"
                                text={formatDate(pet.createdAt)}
                              />
                            </Typography>

                            <Typography
                              className="petAvaliable"
                              component="div"
                            >
                              {pet.adoption.status == 1 ? "Indisponível" : ""}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    );})}
                </PetsList> 
            </>)
           : <div className="noContentMsg">Sem Pets Cadastrados</div>
        }

        </Container>
    )
}