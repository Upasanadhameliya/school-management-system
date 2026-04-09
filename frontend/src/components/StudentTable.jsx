export const StudentTable = ({
  students,
  editingId,
  editedData,
  saveLoading,
  deleteLoading,
  onEdit,
  onCancel,
  onInputChange,
  onSave,
  onDelete
}) => {
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
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
