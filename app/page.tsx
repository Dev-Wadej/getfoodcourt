"use client"
import { useEffect, useState } from "react"
import {
  checkIfHasNumber,
  checkIfHasSpecialChar,
  checkIfLowerCase,
  checkIfUpperCase,
} from "./utils"
import SettingsDialog from "./components/Modals/SettingsDialog"
import { useSettingsContext } from "@/context"

export default function Home() {
  const [showwPassword, setShowPassword] = useState(false)

  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const {
    isValid,
    handlePasswordValidityChecks,
    hasLowerCase,
    hasNumber,
    hasRequiredCharLeng,
    hasSpecialChar,
    hasUpperCase,
  } = useSettingsContext()

  const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  useEffect(() => {
    const { email, password } = formValues
    handlePasswordValidityChecks(password, email)
  }, [
    JSON.stringify(formValues),
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
    hasUpperCase,
    hasRequiredCharLeng,
  ])

  const validPassword =
    formValues.password.length > 0 &&
    isValid?.hasLowerCase &&
    isValid?.hasNumber &&
    isValid?.hasRequiredCharLeng &&
    isValid?.hasSpecialChar &&
    isValid?.hasUpperCase

  const isMediumMode =
    checkIfUpperCase(formValues?.password) &&
    checkIfLowerCase(formValues?.password) &&
    checkIfHasSpecialChar(formValues?.password)

  const isHardMode =
    formValues.password.length > 10 &&
    isMediumMode &&
    checkIfHasNumber(formValues?.password)

  return (
    <main className="flex flex-col  items-center  w-screen h-screen">
      {/* ---------Settings dialog here------ */}
      <SettingsDialog />
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

            {!isValid?.isEmail && formValues.email.length > 0 && (
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
            type="button"
            disabled={!isValid?.isEmail || !validPassword}
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
