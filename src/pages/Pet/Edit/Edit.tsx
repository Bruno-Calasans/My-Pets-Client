
import { Container } from "./Edit.style";
import { useEffect, useState, useReducer, useRef } from "react";
import { useParams } from "react-router-dom"
import useApi from "../../../hooks/useApi"
import { ApiGetPetByIdSuccessResponse } from "../../../types/api.type"

// types
import type {
  PetColors,
  PetEdit,
  PetFields,
} from "../../../types/pet.type";

// mui components
import {
  FormControl,
  Avatar,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
  ImageList,
  ImageListItem
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// mui icons
import { Upload,  Save } from "@mui/icons-material";

// helpers
import { petReducer, petState, PetColorList } from "../../../reducer/petReducer";
import { validateName, validateNumber} from "../../../schemas/userValidator";
import { alphaMask, floatFormat, numberMask } from "../../../helpers/maks";
import formDataToObj from "../../../helpers/getObjFromFormData";


export default function Edit(){

    const [pet, dispatch] = useReducer(petReducer, petState);
    const [preview, setPreview] = useState<File[]>([])
    const form = useRef<HTMLFormElement>();
    const params = useParams<{id: string}>()
    const api = useApi()

    const loadPet = async () => {
        const response = await api.getPetById(params.id) as ApiGetPetByIdSuccessResponse

        if(response.pet){
            const { pet } = response;
            dispatch({ type: "START_LOADING" });
            dispatch({type: 'SET_FIELDS', payload: {
                name: {value: pet.name, error: false, msg: '', valid: true},
                age: {value: pet.age, error: false, msg: '', valid: true},
                weight: {value: pet.weight, error: false, msg: '', valid: true},
                color: pet.color,
                images: pet.images,
            }})
            dispatch({ type: "STOP_LOADING" });
        }
    }

    useEffect(() => { loadPet()  }, [])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const inputName = e.target.getAttribute("name") as PetFields
        let inputValue = e.target.value // valor que será inserido
    
        let error = false
        let msg = ''
        let valid = true
    
        try {
    
          // validiting name
          if (inputName === "name") {
            const originalValue = inputValue
            inputValue = alphaMask(inputValue);
            validateName(originalValue)
          }
    
          // validiting age
          if (inputName === "age") {
            const originalValue = inputValue
            inputValue = numberMask(inputValue);
            validateNumber(originalValue);
          }
    
          // validando weight
          if (inputName === "weight") {
            const originalValue = inputValue
            inputValue = floatFormat(inputValue)
            validateNumber(originalValue);
          }
    
    
        } catch (e: any) {
          error = true;
          valid = false;
          msg = e.errors[0];
        }
    
        if(inputName === 'images'){
          const imgs = Object.values(e.target.files)
          return dispatch({type: 'SET_IMAGES', payload: imgs})
        }
    
        dispatch({
          type: "SET_FIELD",
          fieldName: inputName,
          payload: { value: inputValue, msg, error, valid }
        });
    }
    
    const selectHandler = (e: SelectChangeEvent) => {
        dispatch({
          type: "SET_COLOR",
          payload: e.target.value as PetColors
        });
    }
    
    const previewHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const images = Array.from(e.target.files)
        setPreview(images)
    }
    
    const edit = async () => {
        
      dispatch({ type: "START_LOADING" });
  
      dispatch({ type: "VALIDATE" });
  
      const formData = new FormData(form.current)
      await api.editPet(params.id, formData)
  
      // scroll to the top
      scrollTo(0,0)
      dispatch({ type: "STOP_LOADING" });
  
    }
    
    return (
        
    <>
        <h1 className="pageName">Editar Pet</h1>

        <Container ref={form} onSubmit={(e) => e.preventDefault()}>

            <FormControl className="imgsPreview">
            {preview.length > 0 ?
            (<ImageList
                sx={{ width: "100%", height: 200 }}
                cols={2}
                rowHeight={164}
                >
                {preview.map((image, index) => (
                    <ImageListItem key={index}>
                    <img src={URL.createObjectURL(image)} loading="lazy" />
                    </ImageListItem>
                ))}
                </ImageList>
            ) :
            (<ImageList
                sx={{ width: "100%", height: 200 }}
                cols={2}
                rowHeight={164}
                >
                {pet.inputs.images.map((image, index) => (
                    <ImageListItem key={index}>
                    <img src={import.meta.env.VITE_IMGS_PET_FOLDER + image} loading="lazy" />
                    </ImageListItem>
                ))}
                </ImageList>
            )}
            <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
            >
                <input
                name="images"
                accept=".png,.jpg"
                type="file"
                multiple
                onChange={previewHandler}
                />
                <Upload />
            </IconButton>
            </FormControl>

            <TextField
            required
            error={pet.inputs.name.error}
            helperText={pet.inputs.name.msg}
            name="name"
            margin="normal"
            label="Nome"
            placeholder="Digite o nome do pet"
            variant="standard"
            value={pet.inputs.name.value}
            onChange={inputHandler}
            />

            <TextField
            required
            error={pet.inputs.age.error}
            helperText={pet.inputs.age.msg}
            name="age"
            label="Idade (em meses)"
            placeholder="Digite a idade do pet"
            variant="standard"
            value={pet.inputs.age.value}
            onChange={inputHandler}
            />

            <TextField
            required
            error={pet.inputs.weight.error}
            helperText={pet.inputs.weight.msg}
            name="weight"
            label="Peso (em Kg)"
            placeholder="Digite o peso do pet"
            variant="standard"
            onChange={inputHandler}
            value={pet.inputs.weight.value}
            />

            <FormControl variant="standard">
            <InputLabel id="color-selector">Cor</InputLabel>
            <Select
                labelId="color-selector"
                label="Cor"
                name="color"
                onChange={selectHandler}
                value={pet.inputs.color}
            >
                {PetColorList.map((color) => {
                return (
                    <MenuItem key={color} value={color}>
                    {color}
                    </MenuItem>
                );
                })}
            </Select>
            </FormControl>

            <LoadingButton
            type="submit"
            onClick={edit}
            loading={pet.loading}
            loadingPosition="start"
            startIcon={<Save />}
            variant="outlined"
            >
            {pet.loading ? "Salvando Edição..." : "Salvar"}
            </LoadingButton>
        </Container>
    </>
        
    )
}

