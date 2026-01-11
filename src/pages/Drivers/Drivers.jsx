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
            fetchDrivers();
        }
    };

    return (
        <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h2>Drivers</h2>
                <Link
                    to="/drivers/new"
                    style={{
                        textDecoration: "none",
                        background: "#1976d2",
                        color: "white",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        fontSize: "14px"
                    }}
                >
                    + Add New Driver
                </Link>
            </div>

            <div style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden"
            }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f3f3f3" }}>
                        <tr>
                            <th style={th}>Name</th>
                            <th style={th}>License</th>
                            <th style={th}>Contact</th>
                            <th style={th}>Available</th>
                            <th style={th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {drivers.map((d) => (
                            <tr key={d.driId} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={td}>{d.driName}</td>
                                <td style={td}>{d.licenseNum}</td>
                                <td style={td}>{d.contact}</td>
                                <td style={td}>{d.isAvailable ? "Yes" : "No"}</td>
                                <td style={td}>
                                    <Link to={`/drivers/${d.driId}`} style={linkBtn}>Edit</Link>
                                    <button onClick={() => handleDelete(d.driId)} style={delBtn}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

const th = {
    padding: "10px",
    textAlign: "left",
    fontSize: "14px"
};

const td = {
    padding: "10px",
    fontSize: "14px"
};

const linkBtn = {
    marginRight: "10px",
    textDecoration: "none",
    color: "#1976d2",
    fontWeight: "bold"
};

const delBtn = {
    border: "none",
    background: "#e53935",
    color: "white",
    padding: "4px 10px",
    borderRadius: "4px",
    cursor: "pointer"
};
