import { useAuthContext } from "./useAuthContext";
import { useComplaintsContext } from "./useComplaintsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: complaintsDispatch } = useComplaintsContext()

  const logout = () => {
    // remove user from localStorage:
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    complaintsDispatch({ type: 'SET_COMPLAINTS', payload: null })
  }

  return { logout }
}
