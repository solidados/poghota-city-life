import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const register = async (name, surname, email, phone_number, password, value, meth, token) => {

    setIsLoading(true)
    setError(null)

    const response = await fetch(`http://127.0.0.1:5000/${value}`, {
      method: meth,
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({ name, surname, email, phone_number, password })
    })

    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // * save current user in localStorage:
      localStorage.setItem('user', JSON.stringify(json))

      // * update authContext:
      dispatch({ type: 'LOGIN', payload: json })

      setIsLoading(false)
    }
  }

  return { register, isLoading, error }
}
