import React, { Component } from "react";
import Task from "./Task";
import SearchFilter from "./SearchFilter";
import "./Tasks.css";

const generateRandomDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
  return futureDate.toISOString().split("T")[0];
};

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.initializeTasks(),
      searchQuery: "",
      filteredTasks: this.initializeTasks(),
    };
  }

  initializeTasks() {
    const assignees = ["John", "Jane", "Mike", "Lisa"];
    const descriptions = [
      "Create project",
      "Update documentation",
      "Fix bugs",
      "Deploy application",
      "Do a research",
      "Assign the manuscript",
      "Design new feature",
      "Interview the stakeholder",
      "Optimize performance",
      "Prepare presentation",
    ];

    return descriptions.map((desc, index) => {
      const isCompleted = index < 4;
      return {
        description: desc,
        assignee: assignees[Math.floor(Math.random() * assignees.length)],
        deadline: isCompleted ? null : generateRandomDate(),
        status: isCompleted ? "Completed" : "Pending",
      };
    });
  }

  handleSearchChange = (query) => {
    this.setState({
      searchQuery: query,
      filteredTasks: this.state.tasks.filter((task) =>
        task.description.toLowerCase().includes(query.toLowerCase())
      ),
    });
  };

  toggleStatus = (index) => {
    this.setState((prevState) => {
      const newTasks = prevState.tasks.map((task, i) =>
        i === index
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
              deadline: task.status === "Pending" ? null : generateRandomDate(),
            }
          : task
      );
      return {
        tasks: newTasks,
        filteredTasks: newTasks.filter((task) =>
          task.description
            .toLowerCase()
            .includes(prevState.searchQuery.toLowerCase())
        ),
      };
    });
  };

  render() {
    return (
      <div>
        <SearchFilter
          searchQuery={this.state.searchQuery}
          onSearchChange={this.handleSearchChange}
        />
        <div className="table-container">
          <h1 className="table-heading">Tasks List</h1>
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Task Description</th>
                <th>Assignee</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredTasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  index={index}
                  onToggleStatus={this.toggleStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Tasks;
