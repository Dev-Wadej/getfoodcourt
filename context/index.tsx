"use client"
import { useContext } from "react"
import { SettingsContext } from "./settings"

export const useSettingsContext = () => useContext(SettingsContext)
