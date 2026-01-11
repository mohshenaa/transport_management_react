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
        if (!window.confirm("Are you sure to delete?")) return;

        try {
            await deleteVehicle(id);
            fetchVehicles(); // refresh list
        } catch (err) {
            console.log("Delete error:", err);
            alert("Failed to delete vehicle.");
        }
    };

    return (
        <div>
            <h2>Vehicles</h2>
            <Link to="/vehicles/new">Add New Vehicle</Link>
            <table border={1} cellPadding={5}>
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
                        <tr key={v.viclId}>
                            <td>{i + 1}</td>
                            <td>{v.viclNum}</td>
                            <td>{v.viclModel}</td>
                            <td>{v.capacity}</td>
                            <td>{v.status}</td>
                            <td>
                                <Link to={`/vehicles/${v.viclId}`}>Edit</Link>{" | "}
                                <button onClick={() => handleDelete(v.viclId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
