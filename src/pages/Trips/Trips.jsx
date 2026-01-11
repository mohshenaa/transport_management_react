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
        <div style={page}>
            <div style={header}>
                <h2 style={title}>Trips</h2>
                <Link to="/trips/new" style={addBtn}>+ Add New Trip</Link>
            </div>

            <div style={tableCard}>
                <table style={table}>
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
                            <tr key={t.tripId} style={i % 2 ? rowEven : rowOdd}>
                                <td>{i + 1}</td>
                                <td>{t.startLocation}</td>
                                <td>{t.destination}</td>
                                <td>{t.driver?.driName || "N/A"}</td>
                                <td>{t.vehicle?.viclNum || "N/A"}</td>
                                <td>{t.passengers?.length || 0}</td>
                                <td>{t.status}</td>
                                <td>
                                    <Link to={`/trips/${t.tripId}`} style={editBtn}>Edit</Link>
                                    <Link to={`/trips/${t.tripId}/details`} style={viewBtn}>View</Link>
                                    <button style={delBtn} onClick={() => handleDelete(t.tripId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {trips.length === 0 && (
                            <tr>
                                <td colSpan={8} style={{ textAlign: "center", padding: "15px" }}>
                                    No trips found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* -------- Layout Styles -------- */
const page = {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh"
};

const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
};

const title = {
    color: "#333"
};

const addBtn = {
    background: "#1976d2",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
  
};

const tableCard = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const table = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left"
};

const rowOdd = {
    background: "#fafafa"
};

const rowEven = {
    background: "#fff"
};

const editBtn = {
    marginRight: "8px",
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: "500"
};

const viewBtn = {
    marginRight: "8px",
    color: "#2e7d32",
    textDecoration: "none",
    fontWeight: "500"
};

const delBtn = {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "500"
};
