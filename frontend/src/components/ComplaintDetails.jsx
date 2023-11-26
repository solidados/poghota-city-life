import {useComplaintsContext} from "../hooks/useComplaintsContext";

const ComplaintDetails = ({complaint}) => {
  const {dispatch} = useComplaintsContext()

  const handleClick = async () => {
    const response = await fetch(`/api/complaints/${complaint._id}`, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_COMPLAINT', payload: json})
    }
  }

  return (
    <div className="complaint-details">
      <h4>{complaint.title}</h4>
      <p><strong>Department: </strong>{complaint.department}</p>
      <p><strong>Description: </strong>{complaint.description}</p>
      <p><strong>Location: </strong>{complaint.location}</p>
      <p>{complaint.createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default ComplaintDetails;
