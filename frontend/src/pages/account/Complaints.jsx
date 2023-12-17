import { useEffect } from "react";

// hooks
import { useComplaintsContext } from "../../hooks/useComplaintsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import ComplaintDetails from "../../components/ComplaintDetails";
import ComplaintForm from "../../components/ComplaintForm";


function Complaints () {
  const { complaints, dispatch } = useComplaintsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/account/complaints', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const json = await response.json();

          dispatch({ type: 'SET_COMPLAINTS', payload: json });
        } else {
          console.error('Error fetching complaints:', response.statusText);
        }
      }
      catch (error) {
        console.error('Error fetching complaints:', error.message);
      }
    };

    if (user) {
      fetchComplaints();
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="complaints">
        <h3>Complaints</h3>
        {complaints && complaints.complaints && complaints.complaints.map((complaint) => (
          <ComplaintDetails key={complaint._id} complaint={complaint} />
        ))}
      </div>
      <aside>
        <ComplaintForm />
      </aside>
    </>
  );
}

export default Complaints;
