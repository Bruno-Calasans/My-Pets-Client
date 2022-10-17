
import { Container } from "./register.style";
import { useReducer, useRef, useState } from 'react';

// types
import type { PetColors, PetFields } from "../../../types/pet.type";

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

import useApi from './../../../hooks/useApi';

export default function Register(){
  const [pet, dispatch] = useReducer(petReducer, petState);
  const [preview, setPreview] = useState<File[]>([])
  const api = useApi()
  const form = useRef<HTMLFormElement | null>(null);

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

    // if(inputName === 'images'){
    //   const imgs = Object.values(e.target.files)
    //   return dispatch({type: 'SET_IMAGES', payload: imgs})
    // }

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
    if(e.target.files){
      const images = Array.from(e.target.files)
      setPreview(images)
    }
  }

  const register = async () => {
    
    dispatch({ type: "START_LOADING" });

    dispatch({ type: "VALIDATE" });

    const formData = new FormData(form.current as HTMLFormElement)
    await api.registerPet(formData)

    // scroll to the top
    scrollTo(0,0)
    dispatch({ type: "STOP_LOADING" });

  }

  return (
    <>
      <h1 className="pageName">Registrar Pet</h1>

      <Container ref={form} onSubmit={(e) => e.preventDefault()}>

        <FormControl className="imgsPreview">
          {preview.length > 0 &&
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
          onClick={register}
          loading={pet.loading}
          loadingPosition="start"
          startIcon={<Save />}
          variant="outlined"
        >
          {pet.loading ? "Cadastrando Pet..." : "Cadastrar Pet"}
        </LoadingButton>
      </Container>
    </>
  );
}