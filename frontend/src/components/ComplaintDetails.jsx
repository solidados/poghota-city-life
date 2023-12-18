import { useState } from "react";

// hooks:
import { useAuthContext } from "../hooks/useAuthContext";
import { useComplaintsContext } from "../hooks/useComplaintsContext";

// date fns:
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// components:
import Slider from 'react-slick';
import ImageModal from "./modal/ImageModal";
import defaultIcon from './uploads/default-icon.jpg';

// styles:
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ComplaintDetails = ({ complaint }) => {
  const { dispatch } = useComplaintsContext()
  const { user } = useAuthContext()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setSelectedImageIndex(next),
  };

  const handleClick = async () => {
    if (!user) return

    const response = await fetch(`http://127.0.0.1:5000/account/complaints/delete`, {
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

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
              <div key={index} onClick={() => openModal(index)}>
                <img
                  src={`data:image/png;base64,${file.content}`}
                  alt={`Complaint ${index}`}
                  style={{ maxWidth: '300px', margin: 'auto' }}
                />
              </div>
            ))}
          </Slider>
          {isModalOpen && (
            <ImageModal
              imageUrl={`data:image/png;base64,${complaint.files[selectedImageIndex].content}`}
              onClose={closeModal}
            />
          )}
        </div>
      ) : (
        <div className="complaint-photo">
          <p><strong>Photo: </strong></p>
          <img src={defaultIcon} alt={`${complaint.title}`}
               style={{ maxWidth: '300px', display: 'block', margin: 'auto' }} />
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

