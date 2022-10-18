

// style
import { Container, PetsList } from "./pets.style"

// react 
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

// components
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// types
import { Pet } from "../../../types/pet.type"
import useApi from "../../../hooks/useApi"

import Label from "../../../components/Label/Label";
import { ApiPetsSuccessResponse } from "../../../types/api.type";

import formatDate from "../../../helpers/formatDate";

export default function Pets(){

    const [pets, setPets] = useState<Pet[]>([])
    const api = useApi()
    const navigate = useNavigate()

    const loadPets = async () => {
      const response = await api.getAllPets() as ApiPetsSuccessResponse
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
                              import.meta.env.VITE_PET_IMGS_UPLOAD_FOLDER +
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
                              {pet.adoption.status == "finished"
                                ? "Indisponível"
                                : ""}
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
