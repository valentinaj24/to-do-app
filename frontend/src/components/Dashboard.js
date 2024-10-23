import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Dashboard.css';
import Calendar from 'react-calendar';  
import 'react-calendar/dist/Calendar.css';  
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);


function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');

  const [notes, setNotes] = useState([]);
const [newNote, setNewNote] = useState('');

const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);  // Ažuriraj datum kad korisnik promeni
  };

  

const fetchNotes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Uzimanje ID-a korisnika iz localStorage
      const response = await axios.get('http://localhost:8080/api/notes', { params: { userId: user.id } });
      setNotes(response.data); // Postavljanje beleški iz baze
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async () => {
    if (newNote.trim()) {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post('http://localhost:8080/api/notes/save', {
        content: newNote
      }, {
        params: { userId: user.id }
      });
      setNotes([...notes, response.data]); // Dodavanje nove beleške u stanje
      setNewNote(''); // Resetovanje polja za unos
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/delete/${id}`);  // Ova ruta mora biti pravilna na backendu
      setNotes(notes.filter(note => note.id !== id)); // Nakon brisanja iz baze, ažuriraj state da bi uklonio belešku
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  
  useEffect(() => {
    fetchTasks(); // Preuzmi zadatke
    fetchNotes(); // Preuzmi beleške
  }, []);
    

  // Funkcija za preuzimanje zadataka iz baze podataka
  const fetchTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Pretpostavljamo da je korisnik u localStorage
      if (!user || !user.id) {
        console.error("User ID not found. Make sure the user is logged in.");
        return;
      }

      const response = await axios.get('http://localhost:8080/api/tasks', {
        params: { userId: user.id }
      });
      setTasks(response.data); // Postavljamo zadatke iz baze
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Preuzmi zadatke pri inicijalnom učitavanju stranice
  }, []);

  // Funkcija za dodavanje novog zadatka u bazu
  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          console.error("User ID not found. Make sure the user is logged in.");
          return;
        }

        const response = await axios.post('http://localhost:8080/api/tasks/save', {
          text: newTask,
          due: 'No date', // možete promeniti da bude datum koji želite
          completed: false,
          category: { id: 1 }, // Ako koristite kategorije, ovde možete podesiti
        }, {
          params: { userId: user.id }
        });

        setTasks([...tasks, response.data]); // Dodaj novi task u prikaz
        setNewTask(''); // Resetuj polje za unos
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Funkcija za brisanje zadatka
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/delete/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const updatedTask = { ...taskToUpdate, completed: true };
      
      await axios.put(`http://localhost:8080/api/tasks/update/${id}`, updatedTask);
      fetchTasks(); // Osveži taskove nakon izmena
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };



  // Filtriranje zadataka po nazivu
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(search.toLowerCase()));


    // Provera da li postoji task za određeni datum
    const isTaskOnDate = (date) => {
        return tasks.some(task => {
          const taskDate = new Date(task.due);
          return taskDate.toDateString() === date.toDateString();
        });
      };
    
      const tileContent = ({ date, view }) => {
        if (view === 'month' && isTaskOnDate(date)) {
          const tasksForDate = tasks
            .filter(task => new Date(task.due).toDateString() === date.toDateString())
            .map(task => task.text)
            .join(', ');
      
          return (
            <div className="task-dot">
              <span className="tooltip-text">{tasksForDate}</span>
            </div>
          );
        }
        return null;
      };
      
      const getTaskStatistics = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        const incompleteTasks = tasks.filter(task => !task.completed).length;
      
        return {
          labels: ['Completed Tasks', 'Incomplete Tasks'],
          datasets: [
            {
              label: 'Number of Tasks',
              data: [completedTasks, incompleteTasks],
              backgroundColor: ['#4caf50', '#f44336'],  
            },
          ],
        };
      };
      


  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <div className="recent-tasks">
          <h3>Recent Tasks</h3>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
          <ul>
          {filteredTasks.map(task => (
  <li key={task.id}>
    {task.text} <span className="due-date">Due: {task.due}</span>
    {task.completed ? (
      <span className="completed-label">Completed</span>
    ) : (
      <button onClick={() => handleToggleComplete(task.id)} className="complete-button">Mark as Completed</button>
    )}
    <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
  </li>
))}

</ul>

          
        </div>

        <div className="notes">
  <h3>Notes</h3>
  <textarea
    placeholder="Add your notes here..."
    value={newNote}
    onChange={(e) => setNewNote(e.target.value)}
    className="notes-input"
  />
  <button onClick={handleAddNote} className="add-note-button">Add Note</button>
  <ul>
  {notes.map(note => (
    <li key={note.id}>
      {console.log(note.content)} {/* Provera da li beleška dolazi iz baze */}
      {note.content ? note.content : "Empty note content"} {/* Ovde prikazujemo sadržaj beleške */}
      <button onClick={() => handleDeleteNote(note.id)} className="delete-note-button">Delete</button>
    </li>
  ))}
</ul>


</div>


        <div className="statistics">
        <h3>Statistics</h3>
        <div className="stat-chart">
            <Bar data={getTaskStatistics()} />
        </div>
        </div>

        <div className="calendar">
          <h3>Calendar</h3>
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileContent={tileContent}  // Dodaj funkcionalnost za obeležavanje
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
