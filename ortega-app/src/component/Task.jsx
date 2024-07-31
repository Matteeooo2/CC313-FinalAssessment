import React from "react";
import "./Task.css";

const Task = ({ task, index, onToggleStatus }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{task.description}</td>
      <td>{task.assignee}</td>
      {task.status === "Completed" ? <td>—</td> : <td>{task.deadline}</td>}
      <td>{task.status}</td>
      <td>
        <button onClick={() => onToggleStatus(index)}>Toggle Status</button>
      </td>
    </tr>
  );
};

export default Task;
