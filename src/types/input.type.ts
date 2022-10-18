
export interface Input {
    value: string
    error: boolean
    msg: string
    valid: boolean
}

export const defaultInputValue = {
  value: "",
  msg: "",
  error: false,
  valid: false,
};