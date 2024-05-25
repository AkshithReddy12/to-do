

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css'

function TaskFormPage() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/tasks/${id}`)
        .then(response => {
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
          setDueDate(task.dueDate);
          
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      // Update task
      axios.put(`http://localhost:3001/tasks/${id}`, {
        data: {
          title,
          description,
          status,
          dueDate
        }
      })
      .then(response => {
        return navigateTo("/");
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      // Create new task
      axios.post(`http://localhost:3001/tasks`, {
        data: {
          title,
          description,
          status,
          dueDate
        }
      })
      .then(response => {
        return navigateTo('/');
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  return (
    <div className="task-form-container">
      <h1>{id ? 'Edit Task' : 'Create Task'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <br />
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
        </label>
        <br />
        <button type="submit">{id ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
}

export default TaskFormPage;