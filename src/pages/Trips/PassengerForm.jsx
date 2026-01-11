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
        <div style={{ border: "1px solid #ccc", padding: "5px", marginBottom: "5px" }}>
            <input
                placeholder="Name"
                value={passenger.psngrName}
                onChange={(e) => onChange({ ...passenger, psngrName: e.target.value })}
            />
            <input
                placeholder="Contact"
                value={passenger.psngrContact}
                onChange={(e) => onChange({ ...passenger, psngrContact: e.target.value })}
            />
            <input
                placeholder="Seat No"
                value={passenger.seatno}
                onChange={(e) => onChange({ ...passenger, seatno: e.target.value })}
            />
            <input type="file" onChange={handleFileChange} />
            {passenger.imageUrl && <img src={passenger.imageUrl} width={50} />}
            <button onClick={onRemove}>Remove</button>
        </div>
    );
}
