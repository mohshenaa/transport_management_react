import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./components/Login";
import Register from "./components/Register";
import Trips from "./pages/Trips/Trips";
import TripForm from "./pages/Trips/TripForm";
import TripDetails from "./pages/Trips/TripDetails";
import Drivers from "./pages/Drivers/Drivers";
import DriverForm from "./pages/Drivers/DriverForm";
import Vehicles from "./pages/Vehicles/Vehicles";
import VehicleForm from "./pages/Vehicles/VehicleForm";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
    return (
        <BrowserRouter>
            {/* Navbar is always rendered */}
            <Navbar />

            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/trips" element={<PrivateRoute><Trips /></PrivateRoute>} />
                <Route path="/trips/new" element={<PrivateRoute><TripForm /></PrivateRoute>} />
                <Route path="/trips/:id" element={<PrivateRoute><TripForm /></PrivateRoute>} />
                <Route path="/trips/:id/details" element={<PrivateRoute><TripDetails /></PrivateRoute>} />

                <Route path="/drivers" element={<PrivateRoute><Drivers /></PrivateRoute>} />
                <Route path="/drivers/new" element={<PrivateRoute><DriverForm /></PrivateRoute>} />
                <Route path="/drivers/:id" element={<PrivateRoute><DriverForm /></PrivateRoute>} />

                <Route path="/vehicles" element={<PrivateRoute><Vehicles /></PrivateRoute>} />
                <Route path="/vehicles/new" element={<PrivateRoute><VehicleForm /></PrivateRoute>} />
                <Route path="/vehicles/:id" element={<PrivateRoute><VehicleForm /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
