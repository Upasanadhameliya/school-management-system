import { useNavigate } from 'react-router-dom'

export const StudentTable = ({
  students,
  editingId,
  editedData,
  saveLoading,
  deleteLoading,
  isAdding,
  newStudentData,
  addLoading,
  onEdit,
  onCancel,
  onInputChange,
  onSave,
  onDelete,
  onAddCancel,
  onAddInputChange,
  onAddSave
}) => {
  const navigate = useNavigate()
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Class</th>
          <th>Age</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {isAdding && (
          <tr className="new-student-row">
            <td>New</td>
            <td>
              <input
                type="text"
                value={newStudentData.name || ''}
                onChange={(e) => onAddInputChange(e, 'name')}
                className="edit-input"
                placeholder="Enter name"
              />
            </td>
            <td>
              <input
                type="text"
                value={newStudentData.class_name || ''}
                onChange={(e) => onAddInputChange(e, 'class_name')}
                className="edit-input"
                placeholder="Enter class"
              />
            </td>
            <td>
              <input
                type="number"
                value={newStudentData.age || ''}
                onChange={(e) => onAddInputChange(e, 'age')}
                className="edit-input"
                placeholder="Enter age"
              />
            </td>
            <td>
              <input
                type="email"
                value={newStudentData.email || ''}
                onChange={(e) => onAddInputChange(e, 'email')}
                className="edit-input"
                placeholder="Enter email"
              />
            </td>
            <td>
              <input
                type="text"
                value={newStudentData.phone || ''}
                onChange={(e) => onAddInputChange(e, 'phone')}
                className="edit-input"
                placeholder="Enter phone"
              />
            </td>
            <td>
              <button
                onClick={onAddSave}
                className="btn btn-save"
                disabled={addLoading}
              >
                {addLoading ? 'Creating...' : 'Create'}
              </button>
              <button
                onClick={onAddCancel}
                className="btn btn-cancel"
                disabled={addLoading}
              >
                Cancel
              </button>
            </td>
          </tr>
        )}
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>
              {editingId === student.id ? (
                <input
                  type="text"
                  value={editedData.name || ''}
                  onChange={(e) => onInputChange(e, 'name')}
                  className="edit-input"
                />
              ) : (
                student.name
              )}
            </td>
            <td>
              {editingId === student.id ? (
                <input
                  type="text"
                  value={editedData.class_name || ''}
                  onChange={(e) => onInputChange(e, 'class_name')}
                  className="edit-input"
                />
              ) : (
                student.class_name
              )}
            </td>
            <td>
              {editingId === student.id ? (
                <input
                  type="number"
                  value={editedData.age || ''}
                  onChange={(e) => onInputChange(e, 'age')}
                  className="edit-input"
                />
              ) : (
                student.age
              )}
            </td>
            <td>
              {editingId === student.id ? (
                <input
                  type="email"
                  value={editedData.email || ''}
                  onChange={(e) => onInputChange(e, 'email')}
                  className="edit-input"
                />
              ) : (
                student.email || 'N/A'
              )}
            </td>
            <td>
              {editingId === student.id ? (
                <input
                  type="text"
                  value={editedData.phone || ''}
                  onChange={(e) => onInputChange(e, 'phone')}
                  className="edit-input"
                />
              ) : (
                student.phone || 'N/A'
              )}
            </td>
            <td>
              {editingId === student.id ? (
                <>
                  <button
                    onClick={() => onSave(student.id)}
                    className="btn btn-save"
                    disabled={saveLoading}
                  >
                    {saveLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={onCancel}
                    className="btn btn-cancel"
                    disabled={saveLoading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onEdit(student)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(student.id, student.name)}
                    className="btn btn-delete"
                    disabled={deleteLoading}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/students/${student.id}/tasks`)}
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', fontSize: '14px', marginRight: '8px' }}
                  >
                    View Tasks
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
