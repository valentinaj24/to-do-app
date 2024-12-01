import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './CalendarPage.css';

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); 
      if (!user || !user.id) {
        console.error("User ID not found. Make sure the user is logged in.");
        return;
      }
      const response = await axios.get('http://localhost:8080/api/tasks', {
        params: { userId: user.id }
      });
      setTasks(response.data);
      updateTasksForDate(new Date(), response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const isTaskOnDate = (date) => {
    return tasks.some(task => {
      const taskDate = new Date(task.due);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const updateTasksForDate = (selectedDate, allTasks) => {
    const tasksForDate = allTasks.filter(task => {
      const taskDate = new Date(task.due);
      return taskDate.toDateString() === selectedDate.toDateString();
    });
    setTasksForSelectedDate(tasksForDate);
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

  const handleDateChange = (newDate) => {
    setDate(newDate);
    updateTasksForDate(newDate, tasks);
  };

  return (
    <div className="calendar-page">
      <Sidebar />
      <div className="calendar-content">
        <h2>Task Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent} 
        />
        <div className="tasks-for-date">
          <h3>Tasks for {date.toDateString()}</h3>
          {tasksForSelectedDate.length > 0 ? (
            <ul>
              {tasksForSelectedDate.map(task => (
                <li key={task.id}>
                  {task.text} - <strong>Due:</strong> {new Date(task.due).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
