
// react
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// style
import { Container } from "./info.style";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// mui icons
import { Schedule, ExpandMore } from "@mui/icons-material";
import { AuthContext } from '../../../contexts/AuthContext';
import useFlash from '../../../hooks/useFlash';

export default function Info(){

    const [pet, setPet] = useState<Pet | null>(null)
    const [loading, setLoading] = useState(false)
    const [scheduling, setScheduling] = useState(false)
    const params = useParams<{id?: string}>()
    const api = useApi()
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const { createMessage } = useFlash();

    const loadPet = async () => {
      setLoading(true);
      const response = await api.getPetById(params.id as string) as ApiPetSuccessResponse;
      if (response.pet) {
        setPet(response.pet);
      }
      setLoading(false);
    };

    const schedule = async (e: React.MouseEvent<HTMLButtonElement>) => {

      setScheduling(true);
      if(!params.id){ return }

      if(!authCtx?.auth.authenticated){ 
        createMessage({msg: "Você precisar estar logado para agendar uma visita", type: 'info'})
        return navigate('/auth/login')
      }
      scrollTo(0, 0)
      await api.scheduleAdoption(params.id);
      setScheduling(false);
    };

    useEffect(() => { loadPet() }, [])

    return (
      <>
        {loading ? <CircularProgress className="loadingSpinner"/> :
        
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

                 <Typography className="petOwner cap" component="div">
                   <Label
                     start="Dono: "
                     text={
                       pet.adoption.owner.firstName +
                       " " +
                       pet.adoption.owner.lastName
                     }
                   />
                   </Typography>
                  
                 <Accordion className='accordion'>
   
                   <AccordionSummary
                     className='accordionHeader'
                     expandIcon={<ExpandMore className='accordionExpandIcon'/>}
                   >
                     <Typography className='accordionTitle'>Descrição</Typography>
                   </AccordionSummary>
   
                   <AccordionDetails className='accordionDetails'>
                     <Typography>
                       {pet.description}
                     </Typography>
                   </AccordionDetails>
   
                 </Accordion>
               </CardContent>
   
               <CardActions className="cardActions">
                 {["none", "cancelled", "returned"].includes(
                   pet.adoption.status
                 ) ? (
                   <LoadingButton
                     className="scheduleAdoptionBtn"
                     type="submit"
                     onClick={schedule}
                     loading={scheduling}
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
        }
     
      </>
      
    );
}
