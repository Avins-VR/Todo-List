import React, { useState } from "react";
import "./App.css";

function App() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [activeTasks, setActiveTasks] = useState(0);

  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newCategory, setNewCategory] = useState("Work");
  const [newDueDate, setNewDueDate] = useState("");

  const [showMenuId, setShowMenuId] = useState(null);

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const sortTasksByPriority = (taskList) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return taskList.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      alert("Task title is required!");
      return;
    }

    if (isEditing && taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id
          ? {
              ...task,
              title: newTitle,
              description: newDescription,
              priority: newPriority,
              category: newCategory,
              dueDate: newDueDate,
            }
          : task
      );
      setTasks(sortTasksByPriority(updatedTasks));
    } else {
      const newTask = {
        id: Date.now(),
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        category: newCategory,
        dueDate: newDueDate,
        completed: false,
      };

      setTasks(sortTasksByPriority([newTask, ...tasks]));
      setTotalTasks(totalTasks + 1);
      setActiveTasks(activeTasks + 1);
    }
    setIsModalOpen(false);
    setIsEditing(false);
    setTaskToEdit(null);
    setNewTitle("");
    setNewDescription("");
    setNewPriority("Medium");
    setNewCategory("Work");
    setNewDueDate("");
    setShowMenuId(null);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newStatus = !task.completed;

        if (newStatus) {
          setCompletedTasks(completedTasks + 1);
          setActiveTasks(activeTasks - 1);
        } else {
          setCompletedTasks(completedTasks - 1);
          setActiveTasks(activeTasks + 1);
        }

        return { ...task, completed: newStatus };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    if (taskToDelete.completed) {
      setCompletedTasks(completedTasks - 1);
    } else {
      setActiveTasks(activeTasks - 1);
    }

    setTotalTasks(totalTasks - 1);
    setTasks(tasks.filter((task) => task.id !== id));
    setShowMenuId(null);
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setTaskToEdit(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewPriority(task.priority);
    setNewCategory(task.category);
    setNewDueDate(task.dueDate);
    setIsModalOpen(true);
    setShowMenuId(null);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-left">
          <div className="header-icon">
            <i className="bi bi-stars"></i>
          </div>
          <div>
            <h1 className="title">Focusflow Tasks</h1>
            <p className="subtitle">Stay organized, stay productive</p>
          </div>
        </div>
        <button
          className="add-task-btn"
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setTaskToEdit(null);
            setNewTitle("");
            setNewDescription("");
            setNewPriority("Medium");
            setNewCategory("Work");
            setNewDueDate("");
          }}
        >
          + Add Task
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-icon blue">
            <i className="bi bi-pin-angle-fill"></i>
          </div>
          <p className="card-label">Total Tasks</p>
          <p className="card-value">{totalTasks}</p>
        </div>

        <div className="card">
          <div className="card-icon green">
            <i className="bi bi-check2-circle"></i>
          </div>
          <p className="card-label">Completed</p>
          <p className="card-value">{completedTasks}</p>
        </div>

        <div className="card">
          <div className="card-icon orange">
            <i className="bi bi-exclamation-circle"></i>
          </div>
          <p className="card-label">Active</p>
          <p className="card-value">{activeTasks}</p>
        </div>

        <div className="card">
          <div className="card-icon purple">
            <i className="bi bi-bar-chart-line-fill"></i>
          </div>
          <p className="card-label">Completion Rate</p>
          <p className="card-value">{completionRate}%</p>
        </div>
      </div>

      <div className="task-list">
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet — add your first one!</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={task.completed ? "task completed" : "task"}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <div className="task-content">
                  <strong>{task.title}</strong> - {task.category} -{" "}
                  {task.priority}{" "}
                  {task.dueDate && (
                    <>
                      | <span>Due: {task.dueDate}</span>
                    </>
                  )}
                  {task.description && <p>{task.description}</p>}
                </div>

                <div className="menu-container">
                  <button
                    className="menu-btn"
                    onClick={() =>
                      setShowMenuId(showMenuId === task.id ? null : task.id)
                    }
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>

                  {showMenuId === task.id && (
                    <div className="menu-dropdown">
                      <button
                        className="menu-icon-btn"
                        onClick={() => handleEdit(task)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="menu-icon-btn delete-icon-btn"
                        onClick={() => deleteTask(task.id)}
                      >
                        <i
                          className="bi bi-trash"
                          style={{ color: "red" }}
                        ></i>
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{isEditing ? "Edit Task" : "Add New Task"}</h3>
              <button
                className="close-btn"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setTaskToEdit(null);
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label>Task Title *</label>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />

              <label>Description</label>
              <textarea
                placeholder="Add more details (optional)"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              ></textarea>

              <div className="form-row">
                <div>
                  <label>Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Learning</option>
                  </select>
                </div>
              </div>

              <label>Due Date</label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />

              <div className="modal-actions">
                <button type="submit" className="add-task-btn">
                  {isEditing ? "Edit Task" : "+ Add Task"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setTaskToEdit(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
