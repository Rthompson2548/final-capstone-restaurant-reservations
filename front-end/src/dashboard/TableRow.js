import React from "react";
import { useHistory } from "react-router";

export default function TableRow({ table }) {
  if (!table) return null;

  function handleFinish(event){
    const history = useHistory()
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.") {
      // refreshes table rows to show updated statuses
      history.push(`/dashboard`)
    }
  } 

  

  return (
    <tr>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>

      <td data-table-id-status={table.table_id}>{table.status}</td>

      <td data-table-id-finish={table.table_id}>
        <button onClick={handleFinish} type="button">Finish</button>
      </td>

      <td>
        <button type="button">Cancel</button>
      </td>


    </tr>
  );
}
