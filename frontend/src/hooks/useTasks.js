import { useState, useEffect } from 'react'
import { fetchStudentTasks } from '../services/api'

export const useTasks = (studentId) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [studentId])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await fetchStudentTasks(studentId)
      setTasks(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err.message)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  return {
    tasks,
    loading,
    error
  }
}
