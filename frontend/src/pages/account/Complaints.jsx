import { useEffect } from "react";
import { useComplaintsContext } from "../../hooks/useComplaintsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import ComplaintDetails from "../../components/ComplaintDetails";


function Complaints () {
  const { complaints, dispatch } = useComplaintsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch('/api/complaints', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_COMPLAINTS', payload: json })
      }
    }

    if (user) {
      fetchComplaints().catch((e) => console.error(e.message))
    }

  }, [dispatch, user]);
  return (
    <div className="complaints">
      <h3>Complaints</h3>
      {complaints && complaints.map((complaint) => (
        <ComplaintDetails key={complaint._id} complaint={complaint} />
      ))}
    </div>
  );
}

export default Complaints;
