import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

// react component for '/reservations/new' page
export default function NewReservation() {
  const history = useHistory();

  // set state of a submitted reservation using useState()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  // when a user enters data into the form, the change handler will
  // create an event object and pass it to the handleChange() function
  function handleChange({ target }) {
    // sets new reservation data along with it's names and values
    setFormData({ ...formData, [target.name]: target.value });
  }

  function handleSubmit(event) {
    // prevent default behavior of form submissions
    event.preventDefault();
    // needs to go back to dashboard using the url reservation date query to display only reservations for the given date
    if (validateDate()) {
      history.push(`/dashboard?date=${formData.reservation_date}`);
      console.log("reservation successfully submitted: ", formData);
    }
  }

  // checks if reservation time meets conditions
  function validateDate() {
    const reservationTime = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00.000`
    );
    const today = new Date();

    const reservationTimeErrors = [];

    if (reservationTime.getDay() === 2) {
      reservationTimeErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed on Tuesdays.",
      });
    }

    if (reservationTime < today) {
      reservationTimeErrors.push({
        message: "Reservation cannot be made: Date is in the past.",
      });
    }

    if (
      reservationTime.getHours() < 10 ||
      (reservationTime.getHours() === 10 && reservationTime.getMinutes() < 30)
    ) {
      reservationTimeErrors.push({
        message:
          "Reservation cannot be made: Restaurant is not open until 10:30AM.",
      });
    } else if (
      reservationTime.getHours() > 22 ||
      (reservationTime.getHours() === 22 && reservationTime.getMinutes() >= 30)
    ) {
      reservationTimeErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed after 10:30PM.",
      });
    } else if (
      reservationTime.getHours() > 21 ||
      (reservationTime.getHours() === 21 && reservationTime.getMinutes() > 30)
    ) {
      reservationTimeErrors.push({
        message:
          "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM).",
      });
    }

    setErrors(reservationTimeErrors);

    if (reservationTimeErrors.length > 0) {
      return false;
    }
    return true;
  }

  return (
    <form>
      {/* renders error component at top of page if any date errors arise */}
      {errors()}

      {/* first name */}
      <label className="form_label" htmlFor="first_name">
        First Name:&nbsp
      </label>
      <input
        className="form_control"
        name="first_name"
        id="first_name"
        type="text"
        placeholder="Enter a First Name"
        onChange={handleChange}
        value={formData.first_name}
        required
      />
      {/* last name */}
      <label className="form_label" htmlFor="last_name">
        Last Name:
      </label>
      <input
        className="form_control"
        name="last_name"
        id="last_name"
        type="text"
        placeholder="Enter a Last Name"
        onChange={handleChange}
        value={formData.last_name}
        required
      />
      {/* mobile number */}
      <label className="form_label" htmlFor="mobile_number">
        Phone Number
      </label>
      <input
        className="form_control"
        name="mobile_number"
        id="mobile_number"
        type="tel"
        placeholder="Enter a Phone Number"
        onChange={handleChange}
        value={formData.mobile_number}
        required
      />
      {/* date of reservation */}
      <label className="form_label" htmlFor="reservation_date">
        Date of Reservation
      </label>
      <input
        className="form_control"
        name="reservation_date"
        id="reservation_date"
        type="date"
        placeholder="YYYY-MM-DD"
        pattern="\d{4}-\d{2}-\d{2}"
        onChange={handleChange}
        value={formData.reservation_date}
        required
      />
      {/* time of reservation */}
      <label className="form_label" htmlFor="reservation_time">
        Time of Reservation
      </label>
      <input
        className="form_control"
        name="reservation_time"
        id="reservation_time"
        type="time"
        placeholder="HH:MM"
        pattern="[0-9]{2}:[0-9]{2}"
        onChange={handleChange}
        value={formData.reservation_time}
        required
      />
      {/* number of people in party (>=1) */}
      <label className="form_label" htmlFor="people">
        Party Size
      </label>
      <input
        className="form_control"
        name="people"
        id="people"
        type="number"
        placeholder="0"
        min="1"
        onChange={handleChange}
        value={formData.people}
        required
      />
      {/* submit button */}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {/* cancel button */}
      <button
        type="button"
        // goes back to previous page when form is cancelled
        onClick={history.goBack}
      >
        Cancel
      </button>
    </form>
  );
}
