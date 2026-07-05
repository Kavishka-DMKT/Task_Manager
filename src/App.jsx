
import { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const API_URL = "/api/todos";

  
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
    
      const normalizedData = data.map(task => ({
        ...task,
        id: task._id || task.id
      }));

      setTasks(normalizedData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const addTask = async (taskData) => {
    const optimisticTask = {
      id: Date.now().toString(),
      ...taskData,
      status: taskData.status || "Pending",
    };

    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const savedTask = await response.json();
      const normalizedTask = {
        ...savedTask,
        id: savedTask._id || savedTask.id || optimisticTask.id,
      };

      setTasks((prev) =>
        prev.map((task) => (task.id === optimisticTask.id ? normalizedTask : task))
      );
    } catch (error) {
      console.error("Error adding task:", error);
      setTasks((prev) => prev.filter((task) => task.id !== optimisticTask.id));
    }
  };


  const toggleTaskStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Pending" ? "Completed" : "Pending";

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: nextStatus } : task))
    );

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      fetchTasks(); 
    }
  };


  const updateTask = async (id, updatedFields) => {
    try {
      const payload = {
        ...updatedFields,
        status: updatedFields.status || "Pending",
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const savedTask = await response.json();
      const updatedTask = {
        ...savedTask,
        id: savedTask._id || savedTask.id,
      };

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      fetchTasks();
    }
  };

  
  const deleteTask = async (id) => {
   
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingTask && editingTask.id === id) setEditingTask(null);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      fetchTasks(); 
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TaskNest</h1>
      </header>

      <main className="app-main">
        <TaskForm
          onAddTask={addTask}
          onUpdateTask={updateTask}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <TaskList 
          tasks={tasks} 
          onToggleStatus={toggleTaskStatus} 
          onDeleteTask={deleteTask} 
          onEditTask={setEditingTask}
        />
      </main>
    </div>
  );
}

export default App;