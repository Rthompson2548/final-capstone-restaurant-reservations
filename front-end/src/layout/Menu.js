import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav>
      <ul className="nav navbar-nav" id="accordionSidebar">
        <li className="nav-item">
          <button
            type="button"
            className="btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Home"
          >
            <Link className="nav-link m-3" to="/">
              <img
                style={{ color: "black" }}
                src="https://img.icons8.com/material-rounded/60/000000/home.png"
              />
              {/* <p style={{ color: "black" }}>Home</p> */}
            </Link>
          </button>
        </li>

        <li className="nav-item">
          <button
            type="button"
            className="btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Dashboard"
          >
            <Link className="nav-link m-3" to="/dashboard">
              <img src="https://img.icons8.com/material/60/000000/dashboard-layout.png" />{" "}
              {/* <p style={{ color: "black" }}>Dashboard</p> */}
            </Link>
          </button>
        </li>

        <li className="nav-item">
          <button
            type="button"
            className="btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Search"
          >
            <Link className="nav-link m-3" to="/search">
              <img src="https://img.icons8.com/material-outlined/60/000000/search--v1.png" />
              {/* <p style={{ color: "black" }}> Search</p> */}
            </Link>
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="New Reservation"
          >
            <Link className="nav-link m-3" to="/reservations/new">
              <img
                className=""
                src="https://img.icons8.com/ios-filled/60/000000/reservation.png"
              />
              {/* <p style={{ color: "black" }}> New Reservation</p> */}
            </Link>
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="New Table"
          >
            <Link className="nav-link m-3" to="/tables/new">
              <img src="https://img.icons8.com/material-outlined/60/000000/table.png" />
              {/* <p style={{ color: "black" }}>New Table</p> */}
            </Link>
          </button>
        </li>
      </ul>
      <div className="text-center d-none d-md-inline">
        <button
          className="btn rounded-circle border-0"
          id="sidebarToggle"
          type="button"
        />
      </div>
    </nav>
  );
}

export default Menu;
