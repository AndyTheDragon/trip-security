import { useEffect, useState } from "react";
import apiFacade from "../apiFacade";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFacade.fetchGuides(
      setGuides,
      (status) => {
        if (status === 401) {
          setError("Unauthorized: Please log in to view guides.");
        } else if (status === 403) {
          setError("Forbidden: You do not have access to view guides.");
        } else {
          setError("An error occurred while fetching guides.");
        }
      }
    );
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!guides.length) {
    return <p>No guides available</p>;
  }

  return (
    <div className="container">
      <h2>Guides</h2>
      <p>Here you can find guides for your trips.</p>
      <ul>
        {guides.map((guide) => (
          <li key={guide.id}>
            <span>{guide.firstname} {guide.lastname}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guides;
