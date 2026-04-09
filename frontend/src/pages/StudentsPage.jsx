import { useStudents } from '../hooks/useStudents'
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

  return (
    <div className="container">
      <h1>School Management System</h1>
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
