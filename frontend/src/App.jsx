import { useState, useEffect } from 'react'
import './App.css'

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc1NzE4MzYwLCJpYXQiOjE3NzU3MTQ3NjAsImp0aSI6IjcwZjA2ODI2NzU5ODQyOWE4NDc1NTM5ODljYTAyODcxIiwidXNlcl9pZCI6IjEifQ.Si6WCTy5bBilBy-rkdEAdPeYzjLfHUAfKzzHj4xy6xo'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://127.0.0.1:8000/api/students/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      // DRF pagination wraps results in a 'results' field
      setStudents(data.results || data)
      setError(null)
    } catch (err) {
      setError(err.message)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container">
        <h1>School Management System</h1>
        <h2>Students List</h2>

        {loading && <p className="loading">Loading students...</p>}

        {error && <p className="error">Error: {error}</p>}

        {!loading && students.length === 0 && !error && (
          <p className="no-students">No students found</p>
        )}

        {!loading && students.length > 0 && (
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.class_name}</td>
                  <td>{student.age}</td>
                  <td>{student.email || 'N/A'}</td>
                  <td>{student.phone || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default App
