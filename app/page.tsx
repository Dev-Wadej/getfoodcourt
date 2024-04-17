"use client"
import { useEffect, useState } from "react"
import usePersistedState from "@/hooks/usePersistedState"
import {
  checkIfHasNumber,
  checkIfHasSpecialChar,
  checkIfLowerCase,
  checkIfUpperCase,
  checkIfValidEmail,
  CONSTS,
} from "./utils"
import SettingsDialog from "./components/Modals/SettingsDialog"

export default function Home() {
  const [showwPassword, setShowPassword] = useState(false)

  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [isValid, setIsValid] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasRequiredCharLeng: false,
    hasNumber: false,
    isEmail: false,
  })
  const [hasUpperCase, setHasUpperCase] = usePersistedState<boolean>(
    CONSTS.upper_case,
    false
  )
  const [hasLowerCase, setHasLowerCase] = usePersistedState<boolean>(
    CONSTS.lower_case,
    false
  )
  const [hasNumber, setHasNumber] = usePersistedState<boolean>(
    CONSTS.lower_case,
    false
  )
  const [hasSpecialChar, setHasSpecialChar] = usePersistedState<boolean>(
    CONSTS.special_char,
    false
  )

  const [hasRequiredCharLeng, setHasRequiredCharLeng] =
    usePersistedState<boolean>(CONSTS.char_length, false)

  const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  useEffect(() => {
    setIsValid((prev) => ({
      ...prev,
      hasLowerCase: hasLowerCase
        ? checkIfLowerCase(formValues?.password)
        : true,
      hasNumber: hasNumber ? checkIfHasNumber(formValues?.password) : true,
      hasRequiredCharLeng: hasRequiredCharLeng
        ? (formValues?.password).length > 7
        : true,
      hasSpecialChar: hasSpecialChar
        ? checkIfHasSpecialChar(formValues?.password)
        : true,
      hasUpperCase: hasUpperCase
        ? checkIfUpperCase(formValues?.password)
        : true,
      isEmail:
        formValues.email.length > 0
          ? checkIfValidEmail(formValues.email)
          : false,
    }))
  }, [
    JSON.stringify(formValues),
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
    hasUpperCase,
    hasRequiredCharLeng,
  ])

  const validPassword =
    isValid.hasLowerCase &&
    isValid.hasNumber &&
    isValid.hasRequiredCharLeng &&
    isValid.hasSpecialChar &&
    isValid.hasUpperCase

  const isHardMode =
    formValues.password.length > 10 &&
    isValid.hasUpperCase &&
    isValid.hasLowerCase &&
    isValid.hasSpecialChar
  isValid.hasNumber
  const isMediumMode =
    isValid.hasUpperCase && isValid.hasLowerCase && isValid.hasSpecialChar

  return (
    <main className="flex flex-col  items-center  w-screen h-screen">
      {/* ---------Settings dialog here------ */}
      <SettingsDialog
        hasLowerCase={hasLowerCase}
        hasRequiredCharLeng={hasRequiredCharLeng}
        hasSpecialChar={hasSpecialChar}
        hasUpperCase={hasUpperCase}
        setHasLowerCase={setHasLowerCase}
        setHasRequiredCharLeng={setHasRequiredCharLeng}
        setHasUpperCase={setHasUpperCase}
        setHasSpecialChar={setHasSpecialChar}
        hasNumber={hasNumber}
        setHasNumber={setHasNumber}
      />
      {/* --------------------------------- */}
      <div className="flex flex-col justify-center flex-1">
        <form action="" className="border shadow-sm p-4 rounded w-96">
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2">
              Email <span className="text-error">*</span>
            </label>
            <input
              onChange={handleFormValues}
              type="email"
              id="email"
              name="email"
              className="border-border border rounded-md p-3 placeholder:text-xs w-full focus:outline-forground-primary"
              placeholder="Enter your email"
            />

            {!isValid.isEmail && formValues.email.length > 0 && (
              <div className="text-red-500 text-xs mt-1">
                Enter a valid email
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">
              Password <span className="text-error">*</span>
            </label>
            <div className="flex items-center justify-between border-border border rounded-md p-3  w-full group hover:outline-forground-primary focus:outline-forground-primary active:outline-forground-primary">
              <input
                onChange={handleFormValues}
                type={showwPassword ? "text" : "password"}
                id="password"
                name="password"
                className="placeholder:text-xs w-full focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                className="text-forground-primary text-xs font-semibold"
                type="button"
                onClick={handleShowPassword}
              >
                {showwPassword ? "hide" : "show"}
              </button>
            </div>
          </div>
          {formValues.password.length > 0 && (
            <div className="text-green-500 text-xs mt-1">
              {isHardMode ? "Hard" : isMediumMode ? "Medium" : "Easy"}
            </div>
          )}
          <button
            className="text-white bg-forground-primary font-medium w-full block rounded-md py-3 mt-8 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-70 transition-all"
            type="submit"
            disabled={!isValid.isEmail || !validPassword}
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
