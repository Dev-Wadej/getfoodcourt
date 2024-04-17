"use client"

import { CONSTS } from "@/app/utils"
import { useEffect, useState } from "react"
import Dialog from "./DialogWrapper"
import { useSettingsContext } from "@/context"

const SettingsDialog = () => {
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false)
  const {
    setHasLowerCase,
    setHasNumber,
    setHasRequiredCharLeng,
    setHasSpecialChar,
    setHasUpperCase,
    hasLowerCase,
    hasNumber,
    hasRequiredCharLeng,
    hasSpecialChar,
    hasUpperCase,
  } = useSettingsContext()

  const handleOpenSettingsModal = () => {
    setOpenSettingsDialog(true)
  }

  const handleCheckBoxChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const states = {
      [CONSTS.upper_case]: setHasUpperCase,
      [CONSTS.lower_case]: setHasLowerCase,
      [CONSTS.special_char]: setHasSpecialChar,
      [CONSTS.char_length]: setHasRequiredCharLeng,
      [CONSTS.number]: setHasNumber,
    }
    const { name, checked } = e.target
    states?.[name]?.(checked)
  }

  useEffect(() => {
    if (
      !hasLowerCase &&
      !hasNumber &&
      !hasUpperCase &&
      !hasRequiredCharLeng &&
      !hasSpecialChar
    ) {
      handleOpenSettingsModal()
    }
  }, [])
  return (
    <>
      <button
        onClick={handleOpenSettingsModal}
        className="animate-bounce font-medium block mt-9 self-end mr-10 border border-forground-primary text-forground-primary text-xs rounded-md hover:text-white p-2 px-3 hover:bg-forground-primary"
      >
        Setting 👩🏾‍🔧
      </button>
      <Dialog
        modalTitle="Settings Modal"
        openModal={openSettingsDialog}
        setOpenModal={setOpenSettingsDialog}
      >
        <section className="text-gray-500 text-sm space-y-6 pt-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name={CONSTS.upper_case}
              id={CONSTS.upper_case}
              checked={hasUpperCase}
              onChange={handleCheckBoxChecked}
              className="accent-forground-primary cursor-pointer"
            />
            <label htmlFor={CONSTS.upper_case} className="cursor-pointer">
              At least 1 uppercase
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name={CONSTS.lower_case}
              id={CONSTS.lower_case}
              checked={hasLowerCase}
              onChange={handleCheckBoxChecked}
              className="accent-forground-primary cursor-pointer"
            />
            <label htmlFor={CONSTS.lower_case} className="cursor-pointer">
              At least 1 lowercase
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name={CONSTS.number}
              id={CONSTS.number}
              checked={hasNumber}
              onChange={handleCheckBoxChecked}
              className="accent-forground-primary cursor-pointer"
            />
            <label htmlFor={CONSTS.number} className="cursor-pointer">
              At least 1 number
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name={CONSTS.special_char}
              id={CONSTS.special_char}
              onChange={handleCheckBoxChecked}
              checked={hasSpecialChar}
              className="accent-forground-primary cursor-pointer"
            />
            <label htmlFor={CONSTS.special_char} className="cursor-pointer">
              At least 1 special character - !@#$%^&*()
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name={CONSTS.char_length}
              id={CONSTS.char_length}
              checked={hasRequiredCharLeng}
              onChange={handleCheckBoxChecked}
              className="accent-forground-primary cursor-pointer"
            />
            <label htmlFor={CONSTS.char_length} className="cursor-pointer">
              At least 8 characters long
            </label>
          </div>
        </section>
      </Dialog>
    </>
  )
}
export default SettingsDialog
