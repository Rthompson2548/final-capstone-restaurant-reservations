import React from "react";

// destructure and use "reservation" as input to access all data from object
export default function ReservationRow({ reservation }) {
  if (!reservation) return null;
  return (
    <tr>
      {/* reservation row info */}
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td>{reservation.status}</td>

      {/* seat button */}
      <td>
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
          <button type="button">Seat</button>
        </a>
      </td>
    </tr>
  );
}
