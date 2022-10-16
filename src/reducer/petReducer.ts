
import {
  PetFields,
  PetState,
  PetInput,
  PetIOptinalInput,
  PetColors,
  PetInputs
} from "../types/pet.type";

export const PetColorList: PetColors[] = [
  "preto",
  "branco",
  "cinza",
  "amarelo",
  "misturado",
];

type PetAction =
  | { type: "START_LOADING" | "STOP_LOADING" | "VALIDATE"}
  | {type: 'SET_IMAGES', payload: File[]} 
  | {type: 'SET_COLOR', payload: PetColors} 
  | { type: "UPDATE_FIELD"; fieldName: PetFields; payload: PetIOptinalInput }
  | { type: "SET_FIELD"; fieldName: PetFields; payload: PetInput }
  | { type: "SET_FIELDS"; payload: PetInputs };

export const petState: PetState = {
    inputs: {
        name: {value: '', msg: '', error: false, valid: false},
        age: {value: '', msg: '', error: false, valid: false},
        weight: {value: '', msg: '', error: false, valid: false},
        color: PetColorList[0],
        images: []
    },
    loading: false,
    validInputs: false
}

export function petReducer(state: PetState, action: PetAction): PetState {

    switch (action.type) {
      case "UPDATE_FIELD": {
        const { fieldName, payload } = action;

        return {
          ...state,
          inputs: {
            ...state.inputs,
            [fieldName]: { ...state.inputs[fieldName], ...payload },
          },
        };
      }
      case "SET_FIELD": {
        const { fieldName, payload } = action;
        return {
          ...state,
          inputs: {
            ...state.inputs, [fieldName]: { ...payload } 
          }
        };
      }
      case "SET_FIELDS": {
        const { payload } = action;
        return {
          ...state,
          inputs: {
            ...state.inputs,
            ...payload
          }
        };
      }
      case 'SET_IMAGES': {
        state.inputs.images = action.payload
        return state
      }
      case 'SET_COLOR': {
        state.inputs.color = action.payload
        return { ...state };
      }
      case 'VALIDATE':
          const invalidInputs = [];
    
          // loop through all inputs to find an invalid or empty inputs
          for (let fieldName in state.inputs) {
            
            if(fieldName === 'color' || fieldName === 'images'){ continue  }
            const props = state.inputs[fieldName as PetFields];

            // invalid fields
            if (!props.valid) {
              props.error = true;
              props.msg = props.value ? "Campo inválido" : "Campo obrigatório";
              const obj = { [fieldName as PetFields]: props };
              invalidInputs.push(obj);
            }
          }
    
          if (invalidInputs.length > 0) {
            return {
              ...state,
              inputs: { ...state.inputs, ...invalidInputs },
            };
          }
    
          // if there's not empty ou invalid fields
          return { ...state, validInputs: true };

      case "START_LOADING": {
        return { ...state, loading: true };
      }
      case "STOP_LOADING": {
        return { ...state, loading: false };
      }
      default: {
        return state;
      }
    }

}
