import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriver, addDriver, updateDriver } from "../../api/driverApi";

export default function DriverForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const [driver, setDriver] = useState({
        driName: "",
        licenseNum: "",
        contact: "",
        imageUrl: "",
        isAvailable: true,
    });

    useEffect(() => {
        if (id) {
            getDriver(id)
                .then((res) => setDriver(res.data))
                .catch((err) => console.log(err.response?.data));
        }
    }, [id]);

    const saveDriver = async () => {
        try {
            if (id) {
                await updateDriver(id, driver);
            } else {
                await addDriver(driver);
            }
            nav("/drivers");
        } catch (err) {
            console.log("Full error:", err);
            if (err.response) {
                alert("API error: " + JSON.stringify(err.response.data));
            } else if (err.request) {
                alert("No response from server. Check API URL and CORS.");
            } else {
                alert("Error: " + err.message);
            }
        }
    };

    return (
        <div style={container}>
            <div style={card}>
                <h2 style={{ marginBottom: "15px" }}>
                    {id ? "Edit" : "New"} Driver
                </h2>

                <div style={group}>
                    <label style={label}>Name</label>
                    <input
                        style={input}
                        value={driver.driName}
                        onChange={(e) => setDriver({ ...driver, driName: e.target.value })}
                    />
                </div>

                <div style={group}>
                    <label style={label}>License Number</label>
                    <input
                        style={input}
                        value={driver.licenseNum}
                        onChange={(e) => setDriver({ ...driver, licenseNum: e.target.value })}
                    />
                </div>

                <div style={group}>
                    <label style={label}>Contact</label>
                    <input
                        style={input}
                        value={driver.contact}
                        onChange={(e) => setDriver({ ...driver, contact: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                            type="checkbox"
                            checked={driver.isAvailable}
                            onChange={(e) => setDriver({ ...driver, isAvailable: e.target.checked })}
                        />
                        Available
                    </label>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button style={saveBtn} onClick={saveDriver}>Save</button>
                    <button style={cancelBtn} onClick={() => nav("/drivers")}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

const container = {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
    fontFamily: "Arial"
};

const card = {
    width: "420px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    background: "#fff"
};

const group = { marginBottom: "12px" };

const label = { fontSize: "14px", marginBottom: "4px", display: "block" };

const input = {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc"
};

const saveBtn = {
    background: "#1976d2",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};

const cancelBtn = {
    background: "#777",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};
