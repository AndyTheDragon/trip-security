import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiFacade from "../apiFacade";

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFacade.fetchTripDetails(tripId, setTrip, (status) => {
      if (status === 401) {
        setError("Unauthorized: Please log in to view trip details.");
      } else if (status === 403) {
        setError("Forbidden: You do not have access to view trip details.");
      } else {
        setError("An error occurred while fetching trip details.");
      }
    });
  }, [tripId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!trip) {
    return <p>Trip not found</p>;
  }

  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("da-DK", options).format(new Date(dateTime));
  };

  return (
    <>
      <div className="container mx-5">
        <h4>{trip.name}</h4>
        <p>
          <strong>Category:</strong> {trip.category}
        </p>
        <p>
          <strong>Start:</strong> {formatDateTime(trip.starttime)}
        </p>
        <p>
          <strong>End:</strong> {formatDateTime(trip.endtime)}
        </p>
        <p>
          <strong>Price:</strong> {trip.price} SEK
        </p>
        <h5>Packing Items</h5>
        <ul>
          {trip.packingItems.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.description}
            </li>
          ))}
        </ul>
        <p>
          <strong>Total weight:</strong>{" "}
          {trip.packingItems.reduce(
            (total, item) => total + item.weightInGrams * item.quantity,
            0
          ) / 1000}{" "}
          kg
        </p>
        <h5>Guide Details</h5>
        <p>
          <strong>Name:</strong> {trip.guide.firstname} {trip.guide.lastname}
        </p>
        <p>
          <strong>Email:</strong> {trip.guide.email}
        </p>
        <p>
          <strong>Phone:</strong> {trip.guide.phone}
        </p>
        <p>
          <strong>Years of Experience:</strong> {trip.guide.yearsOfExperience}
        </p>
      </div>
      <div className="row">
        <div className="col">
          <Link to="/trips" className="btn btn-primary">
            Back to Trips
          </Link>
        </div>
      </div>
    </>
  );
};
export default TripDetails;
