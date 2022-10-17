
import { UserInput, LoginFields } from "../types/user.type";


interface UserLoginState {
    inputs: {
        email: UserInput,
        password: UserInput
    },
    loading: boolean
    validInputs: boolean
}

export const loginState: UserLoginState = {
    inputs: {
      email: { value: "", error: false, msg: "", valid: false },
      password: { value: "", error: false, msg: "", valid: false },
    },
    loading: false,
    validInputs: false,
  };


type UserInputAction =
| { type: "VALIDATE" | "START_LOADING" | "STOP_LOADING" }
| { type: "SET_FIELD"; fieldName: LoginFields; payload: UserInput }


export function loginReducer(
  state: UserLoginState,
  action: UserInputAction
): UserLoginState {

  switch (action.type) {

    case "SET_FIELD": {
      const { fieldName, payload } = action;
      return {
        ...state,
        inputs: { ...state.inputs, [fieldName]: payload },
      };
    }
    case "VALIDATE":
      const invalidInputs = [];

      // loop through all inputs to find an invalid or empty input
      for (let fieldName in state.inputs) {

        const props = state.inputs[fieldName as LoginFields];

        // invalid fields
        if (!props.valid) {
          props.error = true;
          props.msg = props.value ? "Campo inválido" : "Campo obrigatório";
          const obj = { [fieldName as LoginFields]: props };
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