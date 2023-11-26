import {useEffect, useState} from "react";

const Home = () => {
  const [complaints, setComplaints] = useState(null)

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch('/api/complaints');
      const json = await response.json();

      if (response.ok) {
        setComplaints(json)
      }
    }

    fetchComplaints().catch((e) => console.error(e.message))
  }, []);
  return (
    <div className="home">
      <div className="complaints">
        {complaints && complaints.map((complaint) => (
          <p key={complaint._id}>{complaint.title}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
