import { useState, useEffect } from "react";

import DisplayTrips from "./DisplayTrips";
import CategoryFilter from "./CategoryFilter";
import apiFacade from "../apiFacade";

function TripList() {
  const [error, setError] = useState(null);
  const [initialTrips, setInitialTrips] = useState([
    {
      id: 11,
      starttime: "2025-01-25T12:34:06.865979",
      endtime: "2025-01-28T12:34:06.865979",
      longitude: 14.94,
      latitude: 58.75,
      name: "Test",
      price: 10.0,
      category: "CITY",
      guide: {
        id: 1,
        firstname: "Andreas",
        lastname: "Turkey",
        email: "andreas@mail.com",
        phone: "33293922",
        yearsOfExperience: 10,
        trips: [
          "Beach Holiday",
          "City Tour",
          "Snow boarding",
          "Living under a bridge",
        ],
      },
    },
  ]);

  const [categories, setCategories] = useState(["CITY", "BEACH", "SNOW"]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    apiFacade.fetchTripsData(setInitialTrips, (status) => {
      if (status === 401) {
        setError("Unauthorized: Please log in to view trip details.");
      } else if (status === 403) {
        setError("Forbidden: You do not have access to view trip details.");
      } else {
        setError("An error occurred while fetching trip details.");
      }
    });
    apiFacade.fetchCategories(setCategories);
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <h4>All Trips</h4>
        <CategoryFilter
          categories={categories}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />
      </div>
      <DisplayTrips trips={initialTrips} category={selectedCategory} />
    </div>
  );
}

export default TripList;
