import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './App.css'
function TaskListPage() {
  const {id}=useParams();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  useEffect(() => {
    if(id){
      axios.get(`http://localhost:3001/task/${id}`)
      .then(response => {
        setTask(response.data);
        setLoading(false);
        console.log("uheuf");
      })
      .catch(error => {
        console.error(error);
      });
    }else{
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
        console.log("uheuf");
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);

  const handleEdit = (id) => {

    
    return navigateTo(`/task/${id}`)

  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };
  if (task) {
    return (
      <div className='task-list'>
        <h1>Task List</h1>
        <ul>
          <li>
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.due_date}</p>
            <button onClick={() => handleEdit(task.id)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        </ul>
        <button onClick={() => { navigateTo("/tasks/new") }}>Create New Task</button>
      </div>
    );
  }

  return (
    <div className='task-list'>
      <h1>Task List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {task.due_date}</p>
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => { navigateTo("/tasks/new") }}>Create New Task</button>
    </div>
  );
}

export default TaskListPage;