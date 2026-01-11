import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVehicles, deleteVehicle } from "../../api/vehicleApi";

export default function Vehicle() {
    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = () => {
        getVehicles()
            .then(res => setVehicles(res.data))
            .catch(err => console.log("Fetch error:", err));
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete this vehicle?")) return;

        try {
            await deleteVehicle(id);
            fetchVehicles();
        } catch (err) {
            console.log("Delete error:", err);
            alert("Failed to delete vehicle.");
        }
    };

    return (
        <div style={page}>
            <div style={header}>
                <h2 style={title}>Vehicles</h2>
                <Link to="/vehicles/new" style={addBtn}>+ Add Vehicle</Link>
            </div>

            <div style={tableCard}>
                <table style={table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Number</th>
                            <th>Model</th>
                            <th>Capacity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((v, i) => (
                            <tr key={v.viclId} style={i % 2 ? rowEven : rowOdd}>
                                <td>{i + 1}</td>
                                <td>{v.viclNum}</td>
                                <td>{v.viclModel}</td>
                                <td>{v.capacity}</td>
                                <td>{v.status}</td>
                                <td>
                                    <Link to={`/vehicles/${v.viclId}`} style={editBtn}>Edit</Link>
                                    <button style={delBtn} onClick={() => handleDelete(v.viclId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {vehicles.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: "center", padding: "15px" }}>
                                    No vehicles found.
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
  
    transition: "0.2s",
};
addBtn[':hover'] = { background: "#115293" }; // React inline style can't do hover, needs CSS or styled-components

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
    marginRight: "10px",
    color: "#1976d2",
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
