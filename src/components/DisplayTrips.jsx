import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

// Utility function to format datetime
function formatDateTime(dateTime) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("da-DK", options).format(new Date(dateTime));
}

export const SingleTrip = ({ trip }) => {
  return (
    <Card className="">
      <Card.Header>{trip.name}</Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>Start:</strong> {formatDateTime(trip.starttime)}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>End:</strong> {formatDateTime(trip.endtime)}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Price:</strong> {trip.price} SEK
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Guide:</strong> {trip.guide.firstname}
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer>
        <Link to={`/trips/${trip.id}`} className="btn btn-primary">
          See details for this trip
        </Link>
      </Card.Footer>
    </Card>
  );
};

const DisplayTrips = ({ trips = [], category }) => {
  if (!trips || trips.length === 0) {
    return <p>No trips available</p>;
  }
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      {trips
        .filter((trip) => !category || trip.category === category.toUpperCase())
        .map((trip) => (
          <div className="col" key={trip.id}>
            <SingleTrip trip={trip} />
          </div>
        ))}
    </div>
  );
};
export default DisplayTrips;
