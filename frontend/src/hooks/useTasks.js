import { useState, useEffect } from 'react'
import { fetchStudentTasks, updateTask, createTask, deleteTask } from '../services/api'

export const useTasks = (studentId) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editedData, setEditedData] = useState({})
  const [saveLoading, setSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
    student: studentId
  })
  const [addLoading, setAddLoading] = useState(false)

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

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete the task "${title}"?`)
    if (!confirmed) return

    try {
      setDeleteLoading(true)
      await deleteTask(id)
      setTasks(tasks.filter(t => t.id !== id))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setNewTaskData({
      title: '',
      description: '',
      status: 'pending',
      due_date: '',
      student: studentId
    })
  }

  const handleAddCancel = () => {
    setIsAdding(false)
    setNewTaskData({})
  }

  const handleAddInputChange = (e, field) => {
    setNewTaskData({
      ...newTaskData,
      [field]: e.target.value
    })
  }

  const handleAddSave = async () => {
    try {
      setAddLoading(true)
      const createdTask = await createTask(newTaskData)
      setTasks([...tasks, createdTask])
      setIsAdding(false)
      setNewTaskData({})
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setAddLoading(false)
    }
  }

  return {
    tasks,
    loading,
    error,
    editingId,
    editedData,
    saveLoading,
    deleteLoading,
    handleEdit,
    handleCancel,
    handleInputChange,
    handleSave,
    handleDelete,
    isAdding,
    newTaskData,
    addLoading,
    handleAddNew,
    handleAddCancel,
    handleAddInputChange,
    handleAddSave
  }
}
