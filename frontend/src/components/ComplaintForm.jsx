import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useComplaintsContext } from "../hooks/useComplaintsContext";

const ComplaintForm = () => {
  const { dispatch } = useComplaintsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [department, setDepartment] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const [files, setFiles] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check if the total number of files after adding selectedFiles will be more than 3
    if (files.length + selectedFiles.length > 3) {
      // Display a message or take any other action if needed
      setError("You can upload only up to 3 files.")
      return
    }

    // Update the files state with the selectedFiles
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    // Disable the button if the total number of files is now 3
    setIsButtonDisabled(files.length + selectedFiles.length === 2);
  };

  const handleUploadClick = () => {
    // Implement your logic for handling the upload
    // This function will be called when the user clicks the upload button
    console.log("Uploading files:", files);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }

    const currentDateTime = new Date().toISOString()

    const complaint = { title, department, location, description, date_added: currentDateTime, }

    const response = await fetch('http://127.0.0.1:5000/account/complaints', {
      method: 'POST',
      body: JSON.stringify(complaint),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    console.log("json:  ", json)

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setDepartment('')
      setLocation('')
      setDescription('')
      setError(null)
      setEmptyFields([])
//       console.log('New complaint was added')
      dispatch({ type: 'CREATE_COMPLAINT', payload: json })
      dispatch({ type: 'SET_COMPLAINTS', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Complaint</h3>

      <label>Complaint title:
        <input
          type="text"
          onChange={(e) => {setTitle(e.target.value)}}
          name="title"
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
          maxLength={40}
        />
      </label>
      <label>Department:
        <select
          onChange={(e) => {setDepartment(e.target.value)}}
          name="department"
          value={department}
          className={emptyFields.includes('department') ? 'error' : ''}
        >
          <option value=""></option>
          <option value="Council">Council</option>
          <option value="Road Police">Road Police</option>
          <option value="Road maintenance">Road maintenance</option>
          <option value="Utility service">Utility service</option>
        </select>
      </label>
      <label>Location:
        <input
          type="text"
          onChange={(e) => {setLocation(e.target.value)}}
          name="location"
          value={location}
          className={emptyFields.includes('location') ? 'error' : ''}
        />
      </label>
      <label>Photo Report:
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={handleUploadClick} disabled={isButtonDisabled}>
          Upload
        </button>
      </label>
      <label>Description:
        <textarea
          rows="10"
          onChange={(e) => {setDescription(e.target.value)}}
          name="description"
          value={description}
          className={emptyFields.includes('description') ? 'error' : ''}
          maxLength={1000}
        />
      </label>
      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ComplaintForm;
