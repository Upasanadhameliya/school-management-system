export const TaskTable = ({ tasks }) => {
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
              No tasks found for this student
            </td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description || 'N/A'}</td>
              <td>
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
              </td>
              <td>{task.due_date || 'N/A'}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
