import {useContext} from "react";
import {ComplaintsContext} from '../context/ComplaintContext';

export const useComplaintsContext = () => {
  const context = useContext(ComplaintsContext);

  if (!context) {
    throw Error('useComplaintsContext must be inside of ComplaintsContextProvider')
  }
  return context;
}
