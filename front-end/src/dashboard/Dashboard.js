import React from "react";
import { useHistory } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationRow from "./ReservationRow";
import TableRow from "./TableRow";

/**
 * Defines the dashboard page.
 */
function Dashboard({
  date,
  reservations,
  reservationsError,
  tables,
  tablesError,
  loadDashboard,
}) {
  const history = useHistory();

  // const reservationsJSX = () => {
  //   if (reservations && reservations.length > 0) {
  //     return reservations.map((reservation) => (
  //       <ReservationRow
  //         key={reservation.reservation_id}
  //         reservation={reservation}
  //         loadDashboard={loadDashboard}
  //       />
  //     ));
  //   } else {
  //     return <div>No reservations found</div>;
  //   }
  // };

  // const tablesJSX = () => {
  //   if (tables && table.length > 0) {
  //     return tables.map((table) => (
  //       <TableRow
  //         key={table.table_id}
  //         table={table}
  //         loadDashboard={loadDashboard}
  //       />
  //     ));
  //   } else {
  //     return <div>No reservations found</div>;
  //   }
  // };

  const reservationsJSX = () => {
		return reservations.map((reservation) => 
			<ReservationRow key={reservation.reservation_id} reservation={reservation} loadDashboard={loadDashboard} />);
	};
 
  const tablesJSX = () => {
    return tables.map((table) => (
      <TableRow
        key={table.table_id}
        table={table}
        loadDashboard={loadDashboard}
      />
    ));
  };
  function handleClick({ target }) {
    let newDate;
    let useDate;

    /** uses:
     * previous() to set the reservations' list date to be the previous day
     * next() to set the reservations' list date to be the following day
     * today() to set reservation's list date to current day
     */
    if (!date) {
      useDate = today();
    } else {
      useDate = date;
    }

    if (target.name === "previous") {
      newDate = previous(useDate);
    } else if (target.name === "next") {
      newDate = next(useDate);
    } else {
      newDate = today();
    }

    history.push(`/dashboard?date=${newDate}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <h4 className="mb-0">Reservations for {date}</h4>

      <button
        className="btn btn-secondary m-1"
        type="button"
        name="previous"
        onClick={handleClick}
      >
        Previous
      </button>
      <button
        className="btn btn-primary m-1"
        type="button"
        name="today"
        onClick={handleClick}
      >
        Today
      </button>
      <button
        className="btn btn-secondary m-1"
        type="button"
        name="next"
        onClick={handleClick}
      >
        Next
      </button>

      <ErrorAlert error={reservationsError} />

      <table className="table table-hover m-1">
        <thead className="thead-light">
          <tr>
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

        <tbody>{reservationsJSX()}</tbody>
      </table>

      <br />
      <br />

      <h4 className="mb-0">Tables</h4>

      <ErrorAlert error={tablesError} />

      <table className="table table-hover m-1">
        <thead className="thead-light">
          <tr>
            <th scope="col">Table ID</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Reservation ID</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>

        <tbody>{tablesJSX()}</tbody>
      </table>
    </main>
  );
}

export default Dashboard;
