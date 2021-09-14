import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import TableRow from "./TableRow";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

 const [reservations, setReservations] = useState([]);
 const [reservationsError, setReservationsError] = useState(null);

 const [tables, setTables] = useState([]);
 const [tablesError, setTablesError] = useState(null);

function Dashboard({ date }) {
  const history = useHistory();
  

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    // handles race conditions for async operations
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    // all other abortControllers will dump their async calls here
    return () => abortController.abort();
  }

  const reservationsByParty = () => {
    return reservations.map((reservation) => (
      <ReservationRow
        key={reservation.reservation_id}
        reservation={reservation}
      />
    ));
  };

  const tablesByParty = () => {
    return tables.map((table) => (
      <TableRow key={table.table_id} table={table} />
    ));
  };

  return (
    <main>
      <h1>Dashboard</h1>
        {/* reservations table */}
        <h4 className="mb-0">Reservations for {date}</h4>
        <ErrorAlert error={reservationsError} />
        <table class="table">
			<thead>
				<tr>
					// "th" is a table heading. they all have a scope="col", which is used primarily for Bootstrap. (it will basically <strong> it)
					<th scope="col">Reservation ID</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Mobile Number</th>
					<th scope="col">Time</th>
					<th scope="col">People</th>
					<th scope="col">Status</th>
					<th scope="col">Seat Table</th>
				</tr>
			</thead>
			
			<tbody>{tablesByParty()}</tbody>
		</table>


        {/* tables table */}
        <h4 className="mb-0">Tables</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{tablesByParty()}</tbody>
        </table>

    <button type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
		<button type="button" onClick={() => history.push(`/dashboard`)}>Today</button>
		<button type="button" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
    </main>
  );
}

export default Dashboard;
