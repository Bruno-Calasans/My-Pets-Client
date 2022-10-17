
document.title = 'pet info'
// react
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// style
import { Container } from "./Info.style";
import { Pet } from "../../../types/pet.type";
import useApi from './../../../hooks/useApi';

// types
import { ApiPetSuccessResponse } from './../../../types/api.type';

// my components
import Label from "../../../components/Label/Label";

// mui components
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// mui icons
import { Schedule } from "@mui/icons-material";

export default function Info(){

    const [pet, setPet] = useState<Pet | null>(null)
    const [loading, setLoading] = useState(false)
    const params = useParams<{id?: string}>()
    const api = useApi()

    const loadPet = async () => {
      if(!params.id){ return }
      const response = await api.getPetById(params.id) as ApiPetSuccessResponse;
      if (response.pet) {
        setPet(response.pet);
      }
    };

    const schedule = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if(!params.id){ return }
      scrollTo(0, 0)
      setLoading(true);
      await api.scheduleAdoption(params.id);
      setLoading(false);
    };

    useEffect(() => { 
      setLoading(true);
      loadPet() 
      setLoading(false);
    }, [])

    return (
      <Container>
        <h1 className="pageName">Adotar</h1>

        {pet ? (
          <Card className="card">
            <ImageList className="imageList" cols={2} rowHeight="auto">
              {pet.images.map((img, index) => (
                <ImageListItem key={index} className="imageItem">
                  <img
                    src={import.meta.env.VITE_PET_IMGS_UPLOAD_FOLDER + img}
                    alt={pet.name}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>

            <CardContent className="cardContent">
              <Typography className="petName" component="div" gutterBottom>
                {pet.name}
              </Typography>

              <Typography className="petInfo petAge" component="div">
                <Label start="Idade:" text={pet.age} end="meses" />
              </Typography>

              <Typography className="petInfo petWeight" component="div">
                <Label start="Peso:" text={pet.weight} end="Kg(s)" />
              </Typography>

              <Typography className="petInfo petColor" component="div">
                <Label start="Cor:" text={pet.color} />
              </Typography>
            </CardContent>

            <CardActions className="cardActions">
              {["none", "cancelled", "returned"].includes(
                pet.adoption.status
              ) ? (
                <LoadingButton
                  className="scheduleAdoptionBtn"
                  type="submit"
                  onClick={schedule}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<Schedule />}
                  variant="contained"
                >
                  {loading ? "Agendando..." : "Agendar Visita"}
                </LoadingButton>
              ) : (
                <Typography className="scheduleAdoptionMsg">
                  Visita já foi agendada
                </Typography>
              )}
            </CardActions>
          </Card>
        ) : (
          <div className="noContentMsg">
            Pet não existe ou não foi encontrado :(
          </div>
        )}
      </Container>
    );
}