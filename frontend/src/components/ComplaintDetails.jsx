import { useAuthContext } from "../hooks/useAuthContext";
import { useComplaintsContext } from "../hooks/useComplaintsContext";

// date fns:
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ComplaintDetails = ({ complaint }) => {
  const { dispatch } = useComplaintsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) return

    const response = await fetch(`/api/complaints/${complaint._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_COMPLAINT', payload: json })
    }
  }

  return (
    <div className="complaint-details">
      <h4>{complaint.title}</h4>
      <p><strong>Department: </strong>{complaint.department}</p>
      <p><strong>Description: </strong>{complaint.description}</p>
      <p><strong>Location: </strong>{complaint.location}</p>
      <p className="complaint-created">{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
      <span onClick={handleClick} className="material-symbols-outlined">delete</span>
    </div>
  );
};

export default ComplaintDetails;
