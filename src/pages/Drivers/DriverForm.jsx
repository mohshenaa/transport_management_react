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
                console.log("Response data:", err.response.data);
                alert("API error: " + JSON.stringify(err.response.data));
            } else if (err.request) {
                console.log("No response received:", err.request);
                alert("No response from server. Check API URL and CORS.");
            } else {
                console.log("Other error:", err.message);
                alert("Error: " + err.message);
            }
        }

        
    };

    return (
        <div>
            <h2>{id ? "Edit" : "New"} Driver</h2>
            <div>
                <input
                    placeholder="Name"
                    value={driver.driName}
                    onChange={(e) => setDriver({ ...driver, driName: e.target.value })}
                />
            </div>
            <div>
                <input
                    placeholder="License Number"
                    value={driver.licenseNum}
                    onChange={(e) => setDriver({ ...driver, licenseNum: e.target.value })}
                />
            </div>
            <div>
                <input
                    placeholder="Contact"
                    value={driver.contact}
                    onChange={(e) => setDriver({ ...driver, contact: e.target.value })}
                />
            </div>
            <div>
                <label>
                    Available:
                    <input
                        type="checkbox"
                        checked={driver.isAvailable}
                        onChange={(e) => setDriver({ ...driver, isAvailable: e.target.checked })}
                    />
                </label>
            </div>
            <button onClick={saveDriver}>Save</button>
        </div>
    );
}
