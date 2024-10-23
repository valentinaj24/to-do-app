import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Tasks.css'; // Import CSS

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Funkcija za editovanje taska
  const handleEditTask = (task) => {
    setCurrentTask({ ...task });
    setIsEditing(true);
  };

  // Funkcija za čuvanje izmena
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/tasks/update/${currentTask.id}`, {
        text: currentTask.text,
        due: currentTask.due,
        category: { id: currentTask.category.id }
      });
      fetchTasks(); // Osveži listu taskova
      setIsEditing(false); // Zatvori modal nakon izmene
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Fetch tasks and categories from the backend
  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Uzimanje korisničkog ID-a iz localStorage
      if (!user || !user.id) {
        console.error("User ID not found. Make sure the user is logged in.");
        return;
      }
      const response = await axios.get('http://localhost:8080/api/tasks', {
        params: { userId: user.id }  // Prosleđivanje userId-a kao parametra
      });
      setTasks(response.data);  // Postavljamo dobijene zadatke u state
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      console.log("Fetched categories:", response.data); // Dodajte ovu liniju za proveru
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() && dueDate && selectedCategory) {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Proveri da li user postoji
        if (!user || !user.id) {
          console.error("User ID not found. Make sure the user is logged in.");
          return;
        }
        console.log("User ID:", user.id);  // Logovanje ID-a korisnika
        console.log("Selected Category ID:", selectedCategory);  // Logovanje ID-a kategorije

        const response = await axios.post('http://localhost:8080/api/tasks/save', {
          text: newTask,
          due: dueDate,
          category: { id: selectedCategory },  // Slanje ID-a kategorije
          completed: false
        }, {
          params: { userId: user.id }  // Prosleđivanje userId-a kroz parametre
        });

        console.log("Task added:", response.data);
        fetchTasks(); // Nakon dodavanja zadatka, osveži listu
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/delete/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/update/${task.id}`, {
        text: task.text, // Prosleđivanje kompletnog taska
        due: task.due,
        category: task.category, // Prosleđivanje kategorije
        completed: !task.completed // Preokreće vrednost completed
      });
      fetchTasks(); // Osvežavanje taskova nakon izmena
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  

  const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="tasks-page">
      <Sidebar />
      <div className="tasks-content">
        <h2>Manage Your Tasks</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="add-task-form">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="task-input"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-date-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="task-category-input"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddTask} className="add-task-button">
            Add Task
          </button>
        </div>

        <div className="tasks-list">
          <h3>Your Tasks</h3>
          <ul>
            {filteredTasks.map(task => (
              <li key={task.id}>
                {/* <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id, task.completed)}
                /> */}
                {task.text} <span className="due-date">Due: {task.due}</span>
                <button onClick={() => handleEditTask(task)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal za uređivanje */}
        {isEditing && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Task</h3>
              <input
                type="text"
                value={currentTask.text}
                onChange={(e) => setCurrentTask({ ...currentTask, text: e.target.value })}
                className="task-input"
              />
              <input
                type="date"
                value={currentTask.due}
                onChange={(e) => setCurrentTask({ ...currentTask, due: e.target.value })}
                className="task-date-input"
              />
              <select
                value={currentTask.category?.id || ''}
                onChange={(e) => setCurrentTask({ ...currentTask, category: { id: e.target.value } })}
                className="task-category-input"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
              <button onClick={() => setIsEditing(false)} className="close-button">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
