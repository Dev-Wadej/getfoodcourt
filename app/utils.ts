export const CONSTS = {
  upper_case: "upper_case",
  number: "number",
  lower_case: "lower_case",
  special_char: "special_char",
  char_length: "char_length",
  email: "email",
  password: "password",
}

export const checkIfUpperCase = (password: string) =>
  !password || password.length < 1
    ? false
    : /[A-Z]|[\u0080-\u024F]/.test(password)
export const checkIfLowerCase = (password: string) =>
  !password || password.length < 1
    ? false
    : /[a-z]|[\u0080-\u024F]/.test(password)
export const checkIfHasNumber = (password: string) =>
  !password || password.length < 1 ? false : /[0123456789]/.test(password)
export const checkIfHasSpecialChar = (password: string) =>
  !password || password.length < 1
    ? false
    : /[~`!@#$%^&*()_+='"?.,]/.test(password)
export const checkIfValidEmail = (email: string) =>
  !email || email.length < 1
    ? false
    : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
