import React, { useState } from "react";
import "./App.css";

function App() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [activeTasks, setActiveTasks] = useState(0);

  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newCategory, setNewCategory] = useState("Work");
  const [newDueDate, setNewDueDate] = useState("");

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      alert("Task title is required!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      category: newCategory,
      dueDate: newDueDate,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTotalTasks(totalTasks + 1);
    setActiveTasks(activeTasks + 1);

    setNewTitle("");
    setNewDescription("");
    setNewPriority("Medium");
    setNewCategory("Work");
    setNewDueDate("");

    setIsModalOpen(false);
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
  };

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-left">
          <div className="header-icon">✨</div>
          <div>
            <h1 className="title">Premium Tasks</h1>
            <p className="subtitle">Stay organized, stay productive</p>
          </div>
        </div>
        <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
          + Add Task
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-icon blue">📌</div>
          <p className="card-label">Total Tasks</p>
          <p className="card-value">{totalTasks}</p>
        </div>

        <div className="card">
          <div className="card-icon green">✅</div>
          <p className="card-label">Completed</p>
          <p className="card-value">{completedTasks}</p>
        </div>

        <div className="card">
          <div className="card-icon orange">🔴</div>
          <p className="card-label">Active</p>
          <p className="card-value">{activeTasks}</p>
        </div>

        <div className="card">
          <div className="card-icon purple">📈</div>
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
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                  title="Delete Task"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Task</h3>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddTask}>
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
              />

              <div className="modal-actions">
                <button type="submit" className="add-task-btn">
                  + Add Task
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
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
