import { useState, useEffect } from 'react'
import { fetchStudentTasks, updateTask } from '../services/api'

export const useTasks = (studentId) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editedData, setEditedData] = useState({})
  const [saveLoading, setSaveLoading] = useState(false)

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

  const handleEdit = (task) => {
    setEditingId(task.id)
    setEditedData({ ...task })
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditedData({})
  }

  const handleInputChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value
    })
  }

  const handleSave = async (id) => {
    try {
      setSaveLoading(true)
      const updatedTask = await updateTask(id, editedData)
      setTasks(tasks.map(t => t.id === id ? updatedTask : t))
      setEditingId(null)
      setEditedData({})
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaveLoading(false)
    }
  }

  return {
    tasks,
    loading,
    error,
    editingId,
    editedData,
    saveLoading,
    handleEdit,
    handleCancel,
    handleInputChange,
    handleSave
  }
}
