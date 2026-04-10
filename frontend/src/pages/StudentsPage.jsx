import { useStudents } from '../hooks/useStudents'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { StudentTable } from '../components/StudentTable'
import '../App.css'

export const StudentsPage = () => {
  const {
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
  } = useStudents()

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>School Management System</h1>
          {user && <p style={{ margin: '5px 0', color: '#666' }}>Welcome, {user.username}</p>}
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>
      <h2>Students List</h2>

      {loading && <p className="loading">Loading students...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && students.length === 0 && !error && (
        <p className="no-students">No students found</p>
      )}

      {!loading && students.length > 0 && (
        <>
          <button
            onClick={handleAddNew}
            className="btn btn-primary"
            style={{ marginBottom: '20px' }}
          >
            Add Student
          </button>
          <StudentTable
            students={students}
            editingId={editingId}
            editedData={editedData}
            saveLoading={saveLoading}
            deleteLoading={deleteLoading}
            isAdding={isAdding}
            newStudentData={newStudentData}
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
