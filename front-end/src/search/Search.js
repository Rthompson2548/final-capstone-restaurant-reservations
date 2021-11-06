import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationRow from "../dashboard/ReservationRow";

/**
 * Search component allows the user to search for a specific reservation
 * by entering in a phone number into the search field and display all
 * reservation(s) under the give phone number
 */
export default function Search() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  /**
   * updates the state of mobileNumber when the user makes any changes to it
   */
  function handleChange({ target }) {
    setMobileNumber(target.value);
  }

  /** makes a get request to list all reservations under the given mobileNumber when the "submit" button is clicked */
  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setError(null);

    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  }

  /** returns all reservation(s), if any */
  const searchResultsJSX = () => {
    return reservations.length > 0 ? (
      reservations.map((reservation) => (
        <ReservationRow
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))
    ) : (
      <tr>
        <td>No reservations found</td>
      </tr>
    );
  };

  return (
    <div className="w-80 ml-2 pr-4 mr-4 pt-4">
      <form className="">
        <ErrorAlert error={error} />

        <label className="form-label font-weight-bold" htmlFor="mobile_number">
          Enter a customer's phone number:
        </label>
        <div className="input-group w-50">
          <input
            className="form-control mr-2 border-dark rounded"
            name="mobile_number"
            id="mobile_number"
            type="tel"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
            value={FormData.mobile_number}
            required
          />
          <button
            className="btn-xs btn-outline-secondary btn-light rounded"
            type="submit"
            onClick={handleSubmit}
          >
            <img src="https://img.icons8.com/material-outlined/40/000000/search--v1.png"/>
          </button>
        </div>
      </form>

      <table className="table text-nowrap table-hover mt-4">
        <thead className="thead-dark">
          <tr className="text-center">
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>

        <tbody>{searchResultsJSX()}</tbody>
      </table>
    </div>
  );
}
