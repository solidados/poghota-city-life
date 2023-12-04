import { useAuthContext } from "../hooks/useAuthContext";
import { useComplaintsContext } from "../hooks/useComplaintsContext";

// date fns:
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ComplaintDetails = ({ complaint }) => {
  const { dispatch } = useComplaintsContext()
  const { user } = useAuthContext()


  const handleClick = async () => {
    if (!user) return

      const response = await fetch(`http://127.0.0.1:5000/account/complaints/delete`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        complaint_id: complaint._id
      })
      })

    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'SET_COMPLAINTS', payload: json })
    }
  }

  return (
    <div className="complaint-details">
      <h4>{complaint.title}</h4>
      <p><strong>Department: </strong>{complaint.department}</p>
      <p><strong>Description: </strong>{complaint.description}</p>
      <p><strong>Location: </strong>{complaint.location}</p>
      <p className="complaint-created">
        {`Created ${formatDistanceToNow(new Date(complaint.date_added), { addSuffix: true })}`}
      </p>
      <span onClick={handleClick} className="material-symbols-outlined">delete</span>
    </div>
  );
};

export default ComplaintDetails;
