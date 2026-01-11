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
        <div>
            <h2>{id ? "Edit" : "New"} Vehicle</h2>
            <input
                placeholder="Vehicle Number"
                value={vehicle.viclNum}
                onChange={(e) => setVehicle({ ...vehicle, viclNum: e.target.value })}
            />
            <input
                placeholder="Model"
                value={vehicle.viclModel}
                onChange={(e) => setVehicle({ ...vehicle, viclModel: e.target.value })}
            />
            <input
                type="number"
                placeholder="Capacity"
                value={vehicle.capacity}
                onChange={(e) => setVehicle({ ...vehicle, capacity: Number(e.target.value) })}
            />
            <input
                placeholder="Status"
                value={vehicle.status}
                onChange={(e) => setVehicle({ ...vehicle, status: e.target.value })}
            />
            <button onClick={saveVehicle}>Save</button>
        </div>
    );
}
