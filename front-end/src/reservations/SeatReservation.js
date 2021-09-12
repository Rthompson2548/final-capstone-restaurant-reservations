import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

export default function SeatReservation({ reservations, tables }) {
  const history = useHistory();
  const [tableId, setTableId] = useState(0);
  const [errors, setErrors] = useState([]);

  // returns null if either field was not filled
  if (!tables || !reservations) return null;

  function validateTable() {
    // check if table with matching id exists
    // check if reservation with matching id exists
    // check if matching table's status is occupied
    // check if the capacity of the table is less than the people in reservation
    const foundErrors = [];
    const tableMatch = tables.find((table) => {
      table.table_id === tableId;
    });

    const reservationMatch = reservations.find((reservation) => {
      reservation.reservation_id === reservation_id;
    });

    // check if table exists
    if (!tableMatch) {
      foundErrors.push({ message: "Invalid table: Table does not exist" });
      // checks if reservation exists
    } else if (!reservationMatch) {
      foundErrors.push("Invalid reservation: Reservation does not exist");
    } else {
      // check if table is already occupied
      if (tableMatch.status === "occupied") {
        foundErrors.push("Invalid table: The table is occupied");
      }
      // check if there are not enough seats at table to host party
      if (tableMatch.capacity < reservationMatch.people) {
        foundErrors.push(
          `Invalid table: Table cannot seat ${foundReservation.people} people`
        );
      }
    }
    setErrors(foundErrors);
    return foundErrors.length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateTable()) {
      history.push(`/dashboard`);
    }
  }

  function handleChange({ target }) {
    setTableId(target.value);
  }

  const tableOptions = () => {
    return tables.map((table) => (
      <option value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    ));
  };

  return (
    <form>
      <label htmlFor="table_id">Choose table:</label>
      <select name="table_id" id="table_id"></select>
      {tableOptions()}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={history.goBack}>
        Cancel
      </button>
    </form>
  );
}
