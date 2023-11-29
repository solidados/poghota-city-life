import { Link } from "react-router-dom";

function NotFound () {
  return (
    <div className="not-found">
      <h1>Error 404</h1>
      <h2>Page Not Found</h2>
      <p>The page you navigate to was not found. Please check the address or</p>
      <Link to="/">Return Home</Link>
    </div>
  );
}

export default NotFound;
