import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { StudentsPage } from './pages/StudentsPage'
import { TasksPage } from './pages/TasksPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="container"><h1>School Management System</h1><p>Login Page (coming soon)</p></div>} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:studentId/tasks" element={<TasksPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
