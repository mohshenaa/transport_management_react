import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVehicle, addVehicle, updateVehicle } from "../../api/vehicleApi";

export default function VehicleForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const [vehicle, setVehicle] = useState({
        viclNum: "",
        viclModel: "",
        capacity: 0,
        status: "Available",
    });

    useEffect(() => {
        if (id) {
            getVehicle(id)
                .then(res => setVehicle(res.data))
                .catch(err => console.log(err));
        }
    }, [id]);

    const saveVehicle = async () => {
        try {
            if (id) await updateVehicle(id, vehicle);
            else await addVehicle(vehicle);
            nav("/vehicles");
        } catch (err) {
            console.log("API error:", err);
            alert("Error saving vehicle: " + JSON.stringify(err.response?.data ?? err.message));
        }
    };

    return (
        <div style={container}>
            <div style={card}>
                <h2 style={{ marginBottom: "15px" }}>
                    {id ? "Edit" : "New"} Vehicle
                </h2>

                <div style={group}>
                    <label style={label}>Vehicle Number</label>
                    <input
                        style={input}
                        value={vehicle.viclNum}
                        onChange={(e) => setVehicle({ ...vehicle, viclNum: e.target.value })}
                    />
                </div>

                <div style={group}>
                    <label style={label}>Model</label>
                    <input
                        style={input}
                        value={vehicle.viclModel}
                        onChange={(e) => setVehicle({ ...vehicle, viclModel: e.target.value })}
                    />
                </div>

                <div style={group}>
                    <label style={label}>Capacity</label>
                    <input
                        style={input}
                        type="number"
                        value={vehicle.capacity}
                        onChange={(e) => setVehicle({ ...vehicle, capacity: Number(e.target.value) })}
                    />
                </div>

                <div style={group}>
                    <label style={label}>Status</label>
                    <input
                        style={input}
                        value={vehicle.status}
                        onChange={(e) => setVehicle({ ...vehicle, status: e.target.value })}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button style={saveBtn} onClick={saveVehicle}>Save</button>
                    <button style={cancelBtn} onClick={() => nav("/vehicles")}>Cancel</button>
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
