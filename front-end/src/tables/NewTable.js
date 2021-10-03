import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable() {
  const history = useHistory();

  const [error, setError] = useState([]);
  // sets initial state of a table
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: 1,
  });

  // sets table info when entered
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  // saves table info and redirects to dashboard when form is submitted
  function handleSubmit(event) {
    event.preventDefault();

    if (validateFields()) {
      history.push(`/dashboard`);
    }
  }

  // checks for table's capacity and length of table's name
  function validateFields() {
    let foundError = null;

    if (formData.table_name === "" || formData.capacity === "") {
      foundError = {
        message:
          "invalid form: table name & capacity must be provided to create table",
      };
    } else if (formData.table_name.length < 2) {
      foundError = {
        message:
          "invalid table name: table name must contain at least two characters",
      };
    }

    setError(foundError);

    return foundError.length !== null;
  }

  return (
    <form>
      <ErrorAlert error={error} />

      <label htmlFor="table_name">Table Name:&nbsp;</label>
      <input
        name="table_name"
        id="table_name"
        type="text"
        minLength="2"
        onChange={handleChange}
        value={formData.table_name}
        required
      />

      <label htmlFor="capacity">Capacity:&nbsp;</label>
      <input
        name="capacity"
        id="capacity"
        type="number"
        min="1"
        onChange={handleChange}
        value={formData.capacity}
        required
      />

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={history.goBack}>
        Cancel
      </button>
    </form>
  );
}
