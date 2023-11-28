import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const register = async (name, surname, email, phone_number, password) => {
    setIsLoading(true)
    setError(null)

    // const response = await fetch('/api/user/register', {
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
