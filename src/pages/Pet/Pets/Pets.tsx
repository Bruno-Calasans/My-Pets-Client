

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

import Filter, { SearchType, Search } from "../../../components/Filter/Filter";
import { filterPets } from "../../../components/Filter/Filter";

const searchTypes: SearchType[] = ['tudo', 'nome', 'dono']

export default function Pets(){

    const [pets, setPets] = useState<Pet[]>([])
    const [search, setSearch] = useState<Search>({text: '', type: 'tudo'})
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

    const filteredPets = (search.text != '') ? filterPets(search, pets, "pets") : pets

    return (
      <Container>
        <h1 className="pageName">Pets Para Adotar</h1>

        <Filter search={search} types={searchTypes} changeHandler={setSearch} />

        {filteredPets.length > 0 ? (
          <>
            <h3 className="pageSubTitle">
              Clique no card para obter mais detalhes
            </h3>

            <PetsList>
              {filteredPets.map((pet, index) => {
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
                            start="Dono: "
                            text={
                              pet.adoption.owner.firstName +
                              " " +
                              pet.adoption.owner.lastName
                            }
                          />
                        </Typography>

                        <Typography className="petCreatedAt" component="div">
                          <Label
                            start="Criado em:"
                            text={formatDate(pet.createdAt)}
                          />
                        </Typography>

                        <Typography className="petAvaliable" component="div">
                          {pet.adoption.status == "finished"
                            ? "Indisponível"
                            : ""}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
            </PetsList>
          </>
        ) : (
          <div className="noContentMsg">
             {search.text
                ? `Nenhum pet encontrado para "${search.text}" filtrando por "${search.type}"`
                : "Nenhum Pet cadastrado"
              }
          </div>
        )}
      </Container>
    );
}
