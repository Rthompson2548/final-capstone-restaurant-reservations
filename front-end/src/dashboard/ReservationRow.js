import React from "react";

export default function ReservationRow({ reservation }) {
  if (!reservation || reservation.status === "finished") return null;

  function handleCancel(event) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      // api call here later

      // reloads current url like a refresh button
      window.location.reload();
    }
  }

  return (
    <tr>
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      // us-08
      <button
        data-reservation-id-cancel={reservation.reservation_id}
        type="button"
        onClick={handleCancel()}
      >
        Cancel
      </button>
      ;
      <td>
        {/* navigates to "edit" page when clicked */}
        <a href={`/reservations/${reservation_id}/edit`}>
          <button type="button">Edit</button>
        </a>
      </td>
      {reservation.status === "booked" && (
        <td>
          <a href={`/reservations/${reservation.reservation_id}/seat`}>
            <button type="button">Seat</button>
          </a>
        </td>
      )}
    </tr>
  );
}
