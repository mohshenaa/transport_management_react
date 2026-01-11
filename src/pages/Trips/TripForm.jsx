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
        if (id) {
            getTrip(id).then(res => setTrip(res.data)).catch(err => console.log(err));
        }
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
        <div>
            <h2>{id ? "Edit" : "New"} Trip</h2>

            <div>
                <label>Start Location:</label><br />
                <input value={trip.startLocation} onChange={e => setTrip({ ...trip, startLocation: e.target.value })} />
            </div>

            <div>
                <label>Destination:</label><br />
                <input value={trip.destination} onChange={e => setTrip({ ...trip, destination: e.target.value })} />
            </div>

            <div>
                <label>Start Date & Time:</label><br />
                <input type="datetime-local" value={trip.startDateTime} onChange={e => setTrip({ ...trip, startDateTime: e.target.value })} />
            </div>

            <div>
                <label>End Date:</label><br />
                <input type="date" value={trip.endDate} onChange={e => setTrip({ ...trip, endDate: e.target.value })} />
            </div>

            <div>
                <label>Distance (Km):</label><br />
                <input type="number" value={trip.distanceKm} onChange={e => setTrip({ ...trip, distanceKm: Number(e.target.value) })} />
            </div>

            <div>
                <label>Helper:</label><br />
                <input value={trip.helper} onChange={e => setTrip({ ...trip, helper: e.target.value })} />
            </div>

            <div>
                <label>Driver:</label><br />
                <select value={trip.driverId} onChange={e => setTrip({ ...trip, driverId: Number(e.target.value) })}>
                    <option value={0}>Select Driver</option>
                    {drivers.map(d => <option key={d.driId} value={d.driId}>{d.driName}</option>)}
                </select>
            </div>

            <div>
                <label>Vehicle:</label><br />
                <select value={trip.vehicleId} onChange={e => setTrip({ ...trip, vehicleId: Number(e.target.value) })}>
                    <option value={0}>Select Vehicle</option>
                    {vehicles.map(v => <option key={v.viclId} value={v.viclId}>{v.viclNum}</option>)}
                </select>
            </div>

            <h3>Passengers</h3>
            {trip.passengers.map((p, i) => (
                <PassengerForm
                    key={i}
                    passenger={p}
                    onChange={(updated) => handlePassengerChange(i, updated)}
                    onRemove={() => removePassenger(i)}
                />
            ))}
            <button onClick={addPassenger}>Add Passenger</button>
            <br /><br />
            <button onClick={saveTrip}>Save Trip</button>
        </div>
    );
}
