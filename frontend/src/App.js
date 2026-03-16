import { useState, useEffect } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Run once when component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {

    if (!text.trim()) return;

    try {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      setText("");
      fetchTasks();

    } catch (error) {
      console.error("Error adding task:", error);
    }

  };

  // Delete a task
  const deleteTask = async (id) => {

    try {

      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE"
      });

      fetchTasks();

    } catch (error) {
      console.error("Error deleting task:", error);
    }

  };

  return (

    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Task Manager</h1>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button
          onClick={addTask}
          style={{ padding: "8px 16px" }}
        >
          Add Task
        </button>

      </div>

      <ul>

        {tasks.map((task) => (

          <li key={task._id} style={{ marginBottom: "10px" }}>

            {task.text}

            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>

          </li>

        ))}

      </ul>

    </div>

  );

}

export default App;