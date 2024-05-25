import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskListPage from './TaskListPage';
import TaskFormPage from './TaskFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/tasks/:id" element={<TaskListPage />} />
        <Route path="/tasks/new" element={<TaskFormPage />} />
        <Route path="/task/:id" element={<TaskFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;