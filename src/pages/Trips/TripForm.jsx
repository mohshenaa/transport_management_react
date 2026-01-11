import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrip, addTrip, updateTrip } from "../../api/tripApi";
import { getDrivers } from "../../api/driverApi";
import { getVehicles } from "../../api/vehicleApi";
import PassengerForm from "./PassengerForm";

export default function TripForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const [trip, setTrip] = useState({
        startLocation: "",
        destination: "",
        startDateTime: new Date().toISOString().slice(0, 16),
        endDate: "",
        distanceKm: 0,
        status: "Scheduled",
        driverId: 0,
        vehicleId: 0,
        helper: "",
        passengers: []
    });

    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getDrivers().then(res => setDrivers(res.data));
        getVehicles().then(res => setVehicles(res.data));
        if (id) getTrip(id).then(res => setTrip(res.data)).catch(err => console.log(err));
    }, [id]);

    const handlePassengerChange = (index, updated) => {
        const newPassengers = [...trip.passengers];
        newPassengers[index] = updated;
        setTrip({ ...trip, passengers: newPassengers });
    };

    const addPassenger = () => {
        setTrip({ ...trip, passengers: [...trip.passengers, { psngrName: "", psngrContact: "", seatno: "", imageUrl: "" }] });
    };

    const removePassenger = (index) => {
        const newPassengers = trip.passengers.filter((_, i) => i !== index);
        setTrip({ ...trip, passengers: newPassengers });
    };

    const saveTrip = async () => {
        try {
            if (id) await updateTrip(id, trip);
            else await addTrip(trip);
            nav("/trips");
        } catch (err) {
            console.log("Error saving trip", err);
            alert("Error saving trip: " + JSON.stringify(err.response?.data ?? err.message));
        }
    };

    return (
        <div style={page}>
            <h2 style={{ marginBottom: "20px" }}>{id ? "Edit Trip" : "New Trip"}</h2>

            <div style={formGrid}>
                <FormRow label="Start Location">
                    <input style={input} value={trip.startLocation} onChange={e => setTrip({ ...trip, startLocation: e.target.value })} />
                </FormRow>

                <FormRow label="Destination">
                    <input style={input} value={trip.destination} onChange={e => setTrip({ ...trip, destination: e.target.value })} />
                </FormRow>

                <FormRow label="Start Date & Time">
                    <input style={input} type="datetime-local" value={trip.startDateTime} onChange={e => setTrip({ ...trip, startDateTime: e.target.value })} />
                </FormRow>

                <FormRow label="End Date">
                    <input style={input} type="date" value={trip.endDate} onChange={e => setTrip({ ...trip, endDate: e.target.value })} />
                </FormRow>

                <FormRow label="Distance (Km)">
                    <input style={input} type="number" value={trip.distanceKm} onChange={e => setTrip({ ...trip, distanceKm: Number(e.target.value) })} />
                </FormRow>

                <FormRow label="Helper">
                    <input style={input} value={trip.helper} onChange={e => setTrip({ ...trip, helper: e.target.value })} />
                </FormRow>

                <FormRow label="Driver">
                    <select style={input} value={trip.driverId} onChange={e => setTrip({ ...trip, driverId: Number(e.target.value) })}>
                        <option value={0}>Select Driver</option>
                        {drivers.map(d => <option key={d.driId} value={d.driId}>{d.driName}</option>)}
                    </select>
                </FormRow>

                <FormRow label="Vehicle">
                    <select style={input} value={trip.vehicleId} onChange={e => setTrip({ ...trip, vehicleId: Number(e.target.value) })}>
                        <option value={0}>Select Vehicle</option>
                        {vehicles.map(v => <option key={v.viclId} value={v.viclId}>{v.viclNum}</option>)}
                    </select>
                </FormRow>
            </div>

            <h3 style={{ marginTop: "20px" }}>Passengers</h3>
            <div style={passengerList}>
                {trip.passengers.map((p, i) => (
                    <PassengerForm
                        key={i}
                        passenger={p}
                        onChange={updated => handlePassengerChange(i, updated)}
                        onRemove={() => removePassenger(i)}
                    />
                ))}
                <button style={addBtn} onClick={addPassenger}>+ Add Passenger</button>
            </div>

            <button style={saveBtn} onClick={saveTrip}>Save Trip</button>
            <button style={cancelBtn} onClick={() => nav("/Trips")}>Cancel</button>
        </div>
    );
}

function FormRow({ label, children }) {
    return (
        <div style={formRow}>
            <label style={{ fontWeight: "bold", fontSize: "0.9rem", marginBottom: "3px" }}>{label}</label>
            {children}
        </div>
    );
}


/* ----- Styles ----- */
const page = {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f8f9fa",
    minHeight: "100vh"
};

const formGrid = {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
};

const formRow = {
    flex: "1 1 250px", // grow 1, shrink 1, min width 250px
    display: "flex",
    flexDirection: "column"
}

const input = {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.9rem"
};

const passengerList = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "15px"
};

const addBtn = {
    background: "#1976d2",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    width: "140px",
    fontWeight: "bold",
    fontSize: "0.85rem"
};

const saveBtn = {
    background: "#2e7d32",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9rem"
};
const cancelBtn = {
    background: "#777",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};