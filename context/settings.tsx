"use client"

import {
  checkIfHasNumber,
  checkIfHasSpecialChar,
  checkIfLowerCase,
  checkIfUpperCase,
  checkIfValidEmail,
  CONSTS,
} from "@/app/utils"
import usePersistedState from "@/hooks/usePersistedState"
import { createContext, ReactNode, useState } from "react"

export type SettingsProps = {
  hasUpperCase?: boolean
  setHasUpperCase: (value: boolean) => void
  hasLowerCase?: boolean
  setHasLowerCase: (value: boolean) => void
  hasSpecialChar?: boolean
  setHasSpecialChar: (value: boolean) => void
  hasRequiredCharLeng?: boolean
  setHasRequiredCharLeng: (value: boolean) => void
  hasNumber?: boolean
  setHasNumber: (value: boolean) => void
  isValid?: {
    hasUpperCase: boolean
    hasLowerCase: boolean
    hasSpecialChar: boolean
    hasRequiredCharLeng: boolean
    hasNumber: boolean
    isEmail: boolean
  }
  handlePasswordValidityChecks: (password: string, email: string) => void
}

const defaultSettings: SettingsProps = {
  setHasLowerCase: () => {},
  setHasNumber: () => {},
  setHasRequiredCharLeng: () => {},
  setHasSpecialChar: () => {},
  setHasUpperCase: () => {},
  handlePasswordValidityChecks: () => {},
}

export const SettingsContext = createContext(defaultSettings)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [hasUpperCase, setHasUpperCase] = usePersistedState<boolean>(
    CONSTS.upper_case
  )
  const [hasLowerCase, setHasLowerCase] = usePersistedState<boolean>(
    CONSTS.lower_case
  )
  const [hasNumber, setHasNumber] = usePersistedState<boolean>(
    CONSTS.lower_case
  )
  const [hasSpecialChar, setHasSpecialChar] = usePersistedState<boolean>(
    CONSTS.special_char
  )
  const [hasRequiredCharLeng, setHasRequiredCharLeng] =
    usePersistedState<boolean>(CONSTS.char_length)

  const [isValid, setIsValid] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasRequiredCharLeng: false,
    hasNumber: false,
    isEmail: false,
  })

  const handlePasswordValidityChecks = (password: string, email: string) => {
    setIsValid((prev) => ({
      ...prev,
      hasLowerCase: hasLowerCase ? checkIfLowerCase(password) : true,
      hasNumber: hasNumber ? checkIfHasNumber(password) : true,
      hasRequiredCharLeng: hasRequiredCharLeng ? password.length > 7 : true,
      hasSpecialChar: hasSpecialChar ? checkIfHasSpecialChar(password) : true,
      hasUpperCase: hasUpperCase ? checkIfUpperCase(password) : true,
      isEmail: email.length > 0 ? checkIfValidEmail(email) : false,
    }))
  }
  const value = {
    hasUpperCase,
    setHasUpperCase,
    hasLowerCase,
    setHasLowerCase,
    hasNumber,
    setHasNumber,
    hasSpecialChar,
    setHasSpecialChar,
    hasRequiredCharLeng,
    setHasRequiredCharLeng,
    isValid,
    handlePasswordValidityChecks,
  }
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
