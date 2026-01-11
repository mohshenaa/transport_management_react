import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const nav = useNavigate();

    const submit = async e => {
        e.preventDefault();
        try {
            await api.post("/Token/Register", {
                userName: form.userName,
                email: form.email,
                password: form.password
            });
            alert("Registration successful!");
            nav("/login");
        } catch (err) {
            console.log(err.response?.data);
            alert("Registration failed — check console");
        }
    };

    return (
        <form onSubmit={submit}>
            <h2>Register</h2>

            <input placeholder="Username"
                onChange={e => setForm({ ...form, userName: e.target.value })} />

            <input placeholder="Email"
                onChange={e => setForm({ ...form, email: e.target.value })} />

            <input type="password" placeholder="Password"
                onChange={e => setForm({ ...form, password: e.target.value })} />

            <button>Register</button>
        </form>
    );
}
