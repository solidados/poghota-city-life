import './imageModal.css';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="image-modal" onClick={onClose}>
      <img src={imageUrl} alt="Enlarged Complaint Photo" />
    </div>
  );
};

export default ImageModal;
