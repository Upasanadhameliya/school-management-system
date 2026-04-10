export const TaskTable = ({
  tasks,
  editingId,
  editedData,
  saveLoading,
  deleteLoading,
  isAdding,
  newTaskData,
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
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {isAdding && (
          <tr className="new-task-row">
            <td>New</td>
            <td>
              <input
                type="text"
                value={newTaskData.title || ''}
                onChange={(e) => onAddInputChange(e, 'title')}
                className="edit-input"
                placeholder="Enter title"
              />
            </td>
            <td>
              <input
                type="text"
                value={newTaskData.description || ''}
                onChange={(e) => onAddInputChange(e, 'description')}
                className="edit-input"
                placeholder="Enter description"
              />
            </td>
            <td>
              <select
                value={newTaskData.status || 'pending'}
                onChange={(e) => onAddInputChange(e, 'status')}
                className="edit-input"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </td>
            <td>
              <input
                type="date"
                value={newTaskData.due_date || ''}
                onChange={(e) => onAddInputChange(e, 'due_date')}
                className="edit-input"
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
        {tasks.length === 0 && !isAdding ? (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
              No tasks found for this student
            </td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editedData.title || ''}
                    onChange={(e) => onInputChange(e, 'title')}
                    className="edit-input"
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editedData.description || ''}
                    onChange={(e) => onInputChange(e, 'description')}
                    className="edit-input"
                  />
                ) : (
                  task.description || 'N/A'
                )}
              </td>
              <td>
                {editingId === task.id ? (
                  <select
                    value={editedData.status || ''}
                    onChange={(e) => onInputChange(e, 'status')}
                    className="edit-input"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: task.status === 'completed' ? '#4caf50' : '#ff9800',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    {task.status}
                  </span>
                )}
              </td>
              <td>
                {editingId === task.id ? (
                  <input
                    type="date"
                    value={editedData.due_date || ''}
                    onChange={(e) => onInputChange(e, 'due_date')}
                    className="edit-input"
                  />
                ) : (
                  task.due_date || 'N/A'
                )}
              </td>
              <td>
                {editingId === task.id ? (
                  <>
                    <button
                      onClick={() => onSave(task.id)}
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
                      onClick={() => onEdit(task)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(task.id, task.title)}
                      className="btn btn-delete"
                      disabled={deleteLoading}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
