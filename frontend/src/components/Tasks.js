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

  const [reminderTask, setReminderTask] = useState(null); // Task za koji postavljamo opomnik
  const [notificationType, setNotificationType] = useState('email'); // Tip obaveštenja
  const [reminderTime, setReminderTime] = useState(''); // Vreme opomnika

  const [attachments, setAttachments] = useState([]); // Shranjevanje prilog za izbrano nalogo

  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false); // Kontrola modala
  const [currentAttachments, setCurrentAttachments] = useState([]); // Prilozi za prikaz
  const [currentTaskName, setCurrentTaskName] = useState(''); // Ime trenutnog taska

  const fetchAttachments = async (taskId, taskName) => {
    try {
      const response = await axios.get(
          `http://localhost:8080/api/tasks/${taskId}/attachments`
      );
      setCurrentAttachments(response.data); // Postavi priložene fajlove za prikaz
      setCurrentTaskName(taskName); // Postavi ime trenutnog taska za prikaz
      setShowAttachmentsModal(true); // Prikaži modal
    } catch (error) {
      console.error("Error fetching attachments:", error);
    }
  };




  const [selectedFiles, setSelectedFiles] = useState([]); // Za shranjevanje izbranih datotek

  const handleFileChange = (e) => {
    const allowedFileTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/rtf", // .rtf
    ];

    const files = [...e.target.files];
    const validFiles = files.filter((file) => allowedFileTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      alert("Some files have unsupported formats and will not be uploaded.");
    }

    setSelectedFiles(validFiles);
  };


  const handleAddTaskWithAttachments = async () => {
    if (!newTask.trim() || !dueDate || !selectedCategory) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("User ID not found.");
        return;
      }

      // 1. Ustvari nalogo brez prilog
      const response = await axios.post(
          "http://localhost:8080/api/tasks/save",
          {
            text: newTask,
            due: dueDate,
            category: { id: selectedCategory },
            completed: false,
          },
          { params: { userId: user.id } }
      );

      const taskId = response.data.id;

      // 2. Naloži priloge (če obstajajo)
      if (selectedFiles.length > 0) {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("file", file);
        });
        console.log("FormData Content:", [...formData.entries()]);

        await axios.post(
            `http://localhost:8080/api/tasks/${taskId}/attachments`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
      }


      alert("Task added successfully with attachments!");
      fetchTasks(); // Osveži seznam nalog
    } catch (error) {
      console.error("Error adding task with attachments:", error);
    }
  };


  const handleAddReminder = async () => {
    if (!reminderTask || !notificationType || !reminderTime) {
      alert('Please select a task, notification type, and reminder time.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/tasks/add-reminder', null, {
        params: {
          taskId: reminderTask.id,
          notificationType,
          reminderTime,
        },
      });
      alert('Reminder added successfully!');
      setReminderTask(null); // Zatvaranje modal-a
      setNotificationType('email'); // Reset tipa obaveštenja
      setReminderTime(''); // Reset vremena opomnika
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

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

            <label className="file-input-label">
              Choose Files
              <input
                  type="file"
                  className="file-input"
                  multiple
                  onChange={handleFileChange}
              />
            </label>

            <button onClick={handleAddTaskWithAttachments} className="add-task-button">
              Add Task
            </button>
          </div>

          <div className="tasks-list">
            <h3>Your Tasks</h3>
            <ul>
              {filteredTasks.map((task) => (
                  <li key={task.id}>
                    <span>{task.text}</span> <span className="due-date">Due: {task.due}</span>
                    <button onClick={() => handleEditTask(task)} className="edit-button">Edit</button>
                    <button onClick={() => setReminderTask(task)} className="reminder-button">Add Reminder</button>
                    <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>

                    <button onClick={() => fetchAttachments(task.id, task.text)} className="view-attachments-button">
                      View Attachments
                    </button>


                    {/* Prikaz priloga samo za trenutni task */}
                    {attachments.length > 0 && (
                        <ul className="attachments-list">
                          {attachments.map((attachment) => (
                              <li key={attachment.id}>
                                <a
                                    href={`/${attachment.filePath}`} // Ili koristite ispravan URL za fajlove
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                  {attachment.fileName}
                                </a>
                              </li>
                          ))}
                        </ul>
                    )}
                  </li>

              ))}
            </ul>
          </div>
          {/* Modal za prikaz priloga */}
          {showAttachmentsModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Attachments for Task: {currentTaskName}</h3>
                  {currentAttachments.length > 0 ? (
                      <ul className="attachments-list">
                        {currentAttachments.map((attachment) => (
                            <li key={attachment.id}>
                              <a
                                  href={`/${attachment.fileName}`} // Koristite ispravan URL za fajlove
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                {attachment.fileName}
                              </a>
                            </li>
                        ))}
                      </ul>
                  ) : (
                      <p>No attachments found for this task.</p>
                  )}
                  <button onClick={() => setShowAttachmentsModal(false)} className="close-button">
                    Close
                  </button>
                </div>
              </div>
          )}

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

          {/* Modal za postavljanje opomnika */}
          {reminderTask && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Set Reminder for Task: {reminderTask.text}</h3>
                  <label>
                    Reminder Time:
                    <input
                        type="datetime-local"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                    />
                  </label>
                  <label>
                    Notification Type:
                    <select
                        value={notificationType}
                        onChange={(e) => setNotificationType(e.target.value)}
                    >
                      <option value="email">Email</option>
                      <option value="profile">Profile Message</option>
                    </select>
                  </label>
                  <button onClick={handleAddReminder} className="save-button">Save Reminder</button>
                  <button onClick={() => setReminderTask(null)} className="close-button">Cancel</button>
                </div>
              </div>
          )}

        </div>
      </div>
  );
}

export default Tasks;


