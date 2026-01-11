import { useState } from "react";
import { uploadPassengerImage } from "../../api/tripApi";

export default function PassengerForm({ passenger, onChange, onRemove }) {
    const [file, setFile] = useState(null);

    const handleFileChange = async (e) => {
        const f = e.target.files[0];
        setFile(f);
        if (f) {
            try {
                const res = await uploadPassengerImage(f);
                onChange({ ...passenger, imageUrl: res.data });
            } catch (err) {
                console.log("Image upload error", err);
            }
        }
    };

    return (
        <div style={container}>
            <div style={inputs}>
                <input
                    style={inputStyle}
                    placeholder="Name"
                    value={passenger.psngrName}
                    onChange={(e) => onChange({ ...passenger, psngrName: e.target.value })}
                />
                <input
                    style={inputStyle}
                    placeholder="Contact"
                    value={passenger.psngrContact}
                    onChange={(e) => onChange({ ...passenger, psngrContact: e.target.value })}
                />
                <input
                    style={inputStyle}
                    placeholder="Seat No"
                    value={passenger.seatno}
                    onChange={(e) => onChange({ ...passenger, seatno: e.target.value })}
                />
                <input
                    type="file"
                    style={fileInput}
                    onChange={handleFileChange}
                />
            </div>

            <div style={actions}>
                {passenger.imageUrl && <img src={passenger.imageUrl} width={50} style={{ borderRadius: "5px" }} />}
                <button style={removeBtn} onClick={onRemove}>Remove</button>
            </div>
        </div>
    );
}

/* ---------- Styles ---------- */
const container = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fafafa"
};

const inputs = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
};

const inputStyle = {
    flex: "1 1 150px",
    padding: "5px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
};

const fileInput = {
    flex: "1 1 150px"
};

const actions = {
    display: "flex",
    alignItems: "center",
    gap: "10px"
};

const removeBtn = {
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "4px 10px",
    cursor: "pointer",
    
};
