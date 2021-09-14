import React, { useState } from "react";
import ReservationRow from "../dashboard/ReservationRow";
import { listReservations } from "../utils/api";

export default function Search() {
  const [error, setError] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);

  function handleChange({ target }) {
    setMobileNumber(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const abortController = new AbortController();

    setError(null);

    // listReservations() is a function from /utls/api.js
    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  }

  const findReservations = () => {
    return reservations.length > 0 ? (
      reservations.map((reservation) => (
        <ReservationRow
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))
    ) : (
      <p>No reservations found</p>
    );
  };

  return (
    <div>
      <form>
        <ErrorAlert error={error} />

        <label htmlFor="mobile_number">Enter a customer's phone number:</label>
        <input
          name="mobile_number"
          id="mobile_number"
          type="tel"
          onChange={handleChange}
          value={mobileNumber}
          placeholder="Enter a customer's phone number"
          required
        />

        <button type="submit" onClick={handleSubmit}>
          Find
        </button>
      </form>

      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>

        <tbody>{findReservations()}</tbody>
      </table>
    </div>
  );
}
