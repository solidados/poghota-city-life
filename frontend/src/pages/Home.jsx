import {useEffect} from "react";
import {useComplaintsContext} from "../hooks/useComplaintsContext";

// components
import ComplaintDetails from "../components/ComplaintDetails";
import ComplaintForm from "../components/ComplaintForm";

const Home = () => {
  const {complaints, dispatch} = useComplaintsContext()
  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch('/api/complaints');
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_COMPLAINTS', payload: json})
      }
    }

    fetchComplaints().catch((e) => console.error(e.message))
  }, []);
  return (
    <div className="home">
      <div className="complaints">
        {complaints && complaints.map((complaint) => (
          <ComplaintDetails key={complaint._id} complaint={complaint} />
        ))}
      </div>
      <ComplaintForm />
    </div>
  );
};

export default Home;
