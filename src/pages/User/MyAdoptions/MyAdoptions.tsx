
// style
import { Container } from "./myadoptions.style";

// react 
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

// components
import useApi from "./../../../hooks/useApi";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

// icons
import { Cancel, VolunteerActivism } from "@mui/icons-material";

// types
import { ApiPetsSuccessResponse } from '../../../types/api.type';
import { Pet } from '../../../types/pet.type';

// my components
import Label from "../../../components/Label/Label";

export default function MyAdoptions(){

    const [adoptions, setAdoptions] = useState<Pet[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const api = useApi()

    const loadAdoptions = async () => {

      setLoading(true);
      const response = await api.getMyAdoptions() as ApiPetsSuccessResponse;
      if(response.pets){
        setAdoptions(response.pets);
      }

      setLoading(false);
    };

    const showInfo = (id: string) => {
      navigate(`/pet/info/${id}`)
    }

    const cancelAdoption = async (id: string) => {
      await api.cancelAdoption(id)
      loadAdoptions()
    }

    const returnAdoption = async (id: string) => {
      await api.startReturn(id)
      loadAdoptions()
    }

    const cancelReturn = async (id: string) => {
      await api.cancelReturn(id)
      loadAdoptions()
    }

    useEffect(() => { loadAdoptions() }, [])

    return (
      <Container>
        <h1 className="pageName">Minhas Adoções</h1>

        {loading ? (
          <CircularProgress className="loadingSpinner" />
        ) : (
          <>
            {adoptions.length === 0 ? (
              <div className="noContentMsg">Sem adoções</div>
            ) : (
              adoptions.map((pet) => {
                return (
                  <Card key={pet.name} className="card">
                    <CardActionArea
                      onClick={(e) => showInfo(pet._id)}
                      className="cardArea"
                    >
                      <Avatar
                        alt={pet.name}
                        src={
                          import.meta.env.VITE_PET_IMGS_UPLOAD_FOLDER +
                          pet.images[0]
                        }
                        sx={{ width: 120, height: 100 }}
                      />

                      <CardContent className="cardContent">
                        <Typography
                          className="petName"
                          component="div"
                          gutterBottom
                        >
                          {pet.name}
                        </Typography>

                        <Typography className="petInfo petAge" component="div">
                          <Label start="Idade:" text={pet.age} end="anos" />
                        </Typography>

                        <Typography
                          className="petInfo petWeight"
                          component="div"
                        >
                          <Label start="Peso:" text={pet.weight} end="Kg(s)" />
                        </Typography>

                        <Typography
                          className="petInfo petColor"
                          component="div"
                        >
                          <Label start="Cor:" text={pet.color} />
                        </Typography>
                      </CardContent>

                      <Typography className="adoptionContact" component="div">
                        <Label
                          start="Ligue para:"
                          text={pet.adoption.adopter.phone}
                        />
                        <Label
                          start="Falar com:"
                          text={pet.adoption.adopter.firstName}
                        />
                      </Typography>

                      <Typography className="adoptionStatus" component="div">
                        {pet.adoption.status === "going" &&
                          "Adoção em andamento"}
                        {pet.adoption.status === "finished" &&
                          "Adoção Concluída"}
                        {pet.adoption.status === "cancelled" &&
                          "Adoção Cancelada"}
                        {pet.adoption.status === "returning" &&
                          "Devolução em andamento"}
                        {pet.adoption.status === "returned" &&
                          "Devolução concluída"}
                      </Typography>
                    </CardActionArea>

                    <CardActions className="cardActions">
                      {(pet.adoption.status === "going" ||
                        pet.adoption.status === "returning") && (
                        <Button
                          className="actionBtn cancelBtn"
                          startIcon={<Cancel />}
                          variant="contained"
                          onClick={(e) => cancelAdoption(pet._id)}
                        >
                          Cancelar
                        </Button>
                      )}

                      {pet.adoption.status === "finished" && (
                        <Button
                          className="actionBtn refundBtn"
                          startIcon={<VolunteerActivism />}
                          variant="contained"
                          onClick={(e) => returnAdoption(pet._id)}
                        >
                          Devolver
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                );
              })
            )}
          </>
        )}
      </Container>
    );
}
