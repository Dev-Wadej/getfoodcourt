import { useEffect, useState } from "react"

const usePersistedState = <T,>(
  key: string,
  defaultValue?: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedState = localStorage.getItem(key)
      return storedState ? JSON.parse(storedState) : defaultValue
    } catch (error) {
      console.error("Error:", error)
      return defaultValue
    }
  })
  const setStateVAlue = (value: T) => {
    try {
      setState(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error storing data in local storage:", error)
    }
  }

  useEffect(() => {
    if (state !== undefined && state !== null) {
      // console.log(state)
      setState(state)
      localStorage.setItem(key, JSON.stringify(state))
    } else {
      console.log(`Removing ${key} from localStorage`)
      localStorage.removeItem(key)
    }
  }, [key, state])

  return [state, setStateVAlue]
}

export default usePersistedState
