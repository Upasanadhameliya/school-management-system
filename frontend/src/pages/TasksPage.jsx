import { useParams, useNavigate } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import { useAuth } from '../hooks/useAuth'
import { fetchStudent } from '../services/api'
import { useState, useEffect } from 'react'
import { TaskTable } from '../components/TaskTable'
import '../App.css'

export const TasksPage = () => {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const {
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
  } = useTasks(studentId)
  const [student, setStudent] = useState(null)
  const [studentLoading, setStudentLoading] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setStudentLoading(true)
        const data = await fetchStudent(studentId)
        setStudent(data)
      } catch (err) {
        console.error('Error loading student:', err)
      } finally {
        setStudentLoading(false)
      }
    }
    loadStudent()
  }, [studentId])

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/students')}
          className="btn btn-edit"
        >
          ← Back to Students
        </button>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      {user && <p style={{ margin: '5px 0', color: '#666', textAlign: 'right' }}>Welcome, {user.username}</p>}

      {studentLoading ? (
        <p className="loading">Loading student...</p>
      ) : student ? (
        <>
          <h1>Tasks for {student.name}</h1>
          <h2>Class: {student.class_name}</h2>
        </>
      ) : null}

      {loading && <p className="loading">Loading tasks...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <>
          <button
            onClick={handleAddNew}
            className="btn btn-primary"
            style={{ marginBottom: '20px' }}
          >
            Add Task
          </button>
          <TaskTable
            tasks={tasks}
            editingId={editingId}
            editedData={editedData}
            saveLoading={saveLoading}
            deleteLoading={deleteLoading}
            isAdding={isAdding}
            newTaskData={newTaskData}
            addLoading={addLoading}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onInputChange={handleInputChange}
            onSave={handleSave}
            onDelete={handleDelete}
            onAddCancel={handleAddCancel}
            onAddInputChange={handleAddInputChange}
            onAddSave={handleAddSave}
          />
        </>
      )}
    </div>
  )
}
