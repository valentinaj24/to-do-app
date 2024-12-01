import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import './Statistics.css';

ChartJS.register(BarElement, CategoryScale, LinearScale);

function Statistics() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

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
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
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

  const totalTasks = tasks.length;
  const upcomingTasks = tasks.filter(task => !task.completed).slice(0, 5);

  return (
    <div className="statistics-page">
      <Sidebar />
      <div className="statistics-content">
        <h2>Task Statistics</h2>
        <div className="stat-chart">
          <Bar data={getTaskStatistics()} />
        </div>
        <div className="summary-section">
          <h3>Summary</h3>
          <p><strong>Total Tasks:</strong> {totalTasks}</p>
          <p><strong>Upcoming Deadlines:</strong></p>
          <ul>
            {upcomingTasks.map(task => (
              <li key={task.id}>
                {task.text} - Due: {new Date(task.due).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
