import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDrivers, deleteDriver } from "../../api/driverApi";

export default function Drivers() {
    const [drivers, setDrivers] = useState([]);

    const fetchDrivers = () => {
        getDrivers()
            .then((res) => setDrivers(res.data))
            .catch((err) => console.log(err.response?.data));
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this driver?")) {
            await deleteDriver(id);
            fetchDrivers(); // refresh list
        }
    };

    return (
        <div>
            <h2>Drivers</h2>
            <Link to="/drivers/new">Add New Driver</Link>
            <table border={1} cellPadding={5} style={{ marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>License</th>
                        <th>Contact</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((d) => (
                        <tr key={d.driId}>
                            <td>{d.driName}</td>
                            <td>{d.licenseNum}</td>
                            <td>{d.contact}</td>
                            <td>{d.isAvailable ? "Yes" : "No"}</td>
                            <td>
                                <Link to={`/drivers/${d.driId}`}>Edit</Link>{" "}
                                <button onClick={() => handleDelete(d.driId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
