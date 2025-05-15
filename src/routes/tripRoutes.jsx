import TripList from "../components/TripList";
import DisplayTrips from "../components/DisplayTrips";
import TripDetails from "../components/TripDetails";
import Guides from "../components/Guides";

const tripRoutes = [
    {
        index: true,
        element: <h2>Welcome to the Trip Planner</h2>

    },
    {
        path: "trips",
        element: <TripList />
    },
    {
        path: "trips/:tripId",
        element: <TripDetails />
    },
    {
        path: "guides",
        element: <Guides />
    }
];

export default tripRoutes;