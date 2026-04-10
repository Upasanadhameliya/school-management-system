import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { StudentsPage } from './pages/StudentsPage'
import { TasksPage } from './pages/TasksPage'
import { LoginPage } from './pages/LoginPage'
import { useAuth } from './hooks/useAuth'
import './App.css'

function App() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="container"><h1>Loading...</h1></div>
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/students" /> : <LoginPage />} 
        />
        <Route 
          path="/students" 
          element={isAuthenticated ? <StudentsPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/students/:studentId/tasks" 
          element={isAuthenticated ? <TasksPage /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
