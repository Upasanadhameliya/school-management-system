import { useState, useEffect } from 'react'
import { fetchStudents, updateStudent, deleteStudent, createStudent } from '../services/api'

export const useStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editedData, setEditedData] = useState({})
  const [saveLoading, setSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    class_name: '',
    age: '',
    email: '',
    phone: ''
  })
  const [addLoading, setAddLoading] = useState(false)

  const loadStudents = async () => {
    try {
      setLoading(true)
      const data = await fetchStudents()
      setStudents(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const handleEdit = (student) => {
    setEditingId(student.id)
    setEditedData({ ...student })
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
      const updatedStudent = await updateStudent(id, editedData)
      setStudents(students.map(s => s.id === id ? updatedStudent : s))
      setEditingId(null)
      setEditedData({})
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaveLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`)
    if (!confirmed) return

    try {
      setDeleteLoading(true)
      await deleteStudent(id)
      setStudents(students.filter(s => s.id !== id))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setNewStudentData({
      name: '',
      class_name: '',
      age: '',
      email: '',
      phone: ''
    })
  }

  const handleAddCancel = () => {
    setIsAdding(false)
    setNewStudentData({})
  }

  const handleAddInputChange = (e, field) => {
    setNewStudentData({
      ...newStudentData,
      [field]: e.target.value
    })
  }

  const handleAddSave = async () => {
    try {
      setAddLoading(true)
      const createdStudent = await createStudent(newStudentData)
      setStudents([...students, createdStudent])
      setIsAdding(false)
      setNewStudentData({})
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setAddLoading(false)
    }
  }

  return {
    students,
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
    newStudentData,
    addLoading,
    handleAddNew,
    handleAddCancel,
    handleAddInputChange,
    handleAddSave
  }
}
