import React from "react";

export default function PassengerList({ passengers, onEdit, onDelete }) {
  return (
    <div>
      <h3>Passengers</h3>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Seat No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.seatNumber}</td>
              <td>
                <button onClick={() => onEdit(p)}>Edit</button>
                <button onClick={() => onDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {passengers.length === 0 && (
            <tr>
              <td colSpan={3}>No passengers</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
