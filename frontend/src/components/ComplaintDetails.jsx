import { useAuthContext } from "../hooks/useAuthContext";
import { useComplaintsContext } from "../hooks/useComplaintsContext";
import { useState } from "react";
import defaultIcon from './uploads/default-icon.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// date fns:
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const ComplaintDetails = ({ complaint }) => {
  const { dispatch } = useComplaintsContext()
  const { user } = useAuthContext()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentImageIndex(next),
  };

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

    console.log("json:  ", json)
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
      {complaint.files && complaint.files.length > 0 ? (
        <div className="complaint-photo">
          <p>
            <strong>Photos: </strong>
          </p>
          <Slider {...settings}>
            {complaint.files.map((file, index) => (
              <div key={index}>
                <img src={`data:image/png;base64,${file.content}`} alt={`Complaint Photo ${index}`} style={{ maxWidth: '50%', margin: 'auto' }}/>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="complaint-photo">
          <p><strong>Photo: </strong></p>
            <img src={defaultIcon} alt="Default Icon" style={{ maxWidth: '50%', display: 'block', margin: 'auto' }} />
        </div>
      )}
      <p className="complaint-created">
        {`Created ${formatDistanceToNow(new Date(complaint.date_added), { addSuffix: true })}`}
      </p>
      <span onClick={handleClick} className="material-symbols-outlined">delete</span>
    </div>
  );
};

export default ComplaintDetails;

