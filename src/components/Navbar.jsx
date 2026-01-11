import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const nav = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        nav("/login");
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            marginBottom: "20px"
        }}>
            <div style={{ display: "flex", gap: "15px" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
                {token && (
                    <>
                        <Link to="/trips" style={{ color: "white", textDecoration: "none" }}>Trips</Link>
                        <Link to="/drivers" style={{ color: "white", textDecoration: "none" }}>Drivers</Link>
                        <Link to="/vehicles" style={{ color: "white", textDecoration: "none" }}>Vehicles</Link>
                    </>
                )}
            </div>
            <div>
                {token ? (
                    <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
                ) : (
                    <>
                        <Link to="/login" style={{ color: "white", textDecoration: "none", marginRight: "10px" }}>Login</Link>
                        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}
