import {useState} from "react";

const ComplaintForm = () => {
  const [title, setTitle] = useState('')
  const [department, setDepartment] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaint = {title, department, location, description}

    const response = await fetch('/api/complaints', {
      method: 'POST',
      body: JSON.stringify(complaint),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setTitle('')
      setDepartment('')
      setLocation('')
      setDescription('')
      setError(null)
      console.log('New complaint was added')
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Complaint</h3>

      <label>Complaint:
        <input
          type="text"
          onChange={(e) => {setTitle(e.target.value)}}
          name="title"
          value={title}
          maxLength={40}
        />
      </label>
      <label>Department:
        <select
          onChange={(e) => {setDepartment(e.target.value)}}
          name="department"
          value={department}
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
        />
      </label>
      <label>Description:
        <textarea
          rows="10"
          onChange={(e) => {setDescription(e.target.value)}}
          name="description"
          value={description}
          maxLength={1000}
        />
      </label>
      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ComplaintForm;
