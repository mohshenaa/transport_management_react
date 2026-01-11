import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips, deleteTrip } from "../../api/tripApi";

export default function Trip() {
    const [trips, setTrips] = useState([]);

    const fetchTrips = () => {
        getTrips()
            .then(res => setTrips(res.data))
            .catch(err => console.log("Fetch trips error:", err));
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete this trip?")) return;
        try {
            await deleteTrip(id);
            fetchTrips();
        } catch (err) {
            console.log(err);
            alert("Failed to delete trip");
        }
    };

    return (
        <div>
            <h2>Trips</h2>
            <Link to="/trips/new">Add New Trip</Link>
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Start</th>
                        <th>Destination</th>
                        <th>Driver</th>
                        <th>Vehicle</th>
                        <th>Passengers</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((t, i) => (
                        <tr key={t.tripId}>
                            <td>{i + 1}</td>
                            <td>{t.startLocation}</td>
                            <td>{t.destination}</td>
                            <td>{t.driver?.driName || "N/A"}</td>
                            <td>{t.vehicle?.viclNum || "N/A"}</td>
                            <td>{t.passengers?.length || 0}</td>
                            <td>{t.status}</td>
                            <td>
                                <Link to={`/trips/${t.tripId}`}>Edit</Link>{" | "}
                                <Link to={`/trips/${t.tripId}/details`}>View Details</Link>

                                <button onClick={() => handleDelete(t.tripId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
