
document.title = 'mypets'

// react
import { useState, useEffect } from 'react';

// style
import { Container, PetsList } from "./MyPets.style";

// mui components
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

// my components
import Label from '../../../components/Label/Label';

// mui icons
import { Add, Delete, Edit, Check, Cancel } from '@mui/icons-material';

// types
import { Pet } from '../../../types/pet.type';
import {
  ApiGetMyPetsSuccessResponse,
  ApiPetFinishAdoptionErrorResponse,
} from "./../../../types/api.type";

// custom hooks
import useApi from './../../../hooks/useApi';

export default function MyPets() {

    const [pets, setPets] = useState<Pet[]>([])
    const api = useApi()

    const loadPets = async () => {
      const response = (await api.getMyPets()) as ApiGetMyPetsSuccessResponse;
      if (response.pets) {
        setPets(response.pets);
      }
    };

    const removePet = async (petId: string) => {
      await api.removePetById(petId);
      await loadPets();
    };

    const cancelAdoption = async (id: string) => {
      await api.cancelAdoption(id)
      loadPets()
    }

    const confirmAdoption = async (id: string) => {
      await api.finishAdoption(id)
      loadPets();
    };

    const confirmReturn = async (id: string) => {
      await api.finishReturn(id)
      loadPets()
    }

    const cancelReturn = async (id: string) => {
      await api.cancelReturn(id)
      loadPets()
    }

    useEffect(() => { loadPets()}, [])

    return (
      <>
        <h1 className="pageName">Meus pets</h1>

        <Container>

            <Button
            className='addBtn' 
            startIcon={<Add/>} href="/pet/register" variant="contained">
              Novo Pet
            </Button>

          {pets.length === 0 ?

            (<div className='noContentMsg'>
              Você não tem nenhum pet cadastrado
            </div>) :

          (<PetsList>
            {pets.map((pet, index) => {
                return (
                  <Card key={index} className="card">
                    <CardActionArea className="cardArea">
                      <Avatar
                        className="petAvatar"
                        src={
                          import.meta.env.VITE_PET_IMGS_UPLOAD_FOLDER +
                          pet.images[0]
                        }
                        alt={pet.name}
                      />

                      <CardContent className="cardContent">
                        <Typography className="petName" component="div">
                          {pet.name}
                        </Typography>

                        <Typography className="petAge" component="div">
                          <Label start="Idade:" text={pet.age} end="mese(s)" />
                        </Typography>

                        <Typography className="petWeight" component="div">
                          <Label start="Peso:" text={pet.weight} end="Kg(s)" />
                        </Typography>

                        <Typography className="petColor" component="div">
                          <Label start="Cor:" text={pet.color} />
                        </Typography>

                        <Typography component="div">
                          {pet.adoption.status === "none" && (
                            <p className="adoptionInfo">Sem adoções ainda :(</p>
                          )}

                          {pet.adoption.status === "going" && (
                            <p className="adoptionInfo">
                              <span className="highlight">
                                {pet.adoption.adopter.firstName}
                              </span>{" "}
                              deseja adotá-lo. Entre em contato através do
                              número{" "}
                              <span className="highlight">
                                {pet.adoption.adopter.phone}
                              </span>
                            </p>
                          )}

                          {pet.adoption.status === "cancelled" && (
                            <p className="adoptionInfo">
                              <span className="highlight">
                                {pet.adoption.adopter.firstName}
                              </span>{" "}
                              cancelou a adoção.
                            </p>
                          )}

                          {pet.adoption.status === "returned" && (
                            <p className="adoptionInfo">
                              <span className="highlight">
                                {pet.adoption.adopter.firstName}
                              </span>{" "}
                              devolveu o pet.
                            </p>
                          )}

                          {pet.adoption.status === "returning" && (
                            <p className="adoptionInfo">
                              <span className="highlight">
                                {pet.adoption.adopter.firstName}
                              </span>{" "}
                              deseja devolver o pet. Entre em contato através do
                              número{" "}
                              <span className="highlight">
                                {pet.adoption.adopter.phone}
                              </span>
                            </p>
                          )}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions className="cardBtns">
                      {["none", "cancelled", "returned"].includes(
                        pet.adoption.status
                      ) && (
                        <>
                          <Button
                            className="actionBtn editBtn"
                            href={`/pet/edit/${pet._id}`}
                            startIcon={<Edit />}
                            variant="contained"
                          >
                            Editar
                          </Button>

                          <Button
                            className="actionBtn deleteBtn"
                            onClick={(e) => removePet(pet._id)}
                            startIcon={<Delete />}
                            variant="contained"
                          >
                            Excluir
                          </Button>
                        </>
                      )}

                      {pet.adoption.status === "going" && (
                        <>
                          <Button
                            className="actionBtn confirmBtn"
                            startIcon={<Check />}
                            variant="contained"
                            onClick={(e) => confirmAdoption(pet._id)}
                          >
                            Concluir Adoção
                          </Button>

                          <Button
                            className="actionBtn cancelBtn"
                            startIcon={<Cancel />}
                            variant="contained"
                            onClick={(e) => cancelAdoption(pet._id)}
                          >
                            Cancelar Adoção
                          </Button>
                        </>
                      )}

                      {pet.adoption.status === "finished" && (
                        <div className="noContentMsg">Adotado</div>
                      )}

                      {pet.adoption.status === "returning" && (
                        <>
                          <Button
                            className="actionBtn confirmBtn"
                            startIcon={<Check />}
                            variant="contained"
                            onClick={(e) => confirmReturn(pet._id)}
                          >
                            Confirmar Devolução
                          </Button>

                          <Button
                            className="actionBtn cancelBtn"
                            startIcon={<Cancel />}
                            variant="contained"
                            onClick={(e) => cancelReturn(pet._id)}
                          >
                            Cancelar devolução
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </Card>
                );
            })}
          </PetsList> )
          }
        </Container>
      </>
    );
}