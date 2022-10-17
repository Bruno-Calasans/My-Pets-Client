
import { UserFields, UserInput } from "../types/user";

interface UserInputs {
  firstName: UserInput;
  lastName: UserInput;
  email: UserInput;
  phone: UserInput;
  password: UserInput;
  confirmationPassword: UserInput;
  image?: string
}

interface UserState {
  inputs: UserInputs;
  loading: boolean;
  validInputs: boolean;
}

export const userState: UserState = {
  inputs: {
    firstName: { value: "", error: false, msg: "", valid: false },
    lastName: { value: "", error: false, msg: "", valid: false },
    email: { value: "", error: false, msg: "", valid: false },
    phone: { value: "", error: false, msg: "", valid: false },
    password: { value: "", error: false, msg: "", valid: false },
    confirmationPassword: { value: "", error: false, msg: "", valid: false },
    // image: undefined,
  },
  loading: false,
  validInputs: false,
};

// action
type UserInputAction =
  | { type: "VALIDATE" | "START_LOADING" | "STOP_LOADING" }
  | { type: "SET_FIELD"; fieldName: UserFields; payload: UserInput }
  | { type: "SET_FIELDS"; payload: UserInputs }
  | { type: "SET_IMAGE"; payload: File  }; 

export function userReducer(state: UserState, action: UserInputAction): UserState {

  switch (action.type) {
    case "SET_FIELD": {
      const { fieldName, payload } = action;
      return {
        ...state,
        inputs: { ...state.inputs, [fieldName]: payload },
      };
    }
    case "SET_FIELDS": {
      const { payload } = action;
      return {
        ...state,
        inputs: payload,
      };
    }
    case "SET_IMAGE": {
      const { payload } = action;
      return {
        ...state,
        inputs: { ...state.inputs, image: payload },
      };
    }
    case "VALIDATE":
      const invalidInputs = [];

      // loop through all inputs to find an invalid or empty input
      for (let fieldName in state.inputs) {
        
        if(fieldName === 'image'){ continue }
        const props = state.inputs[fieldName as UserFields];

        // invalid fields
        if (!props.valid) {
          props.error = true;
          props.msg = props.value ? "Campo inválido" : "Campo obrigatório";
          const obj = { [fieldName as UserFields]: props };
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