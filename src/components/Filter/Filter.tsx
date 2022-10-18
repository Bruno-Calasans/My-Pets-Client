
import { Container } from "./filter.style";
import { Pet } from "../../types/pet.type";
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export type SearchType =
  | "tudo"
  | "nome"
  | "dono"
  | "idade"
  | "peso"
  | "cor"
  | "descrição";

export interface Search {
    text: string
    type: SearchType
}

export function filterPets(
  search: Search,
  pets: Pet[],
  variant: "pets" | "mypets"
) {
  const filteredPets = pets.filter((pet) => {
    const { text, type } = search;
    const regex = new RegExp(text, "gi");
    const fullName =
        pet.adoption.owner.firstName + " " + pet.adoption.owner.lastName;

    switch (type) {
      case "nome": {
        return pet.name.match(regex);
      }
      case "dono": {
        return fullName.match(regex);
      }
      case "idade": {
        return pet.age.toString().match(regex);
      }
      case "peso": {
        return pet.weight.toString().match(regex);
      }
      case "cor": {
        return pet.color.match(regex);
      }
      case "descrição": {
        return pet.description.match(regex);
      }
      default: {

        switch(variant){

            case 'pets': {
                return (
                    pet.name.match(regex) ||
                    fullName.match(regex)
                )
            }
            case 'mypets': {
                return (
                  pet.name.match(regex) ||
                  pet.age.toString().match(regex) ||
                  pet.weight.toString().match(regex) ||
                  pet.color.match(regex) ||
                  pet.description.match(regex) ||
                  fullName.match(regex)
                );
            }
    
        }
      }
    }
  });

  return filteredPets;
}


interface FilterProps {
    search: Search
    types: SearchType[]
    changeHandler: (search: Search) => void
}
export default function Filter({search, types, changeHandler}: FilterProps){

    return (
      <Container>
        <TextField
          className="searchText"
          name="text"
          label="Busca"
          type="search"
          placeholder="Pesquise por um pet"
          variant="standard"
          value={search.text}
          onChange={(e) => changeHandler({ ...search, text: e.target.value })}
        />

        <FormControl variant="standard" className="searchType">
          <InputLabel id="filterType">Tipo</InputLabel>
          <Select
            labelId="filterType"
            value={search.type}
            onChange={(e) =>
              changeHandler({ ...search, type: e.target.value as SearchType })
            }
          >
            {types.map((type) => {
              return (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Container>
    );
}
