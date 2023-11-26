const ComplaintDetails = ({complaint}) => {
  return (
    <div className="complaint-details">
      <h4>{complaint.title}</h4>
      <p><strong>Department: </strong>{complaint.department}</p>
      <p><strong>Description: </strong>{complaint.description}</p>
      <p><strong>Location: </strong>{complaint.location}</p>
      <p>{complaint.createdAt}</p>
    </div>
  );
};

export default ComplaintDetails;
