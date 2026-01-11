import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrip } from "../../api/tripApi";

export default function TripDetails() {
    const { id } = useParams();
    const nav = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getTrip(id)
                .then(res => {
                    setTrip(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log("Error fetching trip details:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!trip) return <p>Trip not found.</p>;

    const cardStyle = {
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "15px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
    };

    const sectionTitle = {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "8px",
        borderBottom: "1px solid #ddd",
        paddingBottom: "5px",
    };

    const labelStyle = { fontWeight: "bold", width: "150px", display: "inline-block" };

    return (
        <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
                Trip Details (ID: {trip.tripId})
            </h2>

            <div style={cardStyle}>
                <div style={sectionTitle}>Trip Info</div>
                <div><span style={labelStyle}>Start Location:</span> {trip.startLocation}</div>
                <div><span style={labelStyle}>Destination:</span> {trip.destination}</div>
                <div><span style={labelStyle}>Start Date & Time:</span> {new Date(trip.startDateTime).toLocaleString()}</div>
                <div><span style={labelStyle}>End Date:</span> {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : "-"}</div>
                <div><span style={labelStyle}>Distance (Km):</span> {trip.distanceKm}</div>
                <div><span style={labelStyle}>Status:</span> {trip.status}</div>
                <div><span style={labelStyle}>Helper:</span> {trip.helper || "-"}</div>
            </div>

            <div style={cardStyle}>
                <div style={sectionTitle}>Driver</div>
                {trip.driver ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        {trip.driver.imageUrl && (
                            <img
                                src={`https://localhost:7131${trip.driver.imageUrl}`}
                                alt={trip.driver.driName}
                                width={120}
                                style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                            />
                        )}
                        <div>
                            <div><span style={labelStyle}>Name:</span> {trip.driver.driName}</div>
                            <div><span style={labelStyle}>License:</span> {trip.driver.licenseNum}</div>
                            <div><span style={labelStyle}>Contact:</span> {trip.driver.contact}</div>
                        </div>
                    </div>
                ) : (
                    <p>No driver assigned</p>
                )}
            </div>

            <div style={cardStyle}>
                <div style={sectionTitle}>Vehicle</div>
                {trip.vehicle ? (
                    <div>
                        <div><span style={labelStyle}>Vehicle Number:</span> {trip.vehicle.viclNum}</div>
                        <div><span style={labelStyle}>Model:</span> {trip.vehicle.viclModel}</div>
                        <div><span style={labelStyle}>Capacity:</span> {trip.vehicle.capacity}</div>
                        <div><span style={labelStyle}>Status:</span> {trip.vehicle.status}</div>
                    </div>
                ) : (
                    <p>No vehicle assigned</p>
                )}
            </div>

            <div style={cardStyle}>
                <div style={sectionTitle}>Passengers ({trip.passengers?.length})</div>
                {trip.passengers && trip.passengers.length > 0 ? (
                    <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead style={{ background: "#f0f0f0" }}>
                            <tr>
                                <th>Seat No</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trip.passengers.map(p => (
                                <tr key={p.psngrId}>
                                    <td>{p.seatno}</td>
                                    <td>{p.psngrName}</td>
                                    <td>{p.psngrContact}</td>
                                    <td>
                                        {p.imageUrl ? (
                                            <img
                                                src={`https://localhost:7131${p.imageUrl}`}
                                                alt={p.psngrName}
                                                width={80}
                                                style={{ borderRadius: "5px", border: "1px solid #ccc" }}
                                            />
                                        ) : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No passengers assigned</p>
                )}
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => nav("/trips")} style={{ padding: "8px 16px", fontSize: "1rem", cursor: "pointer" }}>
                    Back to Trips
                </button>
            </div>
        </div>
    );
}
